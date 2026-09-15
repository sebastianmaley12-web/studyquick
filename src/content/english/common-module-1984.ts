import type { EnglishModule, EnglishText } from '../../lib/content/english'

/**
 * Common Module content for English Advanced (/subjects/english-advanced).
 *
 * Covers 5 of the novel's ~23 chapters — the opening (Ch 1), Winston's
 * diary reflections on truth/rebellion (Ch 7), the Ministry of Love
 * interrogation and O'Brien's philosophy of power (Part 3 Ch 3), the Room
 * 101 betrayal (Part 3 Ch 5), and the closing chapter (Part 3 Ch 6) — the
 * five chapters most commonly drawn on in HSC-style essay evidence.
 * Deliberately not all ~23; a related text and full unseen-text practice
 * are still open work.
 *
 * Chapter/quote locations follow the standard Penguin Modern Classics
 * numbering (Part, Chapter). Numbering can vary slightly between editions —
 * flagged once here rather than on every quote. Every quote is a
 * well-established, widely-verifiable line from the novel; a few new,
 * less universally famous lines were deliberately left out of this pass
 * rather than risk an unverified addition — see the project's no-
 * fabrication rule before adding more without independently checking them
 * against the text.
 */

export const COMMON_MODULE: EnglishModule = {
  id: 'common-module',
  name: 'Common Module: Texts and Human Experiences',
  yearLevel: 12,
  syllabusOverviewHtml:
    'Students deepen their understanding of how texts represent individual and collective human experiences, and how texts may give insight into the anomalies, paradoxes and inconsistencies in human behaviour and motivations. Students study ONE prescribed text plus a range of short texts, and select ONE related text of their own choosing.',
  textIds: ['nineteen-eighty-four'],
}

