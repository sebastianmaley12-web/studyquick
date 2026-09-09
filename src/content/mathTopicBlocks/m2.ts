/**
 * MS-M2 Working with Time — block entries (topic slug "m2"). All 12
 * questions are time arithmetic / time zones with no genuine
 * diagram/table/graph to show, so each is paragraph + equation block(s)
 * making the arithmetic explicit.
 */
import type { MathBlockEntry } from '../../lib/content/mathBlocks'

export const M2_ENTRIES: Record<string, MathBlockEntry> = {
  m2q1: {
    blocks: [{ kind: 'paragraph', html: 'A worker starts at 07:45 and finishes at 15:20. How many minutes is this?' }],
    solutionBlocks: [
      { kind: 'paragraph', html: '07:45 to 15:20 is 7 hours 35 minutes:' },
      { kind: 'equation', latex: '7 \\times 60 + 35 = 455\\ \\text{minutes}' },
    ],
  },

  m2q2: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Perth (UTC+8) and Sydney (UTC+10) are in different time zones. When it is 2:00 pm in Sydney, what time is it in Perth?',
      },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: 'Perth is 2 hours behind Sydney:' },
      { kind: 'equation', latex: '10 - 8 = 2\\ \\text{hours}' },
      { kind: 'paragraph', html: '2:00 pm &minus; 2 hours = 12:00 noon.' },
    ],
  },

  m2q3: {
    blocks: [{ kind: 'paragraph', html: 'Convert 7 hours 45 minutes to decimal hours.' }],
    solutionBlocks: [
      { kind: 'equation', latex: '45 \\div 60 = 0.75\\ \\text{hours}' },
      { kind: 'equation', latex: '7 + 0.75 = 7.75\\ \\text{hours}' },
    ],
  },

  m2q4: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Write 4:35 pm in 24-hour time. (Give your answer as a 4-digit number, e.g. 0930.)',
      },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: 'Add 12 hours to pm times:' },
      { kind: 'equation', latex: '4{:}35 + 12{:}00 = 16{:}35' },
      { kind: 'paragraph', html: 'Written as 1635.' },
    ],
  },

  m2q5: {
    blocks: [
      { kind: 'paragraph', html: 'A night shift runs from 22:45 to 06:20 the next morning. How many minutes long is it?' },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: '22:45 to midnight is 1 h 15 min; midnight to 06:20 is 6 h 20 min:' },
      { kind: 'equation', latex: '1\\ \\text{h}\\ 15\\ \\text{min} + 6\\ \\text{h}\\ 20\\ \\text{min} = 7\\ \\text{h}\\ 35\\ \\text{min}' },
      { kind: 'equation', latex: '7 \\times 60 + 35 = 455\\ \\text{minutes}' },
    ],
  },

  m2q6: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Two places lie on longitudes 135&deg;E and 60&deg;E. What is the time difference between them, in hours?',
      },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: 'The Earth turns 15&deg; per hour. The longitude difference is:' },
      { kind: 'equation', latex: '135 - 60 = 75^{\\circ}' },
      { kind: 'equation', latex: '75 \\div 15 = 5\\ \\text{hours}' },
    ],
  },

  m2q7: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A bus leaves at 07:52 and the trip takes 1 hour 18 minutes. Give the arrival time in 24-hour time as a 4-digit number.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '07{:}52 + 1\\ \\text{h} = 08{:}52' },
      { kind: 'equation', latex: '08{:}52 + 18\\ \\text{min} = 09{:}10' },
      { kind: 'paragraph', html: 'Written as 0910.' },
    ],
  },

  m2q8: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'When daylight saving begins in NSW, clocks are put forward one hour. A flight leaves at 1:30 am standard time on that morning. What is the new local time?',
      },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: 'Putting clocks forward one hour adds an hour to the reading:' },
      { kind: 'equation', latex: '1{:}30\\ \\text{am} + 1\\ \\text{h} = 2{:}30\\ \\text{am}' },
    ],
  },

  m2q9: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A shift runs from 6:30 am to 3:00 pm with a 45-minute unpaid break. How many paid hours are worked?',
      },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: '6:30 am to 3:00 pm is 8.5 hours. Subtract the 0.75 h break:' },
      { kind: 'equation', latex: '8.5 - 0.75 = 7.75\\ \\text{hours}' },
    ],
  },

  m2q10: {
    blocks: [{ kind: 'paragraph', html: '3.4 hours is 3 hours and how many minutes?' }],
    solutionBlocks: [
      { kind: 'equation', latex: '0.4 \\times 60 = 24\\ \\text{minutes}' },
      { kind: 'paragraph', html: 'So 3.4 hours = 3 hours 24 minutes.' },
    ],
  },

  m2q11: {
    blocks: [
      { kind: 'paragraph', html: 'Sydney is UTC+10. When it is 09:00 in Sydney, what is the UTC time?' },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: 'Subtract 10 hours from 09:00:' },
      { kind: 'equation', latex: '09{:}00 - 10\\ \\text{h} = 23{:}00\\ \\text{(previous day)}' },
    ],
  },

  m2q12: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A film runs for 2 hours 47 minutes and starts at 18:40. Give the finishing time as a 4-digit number in 24-hour time.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '18{:}40 + 2\\ \\text{h} = 20{:}40' },
      { kind: 'equation', latex: '20{:}40 + 47\\ \\text{min} = 21{:}27' },
      { kind: 'paragraph', html: 'Written as 2127.' },
    ],
  },
}
