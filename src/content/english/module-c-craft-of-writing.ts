import type { ModuleCContent } from '../../lib/content/english'

/**
 * Module C: The Craft of Writing has no prescribed text — it's assessed
 * through students' own imaginative, discursive and persuasive compositions.
 * Content here is therefore craft technique + practice, not a quote bank.
 * First-pass coverage: 10 craft techniques and 6 writing stimuli (2 per
 * mode). Flagged for expansion in a later content pass — genuinely
 * excellent Module C coverage needs a broader stimulus bank and more
 * worked model responses per mode.
 */
export const MODULE_C: ModuleCContent = {
  id: 'module-c',
  name: 'Module C: The Craft of Writing',
  yearLevel: 12,
  syllabusOverviewHtml:
    'Students strengthen and extend their knowledge, skills and confidence as writers. They write for a range of authentic audiences and purposes, appreciating, examining and assessing the verbal and written qualities of their own and others\' texts. Students study model texts that provide rich opportunities to explore the versatility, power and precision of language. They examine how writers convey ideas and shape meaning through vocabulary, sentence patterns, punctuation, textual form, figurative language and rhetorical devices, and they experiment with these to develop their own repertoire of skills.',
  overviewHtml:
    'Unlike the Common Module or Modules A/B, Module C has no fixed prescribed text — every school selects its own mentor texts to model the craft techniques being taught. This means Module C is assessed almost entirely through your own writing: an imaginative, discursive or persuasive piece, plus a reflection statement explaining the craft choices you made. The best preparation is deliberate, structured practice across all three modes, not memorising content.',
  techniques: [
    {
      id: 'ct-second-person',
      name: 'Second-person address',
      mode: 'imaginative',
      definitionHtml: 'Narrating in the second person ("you") rather than first or third.',
      effectHtml: 'Implicates the reader directly in the narrative, creating unusual intimacy or unease, and can blur the line between narrator and reader.',
      mentorExampleHtml: '"You press your palm flat against the glass and it does not give." — second person turns an ordinary action into something the reader is made to perform themselves.',
      howToUseHtml: 'Use sparingly and deliberately — a whole piece in second person is a bold, hard-to-sustain choice; a shift into second person for one charged passage can be more effective than committing to it throughout.',
    },
    {
      id: 'ct-fragmented-syntax',
      name: 'Fragmented/interrupted syntax',
      mode: 'imaginative',
      definitionHtml: 'Deliberately incomplete sentences, or sentences that break off and restart.',
      effectHtml: 'Mimics the rhythm of anxious, distracted or interrupted thought, and can accelerate or destabilise pacing at a key emotional moment.',
      mentorExampleHtml: '"She reached for the door. Stopped. The handle was —" — the interruption enacts hesitation the reader feels rather than being told about.',
      howToUseHtml: 'Reserve fragments for moments of genuine emotional rupture; overusing the technique flattens its effect into a stylistic tic rather than a deliberate choice.',
    },
    {
      id: 'ct-motif',
      name: 'Controlling motif',
      mode: 'imaginative',
      definitionHtml: 'A single concrete image or object returned to across a piece, each time carrying slightly more meaning.',
      effectHtml: 'Unifies a piece structurally and gives the reader a concrete anchor for an abstract idea, avoiding the need to state the idea directly.',
      mentorExampleHtml: 'A piece about a fading relationship returning three times to the image of tea going cold — untouched, then reheated, then poured out.',
      howToUseHtml: 'Choose a motif before drafting, not after, and plan its 2-3 recurrences so each appearance adds meaning rather than simply repeating the first.',
    },
    {
      id: 'ct-show-dont-tell',
      name: 'Dramatised interiority ("show, don\'t tell")',
      mode: 'imaginative',
      definitionHtml: 'Conveying a character\'s emotional state through action, dialogue or sensory detail rather than naming the emotion directly.',
      effectHtml: 'Trusts the reader to infer feeling from behaviour, which is almost always more persuasive and less sentimental than a stated emotion.',
      mentorExampleHtml: '"He folded the letter into smaller and smaller squares until it would not fold again" conveys suppressed grief without the word "grief" appearing.',
      howToUseHtml: 'When drafting, flag any sentence that names an emotion directly ("she felt sad") and ask what physical action or detail could replace it.',
    },
    {
      id: 'ct-anaphora',
      name: 'Anaphora / cumulative structure',
      mode: 'discursive',
      definitionHtml: 'Repetition of a word or phrase at the start of successive clauses or sentences, building toward a climax.',
      effectHtml: 'Creates rhythm and momentum, and signals to the reader that a passage is building toward a key idea.',
      mentorExampleHtml: 'Noel Pearson\'s public rhetoric is a widely studied model for this — successive clauses opening the same way before a short, contrasting final line breaks the pattern.',
      howToUseHtml: 'Save anaphora for a genuine rhetorical peak in the piece — three to five repetitions is usually enough; more starts to feel mechanical rather than building.',
    },
    {
      id: 'ct-digressive-structure',
      name: 'Digressive/essayistic structure',
      mode: 'discursive',
      definitionHtml: 'Moving between a concrete scene and reflective digression rather than following a single linear argument.',
      effectHtml: 'Mimics the associative movement of real thought, and lets a writer explore an idea from several angles without forcing a single thesis too early.',
      mentorExampleHtml: 'A discursive piece that opens on a specific memory, digresses into a broader observation about memory itself, then returns to a second, related scene.',
      howToUseHtml: 'Plan the digressions before drafting — an unplanned digressive piece reads as unfocused, while a deliberately structured one reads as genuinely exploratory.',
    },
    {
      id: 'ct-rhetorical-question',
      name: 'Rhetorical questioning',
      mode: 'discursive',
      definitionHtml: 'A question posed not to be answered by the reader, but to prompt reflection or imply an answer.',
      effectHtml: 'Invites the reader into the writer\'s own thought process, making an argument feel exploratory rather than declarative.',
      mentorExampleHtml: '"What do we actually mean when we say a place remembers us?" opens a reflective passage without committing to an answer immediately.',
      howToUseHtml: 'Use rhetorical questions to open a new stage of reflection, not to pad a paragraph — each one should genuinely shift the direction of your thinking.',
    },
    {
      id: 'ct-tricolon',
      name: 'Tricolon (rule of three)',
      mode: 'persuasive',
      definitionHtml: 'A list or structure of exactly three parallel elements.',
      effectHtml: 'Feels complete and satisfying to a reader/listener in a way two or four items do not — a well-known rhetorical rhythm.',
      mentorExampleHtml: '"Not next year. Not next month. Now."',
      howToUseHtml: 'Use for your strongest, most quotable line — a tricolon at the close of an introduction or conclusion carries more weight than one buried mid-paragraph.',
    },
    {
      id: 'ct-high-modality',
      name: 'High-modality language',
      mode: 'persuasive',
      definitionHtml: 'Language expressing strong certainty or obligation ("must", "will", "cannot") rather than tentative possibility ("might", "could").',
      effectHtml: 'Projects confidence and urgency, positioning the writer\'s claim as fact rather than opinion.',
      mentorExampleHtml: '"This is not a choice we can defer" uses "cannot"/"must"-register certainty rather than "perhaps we should consider".',
      howToUseHtml: 'Reserve your highest-modality language for your central claim — using it everywhere dilutes its force and can read as overstated rather than confident.',
    },
    {
      id: 'ct-inclusive-language',
      name: 'Inclusive language',
      mode: 'persuasive',
      definitionHtml: 'First-person plural pronouns ("we", "us", "our") that position the writer alongside the audience rather than addressing them from outside.',
      effectHtml: 'Builds a sense of shared stake or responsibility, making the argument feel collective rather than imposed.',
      mentorExampleHtml: '"We built this. We can fix it." positions the audience as co-owners of both the problem and its solution.',
      howToUseHtml: 'Use inclusive language when you genuinely want to build solidarity with the reader — using it to claim agreement the reader hasn\'t actually given can read as manipulative rather than persuasive.',
    },
  ],
  stimuli: [
    {
      id: 'ws-imaginative-1',
      mode: 'imaginative',
      prompt: 'Write an imaginative piece that begins with the line: "The photograph was the only thing that hadn\'t changed."',
      stimulusHtml: null,
      planningGuidanceHtml: 'Decide your controlling motif before drafting (the photograph is a strong candidate — plan 2-3 deliberate recurrences). Choose a point of view (first person is a safe, reliable choice under exam time pressure) and decide what specifically is being contrasted against the photograph\'s stillness — a place, a relationship, the narrator themselves.',
      modelResponseHtml:
        '<p>The photograph was the only thing that hadn\'t changed. It sat where it always had, on the shelf by the door, my brother\'s arm slung around my shoulders, both of us squinting into a sun that no longer fell on this house the same way. Everything around it had rearranged itself in the eleven months since he left — the shelf itself had been dusted, moved six inches left, moved back. The house had learned to be quieter. But the photograph stayed exactly as it was: two boys, one afternoon, a version of certainty that hadn\'t needed to survive anything yet.</p><p>I used to think the stillness was a comfort. Now I understood it was closer to an accusation. The boy in the photograph had no idea what was coming, and some nights I resented him for it — his uncomplicated grin, his hand still loosely around my shoulder, as if it would always be that easy to reach for someone and have them still be there to hold.</p><p>[Model response continues — a full worked example should extend this into the piece\'s middle and ending, following the same motif through its planned second and third recurrence, and close on the synthesis image per the planning guidance above. Flagged for a follow-up content pass to complete the full worked model.]</p>',
      reflectionPromptHtml: 'In 150-200 words, explain how your chosen motif develops across the piece and what it allows you to convey that direct statement could not.',
    },
    {
      id: 'ws-imaginative-2',
      mode: 'imaginative',
      prompt: 'Write an imaginative piece inspired by the stimulus: a door left slightly open.',
      stimulusHtml: null,
      planningGuidanceHtml: 'A door left "slightly" open is an image of ambiguity, not certainty — plan whether your piece resolves that ambiguity or deliberately preserves it. Consider dramatised interiority (show, don\'t tell) for whatever emotion the image is standing in for.',
      modelResponseHtml:
        'A full worked model response for this stimulus is not yet provided — flagged for a follow-up content pass. Use the planning guidance and the "Craft Techniques" bank to draft your own attempt in the meantime.',
      reflectionPromptHtml: 'In 150-200 words, explain one specific craft technique you used to sustain ambiguity or tension, and why you chose it over a more direct alternative.',
    },
    {
      id: 'ws-discursive-1',
      mode: 'discursive',
      prompt: 'Write a discursive piece exploring the idea that memory is unreliable, but still worth trusting.',
      stimulusHtml: null,
      planningGuidanceHtml: 'Discursive writing explores an idea rather than arguing a single fixed thesis — plan at least one genuine complication or counter-thought, not just supporting examples. Consider a digressive structure: a concrete scene, a reflective digression, a second scene that complicates the first.',
      modelResponseHtml:
        'A full worked model response for this stimulus is not yet provided — flagged for a follow-up content pass. Use the planning guidance and the "Craft Techniques" bank to draft your own attempt in the meantime.',
      reflectionPromptHtml: 'In 150-200 words, explain how your structure (linear vs. digressive) shaped the reader\'s experience of your exploration.',
    },
    {
      id: 'ws-discursive-2',
      mode: 'discursive',
      prompt: 'Write a discursive piece on the idea that we perform a different version of ourselves for every audience.',
      stimulusHtml: null,
      planningGuidanceHtml: 'Avoid resolving this into a single flat claim ("we should be authentic") — genuinely discursive writing sits with the tension rather than resolving it neatly. Rhetorical questions can help you open, rather than close, each stage of reflection.',
      modelResponseHtml:
        'A full worked model response for this stimulus is not yet provided — flagged for a follow-up content pass. Use the planning guidance and the "Craft Techniques" bank to draft your own attempt in the meantime.',
      reflectionPromptHtml: 'In 150-200 words, explain how at least one rhetorical question functioned as a genuine turning point in your piece\'s thinking, not just decoration.',
    },
    {
      id: 'ws-persuasive-1',
      mode: 'persuasive',
      prompt: 'Write a persuasive speech arguing that schools should teach financial literacy as a compulsory subject.',
      stimulusHtml: null,
      planningGuidanceHtml: 'Plan your strongest tricolon for the close of your introduction or the end of your speech, not buried in the middle. Decide where inclusive language ("we", "our") genuinely fits your audience — a school assembly audience is a different "we" than a parliamentary one.',
      modelResponseHtml:
        '<p>Every one of us in this room has, at some point, made a decision about money we didn\'t fully understand. A loan. A subscription. A "buy now, pay later" click that felt like nothing at the time. We were never taught to see it coming — and that is not an accident, it is a gap. Not a small one. Not a forgivable one. A gap this school, and every school like it, has the power to close.</p><p>[Model response continues — a full worked example should extend this speech through its main arguments and a closing tricolon. Flagged for a follow-up content pass to complete the full worked model.]</p>',
      reflectionPromptHtml: 'In 150-200 words, explain how your use of modality (high vs. low) shifted across the piece to build toward your central claim.',
    },
    {
      id: 'ws-persuasive-2',
      mode: 'persuasive',
      prompt: 'Write a persuasive letter to a local council arguing for or against a proposed change to your community.',
      stimulusHtml: null,
      planningGuidanceHtml: 'A letter format still needs rhetorical shape, not just politeness — plan a clear structure (concern, evidence, specific request) rather than a general complaint. High-modality language works best paired with a specific, actionable request at the end.',
      modelResponseHtml:
        'A full worked model response for this stimulus is not yet provided — flagged for a follow-up content pass. Use the planning guidance and the "Craft Techniques" bank to draft your own attempt in the meantime.',
      reflectionPromptHtml: 'In 150-200 words, explain how your closing request was shaped by the specific audience (the council) rather than a general reader.',
    },
  ],
}
