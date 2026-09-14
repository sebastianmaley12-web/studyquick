import type { ModuleCContent } from '../../lib/content/english'

/**
 * Module C: The Craft of Writing has no prescribed text — it's assessed
 * through students' own imaginative, discursive and persuasive compositions.
 * Content here is therefore craft technique + practice, not a quote bank.
 * Coverage: 10 craft techniques and 6 writing stimuli (2 per mode), every
 * one with a full worked model response. A broader stimulus bank (more
 * than 2 prompts per mode) is still a reasonable follow-up, but no stimulus
 * is left with a stub/placeholder response.
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
        '<p>The photograph was the only thing that hadn\'t changed. It sat where it always had, on the shelf by the door, my brother\'s arm slung around my shoulders, both of us squinting into a sun that no longer fell on this house the same way. Everything around it had rearranged itself in the eleven months since he left — the shelf itself had been dusted, moved six inches left, moved back. The house had learned to be quieter. But the photograph stayed exactly as it was: two boys, one afternoon, a version of certainty that hadn\'t needed to survive anything yet.</p><p>I used to think the stillness was a comfort. Now I understood it was closer to an accusation. The boy in the photograph had no idea what was coming, and some nights I resented him for it — his uncomplicated grin, his hand still loosely around my shoulder, as if it would always be that easy to reach for someone and have them still be there to hold.</p><p>I picked it up for the first time in months on the night before I left for university. Not to look at it — I had the thing memorised, the crease in the corner, the thumbprint ghost on the glass — but to check whether it had really stayed the same, or whether I only remembered it that way. It had. It was exactly as certain as it had always been, which was the whole problem. Certainty like that doesn\'t age. It just waits for you to catch up to how much you\'ve changed around it.</p><p>I put it in the box going to my new room anyway, face down, between two folded jumpers. Not because I\'d stopped needing the reminder. Because I finally understood the photograph wasn\'t proof that things hadn\'t changed. It was proof that they had — and that this one flat, unmoving rectangle of glossy paper was the only place left where they hadn\'t yet.</p>',
      reflectionPromptHtml: 'In 150-200 words, explain how your chosen motif develops across the piece and what it allows you to convey that direct statement could not.',
    },
    {
      id: 'ws-imaginative-2',
      mode: 'imaginative',
      prompt: 'Write an imaginative piece inspired by the stimulus: a door left slightly open.',
      stimulusHtml: null,
      planningGuidanceHtml: 'A door left "slightly" open is an image of ambiguity, not certainty — plan whether your piece resolves that ambiguity or deliberately preserves it. Consider dramatised interiority (show, don\'t tell) for whatever emotion the image is standing in for.',
      modelResponseHtml:
        '<p>The door to my father\'s study was never locked. It didn\'t need to be — closed was enough, and closed was what it always was, except for the six months after the diagnosis, when he started leaving it open a hand\'s width, as if he\'d stopped believing he had anything left worth protecting from us.</p><p>I noticed the gap before I noticed anything else had changed. I\'d walk past and see a slice of him at the desk, papers he wasn\'t really reading, and I\'d slow down without meaning to, the way you slow down near an animal that might bolt if you looked at it directly. I never went in. I told myself it was respect. It took me a long time to admit it was closer to fear — that if I went in and he actually wanted to talk, I wouldn\'t know what to do with whatever he said.</p><p>The last time I passed the study, the door was open further than a hand\'s width. Wide enough that I could see the whole desk, empty of him, the chair pushed in at an angle that meant someone else had already been in to tidy. I stood in the hallway a long time, looking at a door that had finally stopped being ambiguous about anything, and found I missed the gap. The gap, at least, had still been a question. This was only an answer.</p>',
      reflectionPromptHtml: 'In 150-200 words, explain one specific craft technique you used to sustain ambiguity or tension, and why you chose it over a more direct alternative.',
    },
    {
      id: 'ws-discursive-1',
      mode: 'discursive',
      prompt: 'Write a discursive piece exploring the idea that memory is unreliable, but still worth trusting.',
      stimulusHtml: null,
      planningGuidanceHtml: 'Discursive writing explores an idea rather than arguing a single fixed thesis — plan at least one genuine complication or counter-thought, not just supporting examples. Consider a digressive structure: a concrete scene, a reflective digression, a second scene that complicates the first.',
      modelResponseHtml:
        '<p>My grandmother tells the story of her wedding day differently every time. In one version it rained. In another, the sun was "unbearable", and she remembers sweating through the lace at her collar. I have stopped trying to work out which one is true, because I suspect the honest answer is neither, exactly, and also both — that the weather she remembers now is less a fact about that afternoon than a fact about how she has needed to feel about it since.</p><p>It would be easy to conclude from this that memory is simply unreliable and leave it there — a neat, slightly cynical point about how little we can trust our own minds. But that conclusion has always felt too convenient, a way of dismissing something rather than actually looking at it. Because the thing memory gets wrong, most of the time, isn\'t the sequence of events. It\'s the weather, the exact words, the small furniture of a scene that was never the point of remembering it in the first place. What my grandmother\'s memory has never once changed is what mattered: who was there, what it meant, how it felt to become someone\'s wife in front of people who loved her. The facts drift. The truth, oddly, doesn\'t.</p><p>Perhaps that\'s the actual distinction worth making — not between reliable and unreliable memory, but between the kind of accuracy a court transcript needs and the kind a life actually runs on. I still trust my grandmother\'s wedding story completely, rain or shine, because I\'ve realised I was never asking it to be a weather report. I was asking it to tell me what forty years of retelling had decided was true. That, it has never once gotten wrong.</p>',
      reflectionPromptHtml: 'In 150-200 words, explain how your structure (linear vs. digressive) shaped the reader\'s experience of your exploration.',
    },
    {
      id: 'ws-discursive-2',
      mode: 'discursive',
      prompt: 'Write a discursive piece on the idea that we perform a different version of ourselves for every audience.',
      stimulusHtml: null,
      planningGuidanceHtml: 'Avoid resolving this into a single flat claim ("we should be authentic") — genuinely discursive writing sits with the tension rather than resolving it neatly. Rhetorical questions can help you open, rather than close, each stage of reflection.',
      modelResponseHtml:
        '<p>I speak to my mother in a different register than I speak to my friends, who I speak to differently again than I speak to a teacher, a stranger, myself at eleven at night with the lights off. None of these are performances in the cynical sense — I\'m not lying to any of them. But none of them is quite the whole of me either. So which one is real?</p><p>The tempting answer is that there\'s a "true self" underneath all the versions, and the versions are just costumes it puts on for convenience. I used to believe this. It\'s a comforting idea, because it means authenticity is just a matter of taking the costumes off — stripping back to whoever you are when no one\'s watching. But is that actually true, or is it just the version of the theory that flatters us most? The self I am when no one\'s watching isn\'t more real than the others. It\'s just unobserved. It has no more claim to being the "true" one than the version that shows up to a job interview, rehearsed and careful and, in its own way, just as genuinely me.</p><p>Maybe the more honest position is that there is no version underneath the versions — that the self isn\'t a fixed object we perform in front of different audiences, but something closer to the sum of every performance, none of them fake, none of them complete on its own. That should feel more unsettling than it does. Instead it feels a little bit like relief: I don\'t have to locate the "real" me and hold everyone else to it. I just have to make sure the versions, taken together, add up to someone I can live with.</p>',
      reflectionPromptHtml: 'In 150-200 words, explain how at least one rhetorical question functioned as a genuine turning point in your piece\'s thinking, not just decoration.',
    },
    {
      id: 'ws-persuasive-1',
      mode: 'persuasive',
      prompt: 'Write a persuasive speech arguing that schools should teach financial literacy as a compulsory subject.',
      stimulusHtml: null,
      planningGuidanceHtml: 'Plan your strongest tricolon for the close of your introduction or the end of your speech, not buried in the middle. Decide where inclusive language ("we", "our") genuinely fits your audience — a school assembly audience is a different "we" than a parliamentary one.',
      modelResponseHtml:
        '<p>Every one of us in this room has, at some point, made a decision about money we didn\'t fully understand. A loan. A subscription. A "buy now, pay later" click that felt like nothing at the time. We were never taught to see it coming — and that is not an accident, it is a gap. Not a small one. Not a forgivable one. A gap this school, and every school like it, has the power to close.</p><p>Think about what we are trusted to learn instead. We can graph a quadratic equation we will almost certainly never use again. We can analyse the symbolism in a poem written two hundred years before any of us were born. These things have value — I\'m not here to argue otherwise. But ask yourself honestly: how many of us leave this school able to read a payslip, understand what compound interest actually does to a debt over ten years, or recognise the difference between a fair loan and a predatory one? We are handed enormous freedom the day we turn eighteen, and almost none of the tools to use it responsibly.</p><p>This is not a hypothetical problem for some future version of us. It is happening now, to people in this room, who will sign their first phone contract, take out their first loan, or make their first bad financial decision within the next two years — and who will do it with no more preparation than what they\'ve picked up by accident. We would never accept sending students into a chemistry lab without teaching them the basics of safety first. Why do we accept sending them into adult financial life the same way?</p><p>Financial literacy does not need to replace what we already learn. It needs to sit alongside it, compulsory, assessed, taken seriously — because the cost of leaving it optional is not an abstract inconvenience. It is real debt, real stress, and real years lost to mistakes that a single well-taught unit could have prevented. Teach us to budget. Teach us to spot a bad deal. Teach us what our future selves will actually need to know. We are not asking for less mathematics, less English, less history. We are asking for one more subject that meets us where we are actually going to live.</p>',
      reflectionPromptHtml: 'In 150-200 words, explain how your use of modality (high vs. low) shifted across the piece to build toward your central claim.',
    },
    {
      id: 'ws-persuasive-2',
      mode: 'persuasive',
      prompt: 'Write a persuasive letter to a local council arguing for or against a proposed change to your community.',
      stimulusHtml: null,
      planningGuidanceHtml: 'A letter format still needs rhetorical shape, not just politeness — plan a clear structure (concern, evidence, specific request) rather than a general complaint. High-modality language works best paired with a specific, actionable request at the end.',
      modelResponseHtml:
        '<p>Dear Councillors,</p><p>I am writing to urge the Council to reconsider the proposed removal of the pedestrian crossing on Maple Street, currently scheduled for next month\'s works program. I understand the crossing has been flagged as under-used relative to its maintenance cost. I would ask the Council to weigh that figure against what it does not capture: the crossing sits directly between the primary school and the community library, and it is the only signalled crossing for four hundred metres in either direction.</p><p>"Under-used" is doing a great deal of work in this proposal, and I don\'t think it is the right measure here. A crossing used by forty children twice a day, at the two most predictable and vulnerable moments of their week, is not a crossing that has failed to justify itself. It is a crossing doing exactly the job it was built for — quietly, reliably, and precisely because it is there that nothing has gone wrong on that stretch of road in the eleven years I have lived nearby.</p><p>I recognise the Council must balance limited resources across the whole area, and I am not writing to dismiss that constraint. I am asking for a smaller, more specific outcome: that Maple Street\'s crossing be assessed on safety grounds, not usage statistics alone, before any final decision is made, and that the school and library be formally consulted as directly affected stakeholders. This is a modest request, and I believe a reasonable one. I would welcome the opportunity to discuss it further at the Council\'s next community session.</p><p>Yours sincerely,<br />A concerned resident</p>',
      reflectionPromptHtml: 'In 150-200 words, explain how your closing request was shaped by the specific audience (the council) rather than a general reader.',
    },
  ],
}
