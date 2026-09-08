-- Backend for accounts, cross-device progress sync, and subscription
-- entitlement. Not yet applied to any project — run this once against a new
-- Supabase project's SQL editor to stand it up (see README "Publishing &
-- monetisation" section for the full setup checklist).
--
-- Local-first stays true even with this in place: progressStore.ts
-- (src/lib/progressStore.ts) always reads/writes localStorage first and
-- keeps working with no backend configured. Once a user is signed in,
-- progressStore also pushes `state` to `progress.data` on commit and
-- hydrates from it on sign-in, merging by last-write-wins per top-level key
-- (quiz/trivia/notes/maths/review) — see src/lib/progressSync.ts.

-- One row per authenticated user, created by a trigger on auth.users insert.
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "profiles are self-readable"
  on profiles for select
  using (auth.uid() = id);

create policy "profiles are self-writable"
  on profiles for update
  using (auth.uid() = id);

-- One row per user holding the entire ProgressState blob (see
-- src/lib/progressStore.ts's `ProgressState` type) as JSON, mirroring the
-- existing localStorage.studyquick.progress.v1 shape rather than
-- normalising quiz/trivia/notes/maths/review into separate tables. Keeps the
-- sync path a single upsert instead of five, and the local <-> remote shapes
-- identical.
create table progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{"v":1,"quiz":{},"trivia":{},"notes":{},"maths":{},"review":{}}',
  updated_at timestamptz not null default now()
);

alter table progress enable row level security;

create policy "progress is self-readable"
  on progress for select
  using (auth.uid() = user_id);

create policy "progress is self-writable"
  on progress for insert
  with check (auth.uid() = user_id);

create policy "progress is self-updatable"
  on progress for update
  using (auth.uid() = user_id);

-- Monetisation: one row per user tracking entitlement state, kept separate
-- from `profiles` since it's written by a webhook handler (Stripe), not the
-- user directly, and has a different write-access pattern (service role
-- only, no user-facing RLS write policy at all).
--
-- Product model: every signed-out visitor gets one subject free forever
-- (FREE_SUBJECT_ID in src/lib/entitlement.ts). Signing up starts a 7-day
-- trial_ends_at window with full access to every subject, to sample the
-- paid product. After the trial and without an active subscription, access
-- reverts to just the free subject. An 'active' subscription unlocks
-- everything regardless of trial state.
create table subscriptions (
  user_id uuid primary key references auth.users (id) on delete cascade,
  status text not null default 'free' check (status in ('free', 'active', 'past_due', 'canceled')),
  trial_ends_at timestamptz not null default (now() + interval '7 days'),
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

alter table subscriptions enable row level security;

create policy "subscriptions are self-readable"
  on subscriptions for select
  using (auth.uid() = user_id);

-- No insert/update policy for regular users: subscriptions rows are only
-- ever written by this trigger (on signup) or a server-side webhook handler
-- using the service role key, both of which bypass RLS entirely.

-- Provisions profiles / progress / subscriptions rows the moment someone
-- signs up, so the client never has to (and never could — RLS blocks
-- client-side inserts into subscriptions by design).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id);
  insert into public.progress (user_id) values (new.id);
  insert into public.subscriptions (user_id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
