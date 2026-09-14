import type { UnseenExtract } from '../../lib/content/paper1'

/**
 * Unseen-style practice (spec section 12) — original extracts written for
 * this feature, not reproduced from any real exam paper or published
 * source (the same copyright-safety discipline as the rest of the English
 * Advanced content). The point is training students to analyse language
 * they haven't memorised, so using genuinely fresh text matters more here
 * than anywhere else in the app.
 */
export const PAPER_ONE_UNSEEN: UnseenExtract[] = [
  {
    id: 'unseen-persuasive-1',
    title: 'Original persuasive extract — "Ordinary Hours"',
    kind: 'persuasive-speech',
    bodyHtml:
      'We tell ourselves we are too busy to change anything. But look at the ordinary hours of your week — the ones spent scrolling, queuing, waiting for a kettle to boil — and ask what they could become if we simply decided they mattered. We are not short of time. We are short of attention, and attention is the one resource none of us can claim we lack the right to spend. I am not asking you to give up your evenings. I am asking you to notice them. Isn\'t it strange that we call an hour "wasted" only when we ourselves weren\'t watching it disappear? We owe it to each other — and to whoever inherits the choices we\'re making right now — to spend our ordinary hours as if they counted. Because they do.',
    attribution: 'Original extract written for StudyQuick practice — not a real speech or published text.',
    questions: [
      {
        id: 'unseen-1-q1',
        format: 'unseen',
        skill: 'identify',
        promptHtml: 'Identify ONE persuasive technique used in this extract and explain its effect.',
        modelAnswerHtml:
          'The speaker uses inclusive language ("We tell ourselves… We owe it to each other") to fold the audience in with the speaker, presenting the argument as a shared realisation rather than an accusation directed outward — making it harder for the listener to dismiss as not applying to them.',
      },
      {
        id: 'unseen-1-q2',
        format: 'unseen',
        skill: 'effect',
        promptHtml: 'Explain the effect of the rhetorical question in this extract.',
        modelAnswerHtml:
          'The rhetorical question ("Isn\'t it strange that we call an hour \'wasted\' only when we ourselves weren\'t watching it disappear?") doesn\'t seek an answer — it invites the audience to privately recognise the contradiction in their own behaviour, making them complicit in reaching the speaker\'s conclusion rather than being told it directly.',
      },
      {
        id: 'unseen-1-q3',
        format: 'unseen',
        skill: 'analysis',
        promptHtml: 'Analyse how modality is used to shape the persuasive force of the final two sentences.',
        modelAnswerHtml:
          'The final two sentences shift to a firmer, more assertive register ("We owe it to each other… Because they do.") after the earlier, softer hedging ("I am not asking you to give up..."). This escalation in certainty positions the conclusion as a moral obligation rather than a mere suggestion, giving the extract\'s ending more persuasive weight than its more tentative opening.',
      },
    ],
  },
  {
    id: 'unseen-poem-1',
    title: 'Original poem — "Kitchen Light"',
    kind: 'poem',
    bodyHtml:
      'The kitchen light stays on past midnight now,<br />a small, stubborn moon over the sink.<br />I used to switch it off without a thought —<br />now I leave it burning, just to think<br />someone else in this house is still awake,<br />still moving softly between fridge and floor,<br />still choosing, in the quiet, not to break<br />the thin gold line beneath the closing door.',
    attribution: 'Original poem written for StudyQuick practice — not a published text.',
    questions: [
      {
        id: 'unseen-poem-1-q1',
        format: 'unseen',
        skill: 'identify',
        promptHtml: 'Identify the extended metaphor used in this poem and explain what it constructs.',
        modelAnswerHtml:
          'The kitchen light is constructed as "a small, stubborn moon" — an extended metaphor that reframes an ordinary domestic object as something celestial and quietly enduring, suggesting the light (and what it represents — a household member\'s presence) has taken on a significance beyond its practical function.',
      },
      {
        id: 'unseen-poem-1-q2',
        format: 'unseen',
        skill: 'effect',
        promptHtml: 'Explain the effect of the imagery in the final two lines.',
        modelAnswerHtml:
          'The visual imagery of "the thin gold line beneath the closing door" renders an almost-invisible detail — a sliver of light — as fragile and precious, so that the poem\'s final image of connection between two people in a house is rendered as something small enough to be broken, but chosen, each night, not to be.',
      },
      {
        id: 'unseen-poem-1-q3',
        format: 'unseen',
        skill: 'analysis',
        promptHtml: 'Analyse how tone shifts across the poem, and what this shift reveals about the speaker.',
        modelAnswerHtml:
          'The tone moves from a slightly wistful, habitual observation ("I used to switch it off without a thought") to a warmer, more deliberate tenderness by the final lines. This shift reveals a speaker who has come to value an unspoken, quiet form of companionship — the poem is less about a light than about noticing another person\'s presence without needing to speak to them.',
      },
    ],
  },
  {
    id: 'unseen-visual-1',
    title: 'Original visual text description — public health poster',
    kind: 'visual-description',
    bodyHtml:
      'Described visual text: A poster is dominated by a single figure standing at the centre of an otherwise empty, pale-grey frame. The figure is rendered in warm orange tones — the only warm colour in the image — and looks directly out of the frame toward the viewer. Behind them, faint grey outlines of other figures face away, scattered toward the edges. Small white text along the bottom reads: "You are not the only one." The figure\'s hand is raised slightly, palm open, positioned as if reaching toward the viewer\'s side of the frame.',
    attribution: 'Original described visual text written for StudyQuick practice — not a real poster.',
    questions: [
      {
        id: 'unseen-visual-1-q1',
        format: 'unseen',
        skill: 'analysis',
        promptHtml: 'Analyse how salience and colour are used together to construct meaning in this poster.',
        modelAnswerHtml:
          'The central figure is made salient through both position (centred in the frame) and colour (the only warm orange tone against a pale-grey palette), immediately marking them as the emotional focus. The colour symbolism — warmth isolated against coldness — visually enacts the poster\'s message of individual visibility within isolation, reinforcing rather than merely decorating the text\'s claim.',
      },
      {
        id: 'unseen-visual-1-q2',
        format: 'unseen',
        skill: 'analysis',
        promptHtml: 'Explain how gaze and vector construct a relationship between the figure and the viewer.',
        modelAnswerHtml:
          "The figure's direct gaze out of the frame, combined with the vector implied by their slightly raised, open hand reaching toward the viewer's side of the frame, constructs a direct address to the viewer — positioning them not as a passive observer of the figure's isolation, but as someone being personally reached toward, consistent with the caption's claim that the viewer is 'not the only one.'",
      },
      {
        id: 'unseen-visual-1-q3',
        format: 'unseen',
        skill: 'application',
        promptHtml: 'In 2–3 sentences, explain how the framing of the background figures supports the poster\'s overall purpose.',
        modelAnswerHtml:
          "The background figures are faint, grey, and facing away, pushed toward the edges of the frame — visually representing the isolation the poster's message addresses. Their presence (rather than an empty background) subtly suggests the central figure is not literally alone, only feeling that way, which supports the poster's purpose of reassuring an isolated viewer that others share their experience even when it doesn't feel like it.",
      },
    ],
  },
]
