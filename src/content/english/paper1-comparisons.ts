import type { ComparisonSpec } from '../../lib/content/paper1'

/**
 * Technique comparison pairs (spec section 11) — higher-order Paper 1
 * practice: comparing HOW language differs between two moments, not just
 * identifying a single technique. Hand-authored rather than generated,
 * since choosing a genuinely instructive pair takes editorial judgment a
 * generator can't supply.
 */
export const PAPER_ONE_COMPARISONS: ComparisonSpec[] = [
  {
    id: 'cmp-opening-vs-closing',
    quoteAId: 'evidence-q-opening-line',
    quoteBId: 'e-won-victory',
    promptHtml:
      'How does Orwell\'s use of language differ between the novel\'s opening line and this description near its close?',
    modelComparisonHtml:
      'The opening line juxtaposes a familiar image ("a bright cold day in April") against a single wrong detail ("clocks were striking thirteen"), unsettling the reader with a world that is almost, but not quite, normal — inviting suspicion. By contrast, the closing description uses stark verbal irony ("He had won the victory over himself"), presenting total psychological defeat in the language of triumph with no destabilising gap left for the reader to notice — because Winston himself no longer notices it. The novel\'s language moves from unease that invites the reader to question reality, to a flattened irony the reader must supply themselves, mirroring Winston\'s own journey from suspicion to total, unquestioning acceptance.',
  },
  {
    id: 'cmp-winston-vs-obrien-on-power',
    quoteAId: 'evidence-q-hope-proles',
    quoteBId: 'e-power-not-a-means',
    promptHtml:
      "Compare how Winston's diary entry and O'Brien's explanation each construct a perspective on power and rebellion.",
    modelComparisonHtml:
      'Winston\'s diary entry constructs hope through paradox and self-interrogation — he asserts hope in the proles then immediately undercuts it with circular reasoning, revealing a mind still uncertain, still able to doubt the Party\'s total control. O\'Brien\'s later antithesis ("Power is not a means, it is an end") constructs the opposite: total certainty, stated with no hedging or internal contradiction. The shift from Winston\'s paradox-laden, self-doubting syntax to O\'Brien\'s flat antithesis dramatises the gulf between an individual mind still capable of contradiction and hesitation, and the Party\'s absolute, uncontradictable certainty.',
  },
  {
    id: 'cmp-julia-vs-winston-motivation',
    quoteAId: 'e-julia-next-generation',
    quoteBId: 'evidence-q-hope-proles',
    promptHtml:
      "Compare how language characterises Julia's and Winston's different reasons for resisting the Party.",
    modelComparisonHtml:
      'Julia\'s blunt, direct statement ("I\'m interested in us") uses plain, unhedged diction to characterise her rebellion as immediate and personal, with no interest in abstraction. Winston\'s diary entry, by contrast, is structured around paradox and self-interrogation ("if there is hope… until they become conscious they will never rebel"), characterising his rebellion as intellectual and politically minded, but also more fragile — riddled with the very doubt Julia\'s directness never entertains. The contrast in sentence structure (declarative bluntness versus paradoxical hedging) mirrors the difference between instinctive and ideological resistance.',
  },
  {
    id: 'cmp-mob-vs-betrayal',
    quoteAId: 'e-two-minutes-hate',
    quoteBId: 'e-do-it-to-julia',
    promptHtml:
      'Compare the language techniques Orwell uses to depict the crowd\'s violence in Chapter 1 and Winston\'s betrayal in Room 101.',
    modelComparisonHtml:
      'The Two Minutes Hate is rendered through an extended simile and an accumulative, asyndetic list ("a desire to kill, to torture, to smash faces in… like an electric current"), building collective, externally-directed violence through sheer accumulation across a long sentence. Winston\'s betrayal, by contrast, is compressed into a single short, fragmented exclamation ("Do it to Julia!"), with no accumulation at all — the brevity itself enacts how instantaneous and involuntary his self-preservation becomes. Where the mob\'s violence is built up over a sentence, Winston\'s collapse happens in almost no syntax at all, suggesting individual capitulation under the Party\'s most personalised method is even more total than mass-manufactured hatred.',
  },
]
