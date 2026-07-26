-- Design sketch for the eventual Supabase backend. NOT applied to any
-- project — no migration tooling references this file. It exists to record
-- the intended shape before accounts/sync/monetisation are actually built,
-- so that work starts from an agreed design instead of an ad hoc one.
--
-- Local-first stays the source of truth for now: progressStore.ts
-- (src/lib/progressStore.ts) reads/writes localStorage directly and has no
-- dependency on any of this. The intended swap point, once auth exists, is
-- for progressStore to also push `state` to `progress.data` on commit and
-- hydrate from it on load for a signed-in user — merging by last-write-wins
-- per top-level key (quiz/trivia/notes/maths), not by row. See the comment
-- above `commit()` in progressStore.ts.

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
-- normalising quiz/trivia/notes/maths into separate tables. Keeps the sync
-- path a single upsert instead of four, and the local <-> remote shapes
-- identical.
create table progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{"v":1,"quiz":{},"trivia":{},"notes":{},"maths":{}}',
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
create table subscriptions (
  user_id uuid primary key references auth.users (id) on delete cascade,
  status text not null default 'free' check (status in ('free', 'active', 'past_due', 'canceled')),
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
-- ever written by a server-side webhook handler using the service role key,
-- which bypasses RLS entirely.