export const NINETEEN_EIGHTY_FOUR: EnglishText = {
  id: 'nineteen-eighty-four',
  moduleId: 'common-module',
  title: 'Nineteen Eighty-Four',
  author: 'George Orwell',
  form: 'novel',
  publicationInfo: 'First published 1949, Secker & Warburg (London)',
  overviewHtml:
    'A dystopian novel set in a totalitarian future London (Airstrip One, part of the superstate Oceania) governed by the Party and its figurehead, Big Brother. Winston Smith, a low-ranking Party member, works in the Ministry of Truth rewriting historical records to match the Party\'s ever-changing version of events. The novel follows his secret rebellion — an affair with Julia, an illicit diary, and a search for truth and autonomy — and its brutal suppression.',
  majorConcernsHtml:
    'Totalitarianism and the mechanisms of psychological control; the destruction of objective truth and historical memory; the limits of individual autonomy and rebellion under constant surveillance; the corruption of language (Newspeak) as a tool of thought control.',
  contextHtml:
    'Written in 1948, shortly after World War II, as the Cold War and the ideological split between the Western democracies and Stalinist Russia were becoming entrenched. Orwell had witnessed authoritarian propaganda first-hand in the Spanish Civil War and was responding directly to Stalinism, but the novel\'s warnings about surveillance, propaganda and the manipulation of truth are treated by the syllabus as a comment on totalitarianism in general, not one regime specifically.',
  significanceHtml:
    'As the Common Module\'s prescribed text, Nineteen Eighty-Four is studied for how it represents individual and collective human experience under extreme conditions — Winston\'s private, internal struggle for autonomy and truth becomes a vehicle for Orwell\'s ideas about what happens to human identity, memory and connection when a state seeks total control over both.',
  sections: [
    {
      id: 's-p1c1',
      order: 1,
      kind: 'chapter',
      label: 'Part One, Chapter 1',
      summaryHtml:
        'Winston Smith returns to his flat in Victory Mansions on a "bright cold day in April". Orwell establishes the world of Oceania in quick succession: the omnipresent telescreen, posters of Big Brother captioned "BIG BROTHER IS WATCHING YOU", the Party slogans on the Ministry of Truth building ("WAR IS PEACE. FREEDOM IS SLAVERY. IGNORANCE IS STRENGTH"), and the four Ministries. In a small alcove hidden from the telescreen\'s view, Winston begins an illegal diary and, almost involuntarily, writes "DOWN WITH BIG BROTHER" over and over.',
      keyEvents: [
        'The world of Oceania and the Party is established through setting and symbol',
        'Winston begins his diary in the blind spot of the telescreen',
        'He writes "DOWN WITH BIG BROTHER" — his first concrete act of rebellion',
      ],
      ideasIntroduced: [
        'Total surveillance as a mechanism of psychological control',
        'The Party\'s doctrine expressed through paradoxical slogans',
        'Private thought as the last remaining space for rebellion',
      ],
      charactersInFocus: ['winston'],
      turningPointHtml:
        'The diary entry is the novel\'s inciting act of rebellion — the first moment Winston commits a thoughtcrime to paper rather than containing it in his own mind.',
      quoteIds: ['q-opening-line', 'q-war-is-peace', 'q-bb-watching', 'q-down-with-bb'],
    },
    {
      id: 's-p1c7',
      order: 2,
      kind: 'chapter',
      label: 'Part One, Chapter 7',
      summaryHtml:
        'In an extended diary entry, Winston reflects on the Party\'s falsification of history — recalling a doctored photograph that proved three men (Jones, Aaronson and Rutherford) had been framed — and on the proles, the vast, apathetic working class the Party barely bothers to control. He writes that "if there is hope, it lies in the proles", before immediately second-guessing himself: the proles will "never rebel" precisely because they lack the political consciousness the Party has denied them. He affirms his own sanity against the Party\'s control of reality by insisting that "two plus two make four" and that "freedom is the freedom to say" so.',
      keyEvents: [
        'Winston recalls the doctored photograph disproving the Party\'s official record',
        'He writes "if there is hope, it lies in the proles" — then interrogates his own hope',
        'He defines freedom, sanity and objective truth in explicitly numerical terms',
      ],
      ideasIntroduced: [
        'The Party\'s control of the past as control of the present and future',
        'The paradox at the heart of rebellion: consciousness and rebellion each require the other',
        'Objective, mathematical truth as the last line of defence against doublethink',
      ],
      charactersInFocus: ['winston'],
      turningPointHtml:
        'This is the novel\'s clearest articulation of Winston\'s internal contradiction — he locates hope in the proles in the same breath as he proves, to himself, why that hope is naive.',
      quoteIds: [
        'q-who-controls-past',
        'q-cubic-centimetres',
        'q-hope-proles',
        'q-two-plus-two',
        'q-sanity-not-statistical',
        'q-never-rebel',
      ],
    },
    {
      id: 's-p2c10',
      order: 3,
      kind: 'chapter',
      label: 'Part Two, Chapter 10',
      summaryHtml:
        'Winston and Julia\'s affair reaches its final, brief moment of security in the room above Mr Charrington\'s shop, which they had believed to be a private refuge safe from the telescreen. A voice suddenly speaks from behind a hidden telescreen concealed in the room, and armed men burst in — Mr Charrington himself is revealed as a member of the Thought Police. Winston and Julia are arrested.',
      keyEvents: [
        'Winston and Julia treat the room above the shop as their one safe, private space',
        'A hidden telescreen is revealed behind a picture in the room, exposing that they were watched the entire time',
        'Mr Charrington is unmasked as a Thought Police agent',
        'Winston and Julia are arrested by the Thought Police',
      ],
      ideasIntroduced: [
        'The illusion of private space as itself a Party trap, not a genuine gap in surveillance',
        'The totality of Party surveillance — even a space that felt safe was constructed to appear so',
      ],
      charactersInFocus: ['winston', 'julia'],
      turningPointHtml:
        'The arrest is the novel\'s structural pivot from rebellion to punishment — everything after this chapter concerns the Ministry of Love\'s dismantling of Winston, not his resistance.',
      quoteIds: ['q-we-are-the-dead', 'q-picture-hides-telescreen'],
    },
    {
      id: 's-p3c3',
      order: 4,
      kind: 'chapter',
      label: 'Part Three, Chapter 3',
      summaryHtml:
        'Under interrogation and torture in the Ministry of Love, Winston is confronted by O\'Brien, who now openly reveals himself as his torturer rather than a fellow conspirator. O\'Brien explains the Party\'s philosophy of power directly and without euphemism: the Party seeks power purely for its own sake, not as a means to any other end. He describes the future as "a boot stamping on a human face — forever," and tells Winston that whatever awaits him in the feared Room 101 is simply "the worst thing in the world" — different for every individual.',
      keyEvents: [
        'O\'Brien reveals himself as Winston\'s interrogator, not a fellow member of the resistance',
        'O\'Brien states the Party\'s philosophy: power is sought entirely for its own sake',
        'O\'Brien describes the future as a "boot stamping on a human face — forever"',
        'Room 101 is introduced as containing "the worst thing in the world", tailored to each prisoner',
      ],
      ideasIntroduced: [
        'Power as an end in itself, not a means to utopia or any other stated goal',
        'The individualised, total nature of psychological torture',
        'The novel\'s bleakest, most explicit statement of its political vision',
      ],
      charactersInFocus: ['winston', 'obrien'],
      turningPointHtml:
        'O\'Brien\'s unmasking and his direct statement of the Party\'s philosophy strip away any remaining ambiguity about what the Party is and what it wants — after this chapter, the novel has no more secrets left to reveal, only Winston\'s final breaking to dramatise.',
      quoteIds: ['q-boot-stamping', 'q-power-is-an-end', 'q-room-101-worst-thing'],
    },
    {
      id: 's-p3c5',
      order: 5,
      kind: 'chapter',
      label: 'Part Three, Chapter 5',
      summaryHtml:
        'Winston is finally taken to Room 101 and confronted with his own worst fear: rats. Facing a cage of rats about to be fitted over his face, Winston breaks completely, screaming for the torture to be inflicted on Julia instead of him. This is the novel\'s final and total betrayal — not merely physical compliance, but Winston actively wishing suffering onto the one person he claimed to love.',
      keyEvents: [
        'Winston is brought face to face with his own personal worst fear in Room 101',
        'He screams "Do it to Julia! Not me!" — betraying her completely to save himself',
        'His resistance, and his love for Julia, are shown to collapse simultaneously',
      ],
      ideasIntroduced: [
        'The individualised, total nature of the Party\'s method — it does not need a universal weapon, only each prisoner\'s own specific fear',
        'Love and loyalty exposed as unable to survive sufficiently targeted psychological pressure',
      ],
      charactersInFocus: ['winston', 'julia'],
      turningPointHtml:
        'This is the novel\'s actual climax — not the arrest, but this moment, where Winston\'s capitulation becomes total and irreversible, setting up the empty, loveless reunion and final "conversion" of the closing chapter.',
      quoteIds: ['q-do-it-to-julia'],
    },
    {
      id: 's-p3c6',
      order: 6,
      kind: 'chapter',
      label: 'Part Three, Chapter 6',
      summaryHtml:
        'The novel\'s final chapter. Winston, now released and hollowed out by his re-education, drinks alone at the Chestnut Tree Café. He encounters Julia again; both have betrayed the other under torture, and neither feels anything for the other any more. A martial announcement of victory on the telescreen sweeps Winston up in genuine, unforced love for the Party. The novel closes: "He loved Big Brother."',
      keyEvents: [
        'Winston and Julia meet again, changed and emotionally dead to one another',
        'A victory announcement triggers Winston\'s genuine emotional surrender to the Party',
        'The closing line confirms the total success of his re-education',
      ],
      ideasIntroduced: [
        'The completeness of psychological control once resistance is broken',
        'Love and human connection as casualties of totalitarian re-education',
      ],
      charactersInFocus: ['winston', 'julia'],
      turningPointHtml:
        'The final line is the novel\'s bleakest possible resolution: not merely defeat, but Winston\'s sincere, unforced love for the thing that destroyed him.',
      quoteIds: ['q-we-are-the-dead', 'q-loved-big-brother'],
    },
  ],
  characters: [
    {
      id: 'winston',
      name: 'Winston Smith',
      roleHtml:
        'The novel\'s protagonist, a 39-year-old member of the Outer Party working in the Records Department of the Ministry of Truth, where his job is to rewrite historical documents to match the Party\'s current version of events.',
      relationshipsHtml:
        'Begins an affair with Julia in defiance of the Party\'s ban on sexual relationships not sanctioned for reproduction; is drawn in and ultimately destroyed by O\'Brien, who poses as a fellow member of the resistance.',
      developmentHtml:
        'Moves from private, internalised doubt (the diary) to active rebellion (the affair, contact with the Brotherhood) to total psychological submission after torture in the Ministry of Love — Orwell uses Winston as an everyman figure through whom the reader experiences the totalising reach of the Party\'s control.',
      associatedThemeIds: ['t-control', 't-truth-memory', 't-rebellion'],
      quoteIds: [
        'q-opening-line',
        'q-down-with-bb',
        'q-cubic-centimetres',
        'q-hope-proles',
        'q-two-plus-two',
        'q-sanity-not-statistical',
        'q-never-rebel',
        'q-we-are-the-dead',
        'q-loved-big-brother',
        'q-room-101-worst-thing',
        'q-do-it-to-julia',
      ],
    },
    {
      id: 'julia',
      name: 'Julia',
      roleHtml:
        'A young Outer Party member who works in the Fiction Department. She rebels against the Party through private pleasure and sexuality rather than Winston\'s intellectual and political conviction.',
      relationshipsHtml:
        'Winston\'s lover; their relationship is the novel\'s central act of sustained rebellion until their arrest.',
      developmentHtml:
        'Represents an alternative mode of resistance to Winston\'s — instinctive and hedonistic rather than ideological — which makes her eventual, equally complete capitulation just as damning of the Party\'s methods.',
      associatedThemeIds: ['t-rebellion'],
      quoteIds: ['q-we-are-the-dead', 'q-do-it-to-julia'],
    },
    {
      id: 'obrien',
      name: "O'Brien",
      roleHtml:
        'A senior, powerful member of the Inner Party who poses as a covert member of the anti-Party resistance (the Brotherhood) to draw Winston out, before revealing himself as Winston\'s interrogator and torturer in the Ministry of Love.',
      relationshipsHtml:
        'Functions as a father-figure-turned-torturer to Winston, embodying the Party\'s total control of both political power and psychological method.',
      developmentHtml:
        'Never wavers or is humanised in the way Winston and Julia are — Orwell uses him as the voice of the Party\'s ideology stated plainly, including its explicit description of doublethink.',
      associatedThemeIds: ['t-control', 't-truth-memory'],
      quoteIds: ['q-doublethink', 'q-boot-stamping', 'q-power-is-an-end', 'q-room-101-worst-thing'],
    },
  ],
  themes: [
    {
      id: 't-control',
      name: 'Total Surveillance and Psychological Control',
      explanationHtml:
        'The Party maintains power not just through physical force but by making genuine private thought — let alone action — impossible, via telescreens, the Thought Police, and constant propaganda.',
      developmentHtml:
        'Established through setting in the opening chapter, then deepened through Winston\'s growing paranoia and, finally, demonstrated completely in his re-education in the Ministry of Love.',
      keySectionIds: ['s-p1c1', 's-p3c3', 's-p3c6'],
      associatedCharacterIds: ['winston', 'obrien'],
      quoteIds: ['q-bb-watching', 'q-cubic-centimetres', 'q-loved-big-brother', 'q-boot-stamping', 'q-power-is-an-end'],
      techniqueIds: ['t-symbolism', 't-imagery', 't-repetition', 't-motif'],
      possibleArguments: [
        'Orwell represents surveillance as a psychological, not merely physical, technology of control',
        'The Party\'s control is only complete once it produces genuine belief, not just outward compliance',
        'O\'Brien\'s explicit statement that "power is not a means, it is an end" strips away any instrumental justification for the Party\'s methods, presenting domination as self-justifying',
      ],
    },
    {
      id: 't-truth-memory',
      name: 'The Manipulation of Truth and Memory',
      explanationHtml:
        'The Party\'s control of historical record — and its doctrine of doublethink — destroys any stable, external basis for truth, leaving Winston to defend objective reality (that "two plus two make four") almost alone.',
      developmentHtml:
        'Introduced through Winston\'s own job rewriting records, deepened through the doctored photograph and his diary reflections in Chapter 7, and stated as explicit doctrine via doublethink.',
      keySectionIds: ['s-p1c7'],
      associatedCharacterIds: ['winston', 'obrien'],
      quoteIds: ['q-who-controls-past', 'q-two-plus-two', 'q-doublethink'],
      techniqueIds: ['t-paradox', 't-neologism', 't-irony'],
      possibleArguments: [
        'Orwell presents objective, mathematical truth as the last defensible position against totalitarian control of reality',
        'Doublethink is the mechanism that makes the Party\'s contradictions psychologically sustainable for its members',
      ],
    },
    {
      id: 't-rebellion',
      name: 'The Fragility of Rebellion and Hope',
      explanationHtml:
        'Every form of rebellion in the novel — Winston\'s diary, his and Julia\'s affair, his hope in the proles — is shown to be provisional, partial, and ultimately unable to withstand the Party\'s methods.',
      developmentHtml:
        'Winston\'s hope in the proles is immediately undercut by his own logic in Chapter 7; the final chapter confirms that even romantic love, the novel\'s other site of resistance, does not survive re-education.',
      keySectionIds: ['s-p1c7', 's-p3c5', 's-p3c6'],
      associatedCharacterIds: ['winston', 'julia'],
      quoteIds: ['q-hope-proles', 'q-never-rebel', 'q-we-are-the-dead', 'q-do-it-to-julia'],
      techniqueIds: ['t-paradox', 't-characterisation'],
      possibleArguments: [
        'Orwell structures Winston\'s rebellion as self-defeating from the outset, not merely crushed from outside',
        'The novel denies the reader a redemptive final act of resistance, which is itself the point being made about totalitarianism',
        'Room 101 reveals that even love, not just political conviction, cannot survive sufficiently individualised psychological pressure',
      ],
    },
  ],
  quotes: [
    {
      id: 'q-opening-line',
      textHtml:
        'It was a bright cold day in April, and the clocks were striking thirteen.',
      speaker: null,
      location: 'Part One, Chapter 1',
      sectionId: 's-p1c1',
      themeIds: ['t-control'],
      techniqueIds: ['t-imagery', 't-juxtaposition'],
      characterIds: [],
      contextHtml: 'The novel\'s opening sentence.',
      revealsHtml:
        'Establishes a familiar, almost pastoral image ("a bright cold day in April") before undercutting it with a single wrong detail — clocks do not strike thirteen. The world is instantly marked as both ordinary and subtly, wrongly different.',
      authorialPurposeHtml:
        'Orwell signals from the first sentence that this is a world where something fundamental has been quietly broken, without needing exposition to say so.',
      argumentHtml:
        'Orwell\'s deceptively simple opening line uses a single jarring detail to destabilise the reader\'s sense of normality before the totalitarian world of Oceania is even described.',
    },
    {
      id: 'q-war-is-peace',
      textHtml: 'WAR IS PEACE. FREEDOM IS SLAVERY. IGNORANCE IS STRENGTH.',
      speaker: null,
      location: 'Part One, Chapter 1',
      sectionId: 's-p1c1',
      themeIds: ['t-truth-memory'],
      techniqueIds: ['t-paradox'],
      characterIds: [],
      contextHtml: 'The Party\'s three slogans, displayed on the white pyramid of the Ministry of Truth.',
      revealsHtml:
        'The Party\'s ideology depends on holding contradictory ideas as simultaneously true — the seed of doublethink stated as public doctrine, not private psychology.',
      authorialPurposeHtml:
        'Orwell uses paradox as the Party\'s own rhetorical style to show that totalitarian language does not persuade through logic but overrides it.',
      argumentHtml:
        'Orwell exposes how totalitarian regimes use paradoxical slogans to make contradiction itself a tool of control, foreclosing rational argument before it can begin.',
    },
    {
      id: 'q-bb-watching',
      textHtml: 'BIG BROTHER IS WATCHING YOU',
      speaker: null,
      location: 'Part One, Chapter 1',
      sectionId: 's-p1c1',
      themeIds: ['t-control'],
      techniqueIds: ['t-symbolism', 't-repetition'],
      characterIds: [],
      contextHtml: 'The caption beneath the poster of Big Brother\'s face, described as being on every landing.',
      revealsHtml:
        'Big Brother functions less as an individual and more as a permanent, symbolic reminder that privacy does not exist.',
      authorialPurposeHtml:
        'By repeating this image throughout the novel, Orwell dramatises surveillance as an atmosphere the characters live inside, not an event that happens to them.',
      argumentHtml:
        'The relentless repetition of Big Brother\'s image across the text mirrors the inescapability of Party surveillance in the lives of Oceania\'s citizens.',
    },
    {
      id: 'q-down-with-bb',
      textHtml: 'DOWN WITH BIG BROTHER',
      speaker: 'Winston Smith',
      location: 'Part One, Chapter 1',
      sectionId: 's-p1c1',
      themeIds: ['t-rebellion'],
      techniqueIds: ['t-characterisation'],
      characterIds: ['winston'],
      contextHtml: 'What Winston finds himself writing, almost without deciding to, in his new diary.',
      revealsHtml:
        'Winston\'s rebellion begins as something closer to an involuntary bodily act than a considered political decision.',
      authorialPurposeHtml:
        'Orwell locates the origin of rebellion in instinct rather than ideology, suggesting the desire for truth and autonomy survives even under total control.',
      argumentHtml:
        'Winston\'s almost involuntary act of writing "Down with Big Brother" suggests that the human impulse toward dissent persists beneath even the most totalising indoctrination.',
    },
    {
      id: 'q-who-controls-past',
      textHtml:
        'Who controls the past controls the future. Who controls the present controls the past.',
      speaker: null,
      location: 'Part One',
      sectionId: null,
      themeIds: ['t-truth-memory'],
      techniqueIds: ['t-irony', 't-repetition'],
      characterIds: [],
      contextHtml: 'A Party slogan Winston reflects on in relation to his own work altering historical records.',
      revealsHtml:
        'The Party understands that political power depends on controlling not just the future but the historical record itself.',
      authorialPurposeHtml:
        'Orwell exposes the Party\'s core method: rewriting the past is not incidental to its power, it is the foundation of it.',
      argumentHtml:
        'Orwell frames the falsification of history as the Party\'s central technology of control, more fundamental than surveillance or violence.',
    },
    {
      id: 'q-cubic-centimetres',
      textHtml: 'Nothing was your own except the few cubic centimetres inside your skull.',
      speaker: 'Winston Smith',
      location: 'Part One, Chapter 7',
      sectionId: 's-p1c7',
      themeIds: ['t-control'],
      techniqueIds: ['t-narrative-voice', 't-imagery'],
      characterIds: ['winston'],
      contextHtml: 'Winston\'s internal reflection on the extent of the Party\'s reach into private life.',
      revealsHtml:
        'Even physical space and possessions offer no privacy; only the literal interior of the mind remains, in principle, unreachable.',
      authorialPurposeHtml:
        'Orwell uses close, restricted third-person narration to let the reader feel the claustrophobia of total surveillance from inside Winston\'s own head.',
      argumentHtml:
        'Orwell\'s use of restricted narration collapses the distance between reader and protagonist, making the reader complicit in Winston\'s search for a space the Party cannot reach.',
    },
    {
      id: 'q-hope-proles',
      textHtml: 'If there is hope, it lies in the proles.',
      speaker: 'Winston Smith',
      location: 'Part One, Chapter 7',
      sectionId: 's-p1c7',
      themeIds: ['t-rebellion'],
      techniqueIds: ['t-paradox'],
      characterIds: ['winston'],
      contextHtml: 'Written in Winston\'s diary, immediately followed by his own doubt about it.',
      revealsHtml:
        'Winston locates political hope in the one group the Party has not bothered to fully indoctrinate — precisely because they lack the consciousness to act on it.',
      authorialPurposeHtml:
        'Orwell sets up the central paradox of rebellion in the novel: hope and consciousness cannot exist independently of each other, but the Party has ensured neither can develop.',
      argumentHtml:
        'Winston\'s hope in the proles is undercut in the same diary entry, revealing rebellion in the novel as structurally self-defeating rather than merely externally suppressed.',
    },
    {
      id: 'q-two-plus-two',
      textHtml: 'Freedom is the freedom to say that two plus two make four.',
      speaker: 'Winston Smith',
      location: 'Part One, Chapter 7',
      sectionId: 's-p1c7',
      themeIds: ['t-truth-memory'],
      techniqueIds: ['t-paradox'],
      characterIds: ['winston'],
      contextHtml: 'Winston\'s diary, reducing the idea of freedom to its most minimal, defensible form.',
      revealsHtml:
        'When every other form of freedom has been stripped away, Winston retreats to the most basic claim possible: that objective, mathematical fact still exists.',
      authorialPurposeHtml:
        'Orwell narrows the definition of freedom to its bare minimum to show how far the Party\'s control has already progressed by this point in the novel.',
      argumentHtml:
        'Orwell positions objective truth as the last line of defence against totalitarianism, reducing the grand idea of "freedom" to a single mathematical fact.',
    },
    {
      id: 'q-sanity-not-statistical',
      textHtml: 'Sanity is not statistical.',
      speaker: 'Winston Smith',
      location: 'Part One, Chapter 7',
      sectionId: 's-p1c7',
      themeIds: ['t-truth-memory'],
      techniqueIds: ['t-paradox'],
      characterIds: ['winston'],
      contextHtml: 'Winston\'s diary, immediately after reflecting on "two plus two make four".',
      revealsHtml:
        'Winston insists that truth cannot be decided by majority belief, even though the Party\'s power rests on making its version of reality universally accepted.',
      authorialPurposeHtml:
        'Orwell has Winston articulate, almost as a private manifesto, the philosophical position the rest of the novel will go on to dismantle.',
      argumentHtml:
        'Winston\'s claim that "sanity is not statistical" foreshadows his eventual fate: the Party does not need to prove him wrong, only to make him alone in being right.',
    },
    {
      id: 'q-never-rebel',
      textHtml:
        'Until they become conscious they will never rebel, and until after they have rebelled they cannot become conscious.',
      speaker: 'Winston Smith',
      location: 'Part One, Chapter 7',
      sectionId: 's-p1c7',
      themeIds: ['t-rebellion'],
      techniqueIds: ['t-paradox'],
      characterIds: ['winston'],
      contextHtml: 'Winston\'s diary, reflecting on why the proles will never overthrow the Party.',
      revealsHtml:
        'A circular, self-sustaining logic that traps the proles (and, by extension, Winston himself) in permanent political paralysis.',
      authorialPurposeHtml:
        'Orwell uses circular reasoning as a structural device to demonstrate how the Party\'s control does not need active enforcement once a population is denied the tools for consciousness in the first place.',
      argumentHtml:
        'Orwell\'s circular logic here mirrors the closed system of the Party\'s power: rebellion and consciousness are made mutually dependent so that neither can occur first.',
    },
    {
      id: 'q-we-are-the-dead',
      textHtml: 'We are the dead.',
      speaker: 'Winston Smith',
      location: 'Part Two, Chapter 10',
      sectionId: 's-p2c10',
      themeIds: ['t-rebellion'],
      techniqueIds: ['t-foreshadowing', 't-irony'],
      characterIds: ['winston', 'julia'],
      contextHtml: 'Spoken by Winston to Julia in the room above Mr Charrington\'s shop, moments before the Thought Police arrest them.',
      revealsHtml:
        'Winston recognises, even before their arrest, that their rebellion was never going to be allowed to survive.',
      authorialPurposeHtml:
        'Orwell uses foreshadowing to strip any suspense from the arrest itself — the horror is in the inevitability, not the surprise.',
      argumentHtml:
        'By having Winston name his own fate before it arrives, Orwell frames the lovers\' rebellion as always having been provisional, granted only for as long as the Party chose not to intervene.',
    },
    {
      id: 'q-picture-hides-telescreen',
      textHtml: 'You are the dead.',
      speaker: 'Hidden voice (an officer of the Thought Police)',
      location: 'Part Two, Chapter 10',
      sectionId: 's-p2c10',
      themeIds: ['t-control', 't-rebellion'],
      techniqueIds: ['t-irony', 't-foreshadowing'],
      characterIds: ['winston', 'julia'],
      contextHtml: 'The moment of Winston and Julia\'s arrest, immediately after Winston has echoed his own earlier premonition, "We are the dead."',
      revealsHtml: 'The disembodied voice\'s correction of Winston\'s tense — from "we" to "you" — confirms that the room the lovers believed private had been watched by a hidden telescreen the entire time, making their sense of safety retroactively an illusion staged by the Party.',
      authorialPurposeHtml: 'Orwell uses this precise, chilling grammatical correction to reveal the totality of the Party\'s surveillance — it does not simply catch Winston and Julia, it has been listening to their most private reflections on their own fate all along.',
      argumentHtml: 'Essential evidence for any argument that the novel presents privacy itself as an illusion the Party permits only as a trap, not a genuine gap in its control.',
    },
    {
      id: 'q-loved-big-brother',
      textHtml: 'He loved Big Brother.',
      speaker: null,
      location: 'Part Three, Chapter 6',
      sectionId: 's-p3c6',
      themeIds: ['t-control', 't-rebellion'],
      techniqueIds: ['t-narrative-voice', 't-irony'],
      characterIds: ['winston'],
      contextHtml: 'The novel\'s final line.',
      revealsHtml:
        'Winston\'s re-education has succeeded completely — not merely compliance, but sincere, unforced love for the regime that destroyed him.',
      authorialPurposeHtml:
        'Orwell denies the reader any redemptive final act, using the flat, simple declarative sentence to make the totality of Winston\'s defeat inescapable.',
      argumentHtml:
        'The stark simplicity of the closing sentence enacts the very erasure of complexity and interiority that the Party has inflicted on Winston, ending the novel on total psychological surrender rather than resistance.',
    },
    {
      id: 'q-doublethink',
      textHtml:
        'Doublethink means the power of holding two contradictory beliefs in one\'s mind simultaneously, and accepting both of them.',
      speaker: null,
      location: 'Part Two, Chapter 9 (extract from "The Theory and Practice of Oligarchical Collectivism")',
      sectionId: null,
      themeIds: ['t-truth-memory'],
      techniqueIds: ['t-neologism', 't-irony'],
      characterIds: ['obrien'],
      contextHtml: 'From the book-within-the-book Winston reads, explaining the Party\'s core psychological technique.',
      revealsHtml:
        'The Party\'s power depends on a specific mental skill it has cultivated in its members, not merely on lies imposed from outside.',
      authorialPurposeHtml:
        'By naming and defining doublethink explicitly, Orwell turns an abstract psychological process into a concrete, teachable concept — precise enough to become one of the novel\'s most influential contributions to the English language.',
      argumentHtml:
        'Orwell\'s invented term "doublethink" gives a precise name to a form of self-deception that makes totalitarian contradiction psychologically sustainable rather than merely externally enforced.',
    },
    {
      id: 'q-boot-stamping',
      textHtml: 'If you want a picture of the future, imagine a boot stamping on a human face — forever.',
      speaker: "O'Brien",
      location: 'Part Three, Chapter 3',
      sectionId: 's-p3c3',
      themeIds: ['t-control'],
      techniqueIds: ['t-imagery', 't-motif'],
      characterIds: ['obrien'],
      contextHtml: "O'Brien's direct answer, under interrogation, to what kind of future the Party is building.",
      revealsHtml:
        'The image strips away any pretence of the Party pursuing a future good — permanence and cruelty, not utopia, are stated as the explicit goal.',
      authorialPurposeHtml:
        'Orwell has O\'Brien articulate the novel\'s political vision with total, unambiguous clarity at the point where Winston (and the reader) can no longer look away from it.',
      argumentHtml:
        'The single most quoted line in the novel for articulating the Party\'s vision of power as permanent domination for its own sake, with no redemptive end goal.',
    },
    {
      id: 'q-power-is-an-end',
      textHtml: 'Power is not a means, it is an end.',
      speaker: "O'Brien",
      location: 'Part Three, Chapter 3',
      sectionId: 's-p3c3',
      themeIds: ['t-control'],
      techniqueIds: ['t-paradox'],
      characterIds: ['obrien'],
      contextHtml: "O'Brien explains the Party's philosophy directly to Winston during his interrogation.",
      revealsHtml:
        'By explicitly denying that power serves any further purpose, O\'Brien removes the last possible justification a reader might have imagined for the Party\'s methods.',
      authorialPurposeHtml:
        'Orwell uses O\'Brien as a mouthpiece to state the novel\'s political thesis in the plainest possible terms, without needing further narrative demonstration.',
      argumentHtml:
        'Essential evidence for any essay arguing the novel presents totalitarian power as self-justifying rather than instrumental.',
    },
    {
      id: 'q-room-101-worst-thing',
      textHtml: 'The thing that is in Room 101 is the worst thing in the world.',
      speaker: "O'Brien",
      location: 'Part Three, Chapter 3',
      sectionId: 's-p3c3',
      themeIds: ['t-control'],
      techniqueIds: ['t-foreshadowing'],
      characterIds: ['obrien', 'winston'],
      contextHtml: "O'Brien introduces Room 101 to Winston before he is eventually taken there.",
      revealsHtml:
        'By defining the room\'s contents only as relative to each individual prisoner\'s own worst fear, Orwell shows the Party\'s method is tailored and individualised, not a single universal weapon.',
      authorialPurposeHtml:
        'Builds dread through vagueness rather than explicit description, and foreshadows the individualised nature of Winston\'s specific breaking point.',
      argumentHtml:
        'Useful for essays discussing how the Party\'s control operates on a psychological, individualised level rather than through uniform physical force.',
    },
    {
      id: 'q-do-it-to-julia',
      textHtml: 'Do it to Julia! Not me! I don\'t care what you do to her.',
      speaker: 'Winston Smith',
      location: 'Part Three, Chapter 5',
      sectionId: 's-p3c5',
      themeIds: ['t-rebellion', 't-control'],
      techniqueIds: ['t-characterisation'],
      characterIds: ['winston', 'julia'],
      contextHtml: 'Winston\'s scream in Room 101, facing his worst personal fear.',
      revealsHtml:
        'Winston\'s final, total betrayal of Julia — not merely physical compliance under torture, but an active wish that she suffer in his place.',
      authorialPurposeHtml:
        'Orwell locates the novel\'s true climax here rather than at the arrest, showing that love, like rebellion, cannot survive sufficiently targeted psychological pressure.',
      argumentHtml:
        'The single most important quote for any argument about the novel\'s bleakest claim — that even love is not a stable foundation for resistance once the Party finds the right pressure point.',
    },
  ],
  techniques: [
    {
      id: 't-symbolism',
      name: 'Symbolism',
      category: 'symbolism-and-motif',
      definitionHtml: 'The use of an object, image or figure to represent an abstract idea beyond its literal meaning.',
      effectHtml: 'Compresses a large, abstract idea (omnipresent surveillance) into a single, repeatable image.',
      whyAuthorsUseItHtml:
        'Orwell needs the reader to feel constant surveillance as an atmosphere, not just be told about it — a recurring symbol achieves this more efficiently than exposition.',
      exampleQuoteId: 'q-bb-watching',
      genericExampleHtml: null,
      analyticalLanguage: ['symbolises', 'represents', 'is emblematic of', 'functions as a symbol for'],
      howToRecogniseHtml:
        'A concrete object or image that keeps recurring and clearly stands for something bigger than itself — ask "what idea does this object keep pointing back to?"',
      commonMistakeHtml:
        'Calling any recurring detail "symbolism" without explaining what abstract idea it represents — a symbol needs a stated referent, not just repetition (that\'s motif).',
      confusedWithIds: ['t-motif', 't-metaphor'],
    },
    {
      id: 't-imagery',
      name: 'Imagery',
      category: 'figurative-language',
      definitionHtml: 'Descriptive language that appeals to the senses to create a vivid mental picture.',
      effectHtml: 'Grounds an unfamiliar dystopian world in concrete, sensory detail so it feels real rather than abstract.',
      whyAuthorsUseItHtml: 'Orwell wants Oceania to feel physically oppressive — decayed, cold, watched — not just ideologically wrong.',
      exampleQuoteId: 'q-opening-line',
      genericExampleHtml: null,
      analyticalLanguage: ['evokes', 'conjures', 'renders tangible', 'appeals to the senses'],
      howToRecogniseHtml:
        'Look for concrete, sensory description (sight, sound, touch, smell, taste, or bodily movement) rather than an abstract statement.',
      commonMistakeHtml:
        'Writing "this creates imagery" as if that were an effect — imagery is the technique; the effect is what specific sense it appeals to and what that makes the reader picture or feel.',
      confusedWithIds: ['t-visual-imagery', 't-symbolism'],
    },
    {
      id: 't-juxtaposition',
      name: 'Juxtaposition',
      category: 'structure-and-form',
      definitionHtml: 'Placing two contrasting ideas or images side by side to highlight their difference.',
      effectHtml: 'Creates immediate unease by disrupting an expectation the reader has just formed.',
      whyAuthorsUseItHtml: 'Orwell uses it from the very first sentence to destabilise the reader\'s sense of a normal world before any exposition begins.',
      exampleQuoteId: 'q-opening-line',
      genericExampleHtml: null,
      analyticalLanguage: ['juxtaposes', 'sets in tension', 'contrasts sharply with'],
      howToRecogniseHtml:
        'Two details placed right next to each other that pull in different directions — one ordinary, one wrong; one hopeful, one bleak.',
      commonMistakeHtml:
        'Confusing juxtaposition (placement creating contrast) with antithesis (a balanced grammatical structure built specifically around opposites) — they overlap but aren\'t the same device.',
      confusedWithIds: ['t-antithesis', 't-contrast'],
    },
    {
      id: 't-paradox',
      name: 'Paradox / Oxymoron',
      category: 'language-and-diction',
      definitionHtml: 'A statement that contains or appears to contain contradictory or incompatible elements.',
      effectHtml: 'Forces the mind to hold two incompatible ideas at once, mirroring the Party\'s own doctrine of doublethink.',
      whyAuthorsUseItHtml: 'Orwell makes paradox the Party\'s signature rhetorical style, so the reader experiences the same disorientation the Party inflicts on its citizens.',
      exampleQuoteId: 'q-war-is-peace',
      genericExampleHtml: null,
      analyticalLanguage: ['paradoxically', 'the oxymoronic pairing of', 'holds in tension', 'reconciles the irreconcilable'],
      howToRecogniseHtml:
        'A short phrase or statement that is literally self-contradictory (oxymoron: two contradictory words together) or a longer idea that seems impossible yet is asserted as true (paradox).',
      commonMistakeHtml:
        'Labelling any contrast as a paradox — a paradox specifically holds contradictory things as simultaneously true, it doesn\'t just contrast two different things (that\'s juxtaposition).',
      confusedWithIds: ['t-juxtaposition', 't-irony'],
    },
    {
      id: 't-narrative-voice',
      name: 'Restricted Third-Person Narration',
      category: 'narrative-voice',
      definitionHtml: 'A third-person narrative voice confined to a single character\'s perceptions and thoughts.',
      effectHtml: 'Collapses the distance between reader and protagonist, so the reader experiences the Party\'s reach as claustrophobically as Winston does.',
      whyAuthorsUseItHtml: 'Orwell needs the reader to feel Winston\'s paranoia and interior contradictions directly, not observe them from a distance.',
      exampleQuoteId: 'q-cubic-centimetres',
      genericExampleHtml: null,
      analyticalLanguage: ['restricts the reader to', 'filters events through', 'grants access only to'],
      howToRecogniseHtml:
        'The narration uses "he"/"she" but only ever tells you what one character perceives, thinks or feels — nothing another character couldn\'t also see.',
      commonMistakeHtml:
        'Calling this "first person" because it feels intimate — it is still third person ("he" not "I"), just tightly restricted to one character\'s point of view.',
      confusedWithIds: ['t-tone'],
    },
    {
      id: 't-repetition',
      name: 'Repetition',
      category: 'structure-and-form',
      definitionHtml: 'The recurrence of a word, phrase or image across a text.',
      effectHtml: 'Mimics the way propaganda works on its audience — through relentless, inescapable recurrence rather than persuasion.',
      whyAuthorsUseItHtml: 'Orwell wants the Party\'s slogans and imagery to feel inescapable to the reader in the same way they are inescapable to the citizens of Oceania.',
      exampleQuoteId: 'q-bb-watching',
      genericExampleHtml: null,
      analyticalLanguage: ['is reiterated throughout', 'recurs as a refrain', 'reinforces through repetition'],
      howToRecogniseHtml:
        'The same word, phrase or image recurs at multiple points in the text, not just once.',
      commonMistakeHtml:
        'Naming "repetition" without saying what recurs or where — a strong answer quotes the repeated element and says how many/where it recurs.',
      confusedWithIds: ['t-anaphora', 't-motif'],
    },
    {
      id: 't-neologism',
      name: 'Neologism (Newspeak)',
      category: 'language-and-diction',
      definitionHtml: 'A newly coined word or expression, in this case invented as part of the novel\'s fictional language, Newspeak.',
      effectHtml: 'Gives an abstract psychological process a precise, almost clinical name, making the Party\'s methods feel systematised.',
      whyAuthorsUseItHtml: 'Orwell wanted to demonstrate how controlling language itself can limit or enable what a population is even able to think.',
      exampleQuoteId: 'q-doublethink',
      genericExampleHtml: null,
      analyticalLanguage: ['coins the term', 'invents a neologism for', 'names the previously unnamed'],
      howToRecogniseHtml:
        'A word that doesn\'t exist in ordinary English, usually a compound (doublethink, thoughtcrime, duckspeak) coined for a specific in-world concept.',
      commonMistakeHtml:
        'Treating the neologism as decorative rather than ideological — in this text, naming and coining new words is itself how the Party (and Orwell) exercises control over thought.',
      confusedWithIds: [],
    },
    {
      id: 't-irony',
      name: 'Irony',
      category: 'structure-and-form',
      definitionHtml: 'A contrast between expectation (or surface meaning) and reality.',
      effectHtml: 'Exposes the gap between the Party\'s stated purpose and its actual function (the Ministry of Truth produces lies; Winston\'s "freedom" is a diary he could be executed for).',
      whyAuthorsUseItHtml: 'Orwell uses irony throughout to let the reader see through the Party\'s doctrine even as its citizens cannot.',
      exampleQuoteId: 'q-who-controls-past',
      genericExampleHtml: null,
      analyticalLanguage: ['ironically', 'belies the stated purpose of', 'undercuts the surface claim that'],
      howToRecogniseHtml:
        'A stated name, claim or outcome that the reader can see directly contradicts the reality the text has already shown them.',
      commonMistakeHtml:
        'Using "irony" to mean "coincidence" or simply "bad luck" — irony specifically requires a gap between an expectation/claim and the truth, visible to the reader (or audience) but not necessarily to the character.',
      confusedWithIds: ['t-paradox'],
    },
    {
      id: 't-foreshadowing',
      name: 'Foreshadowing',
      category: 'structure-and-form',
      definitionHtml: 'A hint or indication of events to come later in the narrative.',
      effectHtml: 'Removes suspense in favour of dread — the reader senses the outcome before it happens.',
      whyAuthorsUseItHtml: 'Orwell wants the arrest and re-education to feel inevitable rather than shocking, reinforcing the novel\'s fatalism about resistance under total surveillance.',
      exampleQuoteId: 'q-we-are-the-dead',
      genericExampleHtml: null,
      analyticalLanguage: ['foreshadows', 'presages', 'anticipates the eventual'],
      howToRecogniseHtml:
        'A detail that only becomes significant in hindsight — reread the passage after knowing the ending and notice what it was already hinting at.',
      commonMistakeHtml:
        'Pointing at foreshadowing without naming the later event it anticipates — the analysis needs both ends of the link, not just the early hint.',
      confusedWithIds: [],
    },
    {
      id: 't-characterisation',
      name: 'Characterisation',
      category: 'narrative-voice',
      definitionHtml: 'The techniques an author uses to develop and reveal a character\'s personality and inner life.',
      effectHtml: 'Builds Winston as an ordinary, flawed everyman so his fate reads as a warning about anyone, not an exceptional individual.',
      whyAuthorsUseItHtml: 'Orwell needs Winston\'s rebellion and eventual defeat to feel universal, not particular to one unusually heroic character.',
      exampleQuoteId: 'q-down-with-bb',
      genericExampleHtml: null,
      analyticalLanguage: ['characterises', 'reveals through action', 'constructs as an everyman figure'],
      howToRecogniseHtml:
        'A moment of action, dialogue, or interior thought that reveals something about who a character is, not just what is happening to them.',
      commonMistakeHtml:
        'Summarising plot ("Winston writes in his diary") instead of analysing what the moment reveals about character ("...revealing rebellion as instinctive rather than planned").',
      confusedWithIds: [],
    },
    {
      id: 't-motif',
      name: 'Motif',
      category: 'symbolism-and-motif',
      definitionHtml: 'A recurring image, phrase or idea that develops meaning through repetition, without necessarily standing in for one single fixed abstract idea the way a symbol does.',
      effectHtml: 'Builds cumulative significance across the text — each recurrence adds to, rather than simply restates, the pattern\'s meaning.',
      whyAuthorsUseItHtml: 'Orwell repeats images like the boot/face and the telescreen\'s gaze across the novel so their significance accumulates rather than being explained once and dropped.',
      exampleQuoteId: 'q-boot-stamping',
      genericExampleHtml: null,
      analyticalLanguage: ['recurs as a motif', 'develops cumulative significance through', 'is reinforced by its recurrence'],
      howToRecogniseHtml:
        'An image or idea that returns more than once across the text in a way that builds meaning, but doesn\'t necessarily stand for one single fixed abstract concept the way a symbol does.',
      commonMistakeHtml:
        'Using "motif" and "symbol" interchangeably — a symbol has one clear abstract referent (Big Brother\'s poster = surveillance); a motif is a repeated pattern whose meaning accumulates rather than resolves to one single idea.',
      confusedWithIds: ['t-symbolism', 't-repetition'],
    },
  ],
  shortAnswerQuestions: [
    {
      id: 'sa-1',
      qtype: 'identify',
      prompt:
        'Identify ONE Party slogan used in the opening chapters of Nineteen Eighty-Four and explain its function.',
      marks: 2,
      stimulusHtml: null,
      modelAnswerHtml:
        'One Party slogan is "WAR IS PEACE. FREEDOM IS SLAVERY. IGNORANCE IS STRENGTH", displayed on the Ministry of Truth. Its function is to assert contradictory ideas as simultaneously true, training citizens in the mental habit of doublethink before the term is ever explained.',
      markingGuidanceHtml:
        'Award 1 mark for correctly identifying a genuine Party slogan; award a second mark for a clear, text-specific explanation of its function (not just a definition of doublethink in the abstract).',
      keyPoints: [
        'Correctly quotes or paraphrases an actual Party slogan',
        'Explains what the slogan does (asserts contradiction as truth) rather than just describing it',
      ],
      relevantQuoteIds: ['q-war-is-peace'],
      strongerResponseHtml:
        'A stronger response would explicitly connect the slogan to the concept of doublethink and note that its placement on a government building normalises the paradox as public doctrine, not private confusion.',
    },
    {
      id: 'sa-2',
      qtype: 'explain',
      prompt:
        'Explain how Orwell\'s description of the telescreen and Big Brother posters in Chapter 1 establishes the Party\'s control over the individual.',
      marks: 3,
      stimulusHtml: null,
      modelAnswerHtml:
        'Orwell establishes surveillance as inescapable and atmospheric rather than occasional: the telescreen "could be dimmed, but there was no way of shutting it off completely", and Big Brother\'s image, captioned "BIG BROTHER IS WATCHING YOU", is described as present "on the landing" as well as elsewhere. Together these details show that private space has already been eliminated before the plot even begins, so the reader understands Winston\'s later diary-writing as a genuinely dangerous, almost impossible act.',
      markingGuidanceHtml:
        'Look for reference to at least one specific textual detail (the telescreen\'s always-on nature, or the repeated Big Brother image) and an explanation of its effect on the individual\'s sense of privacy or autonomy, not just a plot summary.',
      keyPoints: [
        'Specific reference to the telescreen or Big Brother poster',
        'Link between the detail and loss of privacy/autonomy',
        'Some sense of why this matters for the rest of the novel',
      ],
      relevantQuoteIds: ['q-bb-watching'],
      strongerResponseHtml:
        'A stronger response would note that the telescreen\'s ambiguity (Winston can never know if he is being watched at any given moment) is itself the mechanism of control — self-censorship, not just detection.',
    },
    {
      id: 'sa-3',
      qtype: 'analyse',
      prompt:
        'Analyse how Orwell uses restricted third-person narration in Chapter 7 to represent Winston\'s internal conflict.',
      marks: 4,
      stimulusHtml: null,
      modelAnswerHtml:
        'By confining the narration to Winston\'s own thoughts, Orwell lets the reader experience his diary reflections — "Nothing was your own except the few cubic centimetres inside your skull" — as unfiltered interior monologue rather than reported speech. This narrows the emotional distance between reader and protagonist, so that Winston\'s contradictory reasoning about the proles (hoping in them, then immediately doubting that hope) reads as a live, unresolved internal conflict rather than a settled conclusion the narrator is reporting on him.',
      markingGuidanceHtml:
        'Award marks for identifying the narrative technique specifically (restricted/close third person, not just "first person" or "the narrator"), linking it to a textual example, and analysing its effect on how the reader experiences Winston\'s conflict.',
      keyPoints: [
        'Correctly identifies restricted/close third-person narration',
        'Textual example from Chapter 7',
        'Analysis of effect on reader\'s access to internal conflict',
      ],
      relevantQuoteIds: ['q-cubic-centimetres', 'q-hope-proles'],
      strongerResponseHtml:
        'A stronger response would also note the diary form itself as a nested narrative device — Winston\'s writing is already a self-conscious performance of thought, which adds a further layer to the "restriction" of the narration.',
    },
    {
      id: 'sa-4',
      qtype: 'how',
      prompt:
        'How does Orwell\'s use of the invented term "doublethink" develop the reader\'s understanding of psychological control in the text?',
      marks: 4,
      stimulusHtml: null,
      modelAnswerHtml:
        'Doublethink is defined explicitly as "the power of holding two contradictory beliefs in one\'s mind simultaneously, and accepting both of them." By naming this process, Orwell moves it from an implicit pattern the reader has already noticed (in slogans like "WAR IS PEACE") to an explicit, almost technical concept — showing that the Party\'s control operates through a teachable mental skill in its members, not only through external lies imposed on a passive population.',
      markingGuidanceHtml:
        'Look for the direct link between the neologism and its effect on characterisation of Party members generally, not just a restatement of the definition.',
      keyPoints: [
        'Accurate definition or paraphrase of doublethink',
        'Link to psychological control specifically (internalised, not just imposed)',
        'Reference to how naming the concept changes the reader\'s understanding',
      ],
      relevantQuoteIds: ['q-doublethink', 'q-war-is-peace'],
      strongerResponseHtml:
        'A stronger response would connect doublethink back to Winston\'s own diary reasoning about the proles — showing that even Winston, the character resisting the Party, is shown performing a version of contradictory belief-holding himself.',
    },
    {
      id: 'sa-5',
      qtype: 'to-what-extent',
      prompt:
        'To what extent does Winston\'s diary entry "If there is hope, it lies in the proles" reveal a paradox at the heart of his rebellion?',
      marks: 5,
      stimulusHtml: null,
      modelAnswerHtml:
        'The entry reveals a significant paradox: in the same passage, Winston both locates political hope in the proles and undermines that hope by reasoning that "until they become conscious they will never rebel, and until after they have rebelled they cannot become conscious." This circular logic suggests that Winston\'s own rebellion is built on a foundation he has already recognised, in writing, to be unstable — his hope is genuine but structurally self-defeating, which anticipates the novel\'s ultimate refusal to offer a successful rebellion.',
      markingGuidanceHtml:
        'Reward responses that identify and explain the specific paradox (consciousness/rebellion circularity), rather than simply asserting that "hope is present" or "hope is false". A strong response should engage with "to what extent" by weighing the genuineness of the hope against its self-undermining logic.',
      keyPoints: [
        'Identifies the specific circular-logic paradox',
        'Uses the "never rebel... cannot become conscious" quote as evidence',
        'Engages with the "to what extent" framing rather than a one-sided answer',
        'Links to the novel\'s broader treatment of rebellion',
      ],
      relevantQuoteIds: ['q-hope-proles', 'q-never-rebel'],
      strongerResponseHtml:
        'A stronger response would extend the argument to the novel\'s ending, noting that Winston\'s own rebellion — like the hope he places in the proles — ultimately collapses in the same self-defeating way he predicted here, giving the paradox structural significance across the whole text.',
    },
  ],
  essayQuestions: [
    {
      id: 'essay-thesis-1',
      type: 'thesis',
      prompt:
        '"Individual identity cannot survive under totalitarian control." To what extent does this statement reflect the ideas explored in Nineteen Eighty-Four?',
      marks: null,
      suggestedEvidence: ['q-cubic-centimetres', 'q-loved-big-brother', 'q-we-are-the-dead'],
      modelThesisHtml:
        'While Winston Smith\'s diary and rebellion initially suggest that private identity can persist even under total surveillance, Orwell ultimately argues that individual identity cannot survive sustained, deliberate psychological re-education — the novel\'s ending shows not the suppression of Winston\'s selfhood but its genuine, willing replacement.',
      modelArgumentStructureHtml:
        'Structure: (1) concede the partial truth — private thought and rebellion do exist for a time (diary, affair); (2) pivot to the deeper claim — the Party\'s goal is not obedience but belief, achieved through re-education; (3) use the ending as proof that identity is not merely suppressed but overwritten.',
      modelResponseHtml:
        'A full response is not modelled at thesis-practice stage — see the full-essay question for a modelled response.',
      planningGuidanceHtml:
        'Decode the question: note the word "cannot" — this is an absolute claim, so a strong thesis usually complicates rather than flatly agrees or disagrees. Identify the key terms "individual identity" and "totalitarian control", then choose 2-3 pieces of evidence that let you show a change over time (identity present, then eroded, then replaced) rather than a static state.',
    },
    {
      id: 'essay-topic-sentence-1',
      type: 'topic-sentence',
      prompt:
        'Write a topic sentence for a body paragraph arguing that Orwell presents totalitarian power as pursued for its own sake, not as a means to any other end.',
      marks: null,
      suggestedEvidence: ['q-power-is-an-end', 'q-boot-stamping'],
      modelThesisHtml:
        'A strong topic sentence states the paragraph\'s specific claim and gestures at how the text proves it — not just what the paragraph is "about".',
      modelArgumentStructureHtml:
        'Formula: [Author] + [technique/method] + [specific claim] — e.g. "Orwell strips away any instrumental justification for the Party\'s rule through O\'Brien\'s direct admission that \'power is not a means, it is an end\', revealing totalitarian control as self-justifying rather than utopian."',
      modelResponseHtml:
        'Model topic sentence: "Orwell dismantles any redemptive justification for totalitarian rule through O\'Brien\'s explicit admission that power is pursued purely for its own sake, exposing the Party\'s control as self-justifying domination rather than a means to any stated collective good."',
      planningGuidanceHtml:
        'A weak topic sentence just restates the question ("Orwell shows that power is pursued for its own sake"). A strong one names the specific technique/evidence AND states what that evidence proves, in one sentence, before the paragraph\'s body unpacks it.',
    },
    {
      id: 'essay-paragraph-1',
      type: 'paragraph',
      prompt:
        'Write a full body paragraph analysing how Orwell\'s "boot stamping on a human face" image contributes to the novel\'s vision of totalitarian power.',
      marks: null,
      suggestedEvidence: ['q-boot-stamping', 'q-power-is-an-end'],
      modelThesisHtml:
        'A complete TEEL-plus paragraph needs: topic sentence, evidence, technique naming, effect/meaning, and an explicit link back to the question — not just evidence followed by paraphrase.',
      modelArgumentStructureHtml:
        'Structure: topic sentence → embedded quote → technique(s) named → effect on the reader → link back to the question\'s specific wording.',
      modelResponseHtml:
        '<p>Orwell dismantles any redemptive justification for totalitarian rule through O\'Brien\'s explicit admission that power is pursued purely for its own sake, exposing the Party\'s control as self-justifying domination rather than a means to any stated collective good. Under interrogation, O\'Brien tells Winston to "imagine a boot stamping on a human face — forever", a violent, visceral image intensified by the finality of "forever" and the absence of any limiting clause. Unlike conventional political propaganda, which typically frames oppression as a temporary or necessary evil in service of some future utopia, Orwell denies the reader even this comfort: the image offers no destination, only endless repetition of the same act of domination. This is reinforced moments later when O\'Brien states plainly that "power is not a means, it is an end" — a direct rejection of any instrumental justification the reader might supply on the Party\'s behalf. Together, these two moments constitute the novel\'s bleakest and most explicit statement of its political vision: totalitarian power, Orwell suggests, does not corrupt a good cause, because there was never a good cause to begin with.</p>',
      planningGuidanceHtml:
        'Note the paragraph above does five things in order: states a specific claim, embeds one quote with named technique(s), embeds a second quote reinforcing the first, explains what the combination proves, and closes with a sentence that could stand as the paragraph\'s own mini-thesis. Use this shape, not just "quote — explanation — quote — explanation" with no throughline.',
    },
    {
      id: 'essay-full-1',
      type: 'full-essay',
      prompt:
        '"Texts about human experiences endure because they force us to confront uncomfortable truths about ourselves." Discuss how this is true of Nineteen Eighty-Four and ONE related text of your own choosing.',
      marks: 20,
      suggestedEvidence: [
        'q-opening-line',
        'q-war-is-peace',
        'q-cubic-centimetres',
        'q-hope-proles',
        'q-never-rebel',
        'q-we-are-the-dead',
        'q-loved-big-brother',
      ],
      modelThesisHtml:
        'Nineteen Eighty-Four endures not because it predicts a specific political future, but because it forces readers to confront an uncomfortable truth about the malleability of their own minds under sufficient pressure — a truth a related text can extend by showing a different, but comparably uncomfortable, dimension of the human capacity for self-deception or complicity.',
      modelArgumentStructureHtml:
        'Suggested structure: (1) intro with thesis above; (2) body paragraph on Orwell\'s use of restricted narration and paradox to implicate the reader in Winston\'s reasoning, not just observe it; (3) body paragraph on the novel\'s refusal of a redemptive ending as its most uncomfortable truth; (4) body paragraph bringing in the related text\'s own version of this discomfort, explicitly compared rather than discussed in isolation; (5) conclusion returning to "endure" — why this discomfort keeps the text relevant beyond its original context.',
      modelResponseHtml:
        '<p>Texts about human experiences endure not because they flatter their readers, but because they force a confrontation with uncomfortable truths about the reader\'s own capacity for self-deception, complicity and psychological surrender. George Orwell\'s Nineteen Eighty-Four (1949) and Wilfred Owen\'s "Dulce et Decorum Est" (written 1917) each locate this discomfort in a different register — Orwell in the slow, total collapse of a single mind under totalitarian pressure, Owen in the immediate, visceral betrayal of a comforting national myth — but both endure by refusing their readers the comfort of easy distance from what they depict.</p><p>Orwell\'s most uncomfortable claim is not that totalitarian governments are cruel, which no reader needs convincing of, but that an ordinary mind — reasonable, self-aware, even resistant — can be made to genuinely believe what it knows to be false. Winston\'s restricted third-person narration lets the reader inhabit his reasoning directly, so that his diary\'s insistence that "freedom is the freedom to say that two plus two make four" feels like a shared, rational position rather than a special case of heroism. This is precisely what makes the novel\'s ending so uncomfortable: the final line, "He loved Big Brother," is delivered in the same close, intimate narration the reader has trusted throughout, denying any sense that Winston\'s capitulation is alien to the reasoning mind the reader has been following. Orwell compounds this through Winston\'s own diary reasoning about the proles — "until they become conscious they will never rebel, and until after they have rebelled they cannot become conscious" — a circular logic the reader recognises as sound even as it traps Winston in the same paralysis it describes. The uncomfortable truth is not about Oceania\'s government; it is that the reader has just followed a recognisable, rational mind all the way to its own sincere destruction.</p><p>Owen\'s poem locates a comparably uncomfortable truth in the immediate, embodied betrayal of inherited belief rather than its slow erosion. The poem opens by dismantling the heroic image of the soldier entirely — men "bent double, like old beggars under sacks" replace any expectation of upright, dignified marching with exhausted, aged degradation before the poem\'s central incident even begins. The gas attack that follows is rendered through visceral, embodied imagery — a man "guttering, choking, drowning" is watched "flound\'ring like a man in fire or lime," the simile refusing any dignity or distance from his suffering. Owen sharpens this into direct address in the poem\'s final stanza, turning to the reader ("My friend") to state that if they had witnessed "the white eyes writhing in his face… the blood / Come gargling from the froth-corrupted lungs," they "would not tell with such high zest / To children ardent for some desperate glory / The old Lie: Dulce et decorum est / Pro patria mori." Naming patriotic sacrifice a "Lie" in the poem\'s final line, delivered in the reader\'s own assumed language of Latin classical education, makes the discomfort personal and direct rather than observed from a safe historical distance.</p><p>Where the two texts differ is in the mechanism of discomfort: Orwell implicates the reader through psychological identification with a mind that ultimately fails, while Owen implicates the reader through direct address, converting a comfortable inherited belief into something the reader is forced to actively disown. Yet both endure for the same underlying reason — each refuses to let its "uncomfortable truth" remain safely about someone else. Orwell\'s restricted narration and Owen\'s direct address are different technical solutions to the same problem: how to make a reader recognise a capacity for self-deception or complicity in themselves, not merely observe it in a fictional government or a distant war. It is this refusal of comfortable distance, more than either text\'s specific historical subject, that explains why both continue to unsettle readers who have never lived under a totalitarian regime or fought in the trenches of the First World War.</p>',
      planningGuidanceHtml:
        'Decode the question: "uncomfortable truths about ourselves" asks you to move past what the text says about a totalitarian government and argue what it says about ordinary human psychology. Choose evidence that shows Winston\'s reasoning as recognisable, not alien, to the reader. Select a related text whose "uncomfortable truth" can be genuinely compared, not just placed alongside — comparison, not addition, is what Paper 1 rewards here. The model above uses Wilfred Owen\'s "Dulce et Decorum Est" (a common, NESA-permitted related text for this module) as one possible choice — if your own related text differs, keep the same comparative structure: identify each text\'s specific mechanism for implicating the reader, then compare the mechanisms directly rather than discussing the two texts in separate, unconnected halves.',
    },
  ],
}
