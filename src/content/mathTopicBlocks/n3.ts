/**
 * MS-N3 Critical Path Analysis — block entries, keyed by question id
 * (topic slug "n3"). n3q1/n3q2 approved in the Stage B prototype review,
 * preserved verbatim. n3q3-n3q13 reuse the same project network (all refer
 * back to "that project" from n3q1); n3q11/n3q12 switch to a separate flow
 * network for the max-flow/min-cut sub-questions.
 */
import type { MathBlockEntry } from '../../lib/content/mathBlocks'
import {
  N3_PROJECT_NETWORK,
  N3_CRITICAL_PATH_EDGES,
  N3_FLOW_NETWORK,
} from './shared'

export const N3_ENTRIES: Record<string, MathBlockEntry> = {
  n3q1: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A project has the activities shown below. Find the minimum completion time.',
      },
      {
        kind: 'table',
        data: {
          headers: ['Activity', 'Duration (days)', 'Immediate predecessor(s)'],
          rows: [
            ['A', '4', '&ndash;'],
            ['B', '6', '&ndash;'],
            ['C', '5', 'A'],
            ['D', '3', 'A'],
            ['E', '7', 'B and C'],
            ['F', '2', 'D'],
            ['G', '4', 'E and F'],
          ],
        },
      },
      { kind: 'network', data: N3_PROJECT_NETWORK },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'Forward scan: A finishes at 4, B at 6, C at 4 + 5 = 9, D at 4 + 3 = 7, E starts at max(6, 9) = 9 and finishes at 16, F finishes at 7 + 2 = 9, G starts at max(16, 9) = 16 and finishes at 20.',
      },
      { kind: 'network', data: { ...N3_PROJECT_NETWORK, highlightEdges: N3_CRITICAL_PATH_EDGES } },
      { kind: 'equation', latex: '\\text{Minimum completion time} = 20\\ \\text{days}' },
    ],
  },

  n3q2: {
    blocks: [
      { kind: 'paragraph', html: 'For the same project, which is the critical path?' },
      { kind: 'network', data: N3_PROJECT_NETWORK },
    ],
    solutionBlocks: [
      { kind: 'network', data: { ...N3_PROJECT_NETWORK, highlightEdges: N3_CRITICAL_PATH_EDGES } },
      {
        kind: 'paragraph',
        html: 'A &rarr; C &rarr; E &rarr; G takes 4 + 5 + 7 + 4 = 20 days, matching the minimum completion time. B &rarr; E &rarr; G is only 17 days, and A &rarr; D &rarr; F &rarr; G only 13.',
      },
    ],
  },

  n3q3: {
    blocks: [
      { kind: 'paragraph', html: 'For that project, find the float (slack) time of activity D.' },
      { kind: 'network', data: N3_PROJECT_NETWORK },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'D leads only to F, and F leads only to G. Working backwards from G&rsquo;s latest start (day 16): F must start by 16 &minus; 2 = 14, so D must finish by day 14. D&rsquo;s earliest finish (from the forward scan) is day 7.',
      },
      { kind: 'equation', latex: '\\text{Float} = 14 - 7 = 7\\ \\text{days}' },
    ],
  },

  n3q4: {
    blocks: [
      { kind: 'paragraph', html: 'For that project, find the earliest starting time of activity E.' },
      { kind: 'network', data: N3_PROJECT_NETWORK },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'E needs both of its predecessors, B and C, to be finished. B finishes at day 6 and C finishes at day 9 &mdash; E cannot start until the later of these.',
      },
      { kind: 'equation', latex: '\\text{Earliest start of E} = \\max(6, 9) = 9\\ \\text{days}' },
    ],
  },

  n3q5: {
    blocks: [
      { kind: 'paragraph', html: 'For that project, find the latest starting time of activity F.' },
      { kind: 'network', data: N3_PROJECT_NETWORK },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'G must start by day 16 at the latest (from the backward scan), and F takes 2 days, so F must start early enough to finish in time for G.',
      },
      { kind: 'equation', latex: '\\text{Latest start of F} = 16 - 2 = 14\\ \\text{days}' },
    ],
  },

  n3q6: {
    blocks: [
      { kind: 'paragraph', html: 'For that project, find the float time of activity B.' },
      { kind: 'network', data: N3_PROJECT_NETWORK },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'B leads only into E, which must start by day 9 at the latest. So B must finish by day 9. B&rsquo;s earliest finish is day 6.',
      },
      { kind: 'equation', latex: '\\text{Float} = 9 - 6 = 3\\ \\text{days}' },
    ],
  },

  n3q7: {
    blocks: [
      { kind: 'paragraph', html: 'How many activities lie on the critical path of that project?' },
      { kind: 'network', data: N3_PROJECT_NETWORK },
    ],
    solutionBlocks: [
      { kind: 'network', data: { ...N3_PROJECT_NETWORK, highlightEdges: N3_CRITICAL_PATH_EDGES } },
      {
        kind: 'paragraph',
        html: 'The critical path is A &rarr; C &rarr; E &rarr; G, which contains 4 activities (each with zero float).',
      },
    ],
  },

  n3q8: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'If activity C is delayed by 3 days, find the new minimum completion time for that project.',
      },
      { kind: 'network', data: { ...N3_PROJECT_NETWORK, highlightEdges: N3_CRITICAL_PATH_EDGES } },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'C lies on the critical path and has zero float, so any delay to C pushes the whole project out by the same amount.',
      },
      { kind: 'equation', latex: '20 + 3 = 23\\ \\text{days}' },
    ],
  },

  n3q9: {
    blocks: [
      { kind: 'paragraph', html: 'Find the total of all the activity durations in that project.' },
      { kind: 'network', data: N3_PROJECT_NETWORK },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '4 + 6 + 5 + 3 + 7 + 2 + 4 = 31\\ \\text{days}' },
      {
        kind: 'paragraph',
        html: 'This is far more than the 20-day completion time because several activities run in parallel rather than one after another.',
      },
    ],
  },

  n3q10: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Which activity in that project can be delayed the longest without delaying the whole project?',
      },
      { kind: 'network', data: N3_PROJECT_NETWORK },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'D has a float of 7 days, B has a float of 3 days, and C and E lie on the critical path with zero float. D can absorb the most delay.',
      },
    ],
  },

  n3q11: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A flow network has these capacities: S&rarr;A (12), S&rarr;B (8), A&rarr;B (5), A&rarr;T (7), B&rarr;T (9). Find the maximum flow from S to T.',
      },
      { kind: 'network', data: N3_FLOW_NETWORK },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The only edges into T are A&rarr;T (7) and B&rarr;T (9), so no more than 7 + 9 = 16 units can ever reach T &mdash; this is a cut of capacity 16.',
      },
      {
        kind: 'paragraph',
        html: 'This cut is achievable: send 7 along S&rarr;A&rarr;T, 8 along S&rarr;B&rarr;T, and the remaining 1 unit of S&rarr;A&rsquo;s capacity via S&rarr;A&rarr;B&rarr;T.',
      },
      { kind: 'equation', latex: '\\text{Maximum flow} = \\text{minimum cut} = 16' },
    ],
  },

  n3q12: {
    blocks: [
      { kind: 'paragraph', html: 'For that flow network, state the value of the minimum cut.' },
      { kind: 'network', data: N3_FLOW_NETWORK },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'By the maximum-flow minimum-cut theorem, the minimum cut always equals the maximum flow.',
      },
      { kind: 'equation', latex: '\\text{Minimum cut} = 16' },
    ],
  },

  n3q13: {
    blocks: [
      { kind: 'paragraph', html: 'What does a float time of zero indicate about an activity?' },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'Zero float means the earliest and latest start times coincide &mdash; the activity is critical, so any delay to it delays the whole project.',
      },
    ],
  },
}
