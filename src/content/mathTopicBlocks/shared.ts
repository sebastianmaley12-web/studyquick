/**
 * Shared network/graph definitions reused across multiple questions within
 * the same topic (e.g. several questions in MS-N2 refer to "the same
 * network" — one structured definition, not a diagram hand-built per
 * question). Topic files import from here rather than redefining a network
 * every question needs.
 */
import type { NetworkData } from '../../lib/content/mathBlocks'

export const N2_UNWEIGHTED_NETWORK: NetworkData = {
  vertices: ['A', 'B', 'C', 'D', 'E', 'F'].map((id) => ({ id })),
  edges: (
    [
      ['A', 'B'],
      ['A', 'C'],
      ['A', 'D'],
      ['B', 'C'],
      ['B', 'E'],
      ['C', 'D'],
      ['C', 'E'],
      ['D', 'E'],
      ['E', 'F'],
    ] as [string, string][]
  ).map(([from, to]) => ({ from, to })),
}

export const N2_WEIGHTED_NETWORK: NetworkData = {
  vertices: ['A', 'B', 'C', 'D', 'E'].map((id) => ({ id })),
  edges: [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'C', weight: 7 },
    { from: 'B', to: 'C', weight: 5 },
    { from: 'B', to: 'D', weight: 9 },
    { from: 'C', to: 'D', weight: 6 },
    { from: 'C', to: 'E', weight: 8 },
    { from: 'D', to: 'E', weight: 3 },
  ],
}

// Activity-on-node precedence network for the MS-N3 project: A(4,-),
// B(6,-), C(5,A), D(3,A), E(7,B&C), F(2,D), G(4,E&F).
export const N3_PROJECT_NETWORK: NetworkData = {
  vertices: [
    { id: 'Start', label: 'Start' },
    { id: 'A', label: 'A (4)' },
    { id: 'B', label: 'B (6)' },
    { id: 'C', label: 'C (5)' },
    { id: 'D', label: 'D (3)' },
    { id: 'E', label: 'E (7)' },
    { id: 'F', label: 'F (2)' },
    { id: 'G', label: 'G (4)' },
    { id: 'Finish', label: 'Finish' },
  ],
  edges: [
    { from: 'Start', to: 'A', directed: true },
    { from: 'Start', to: 'B', directed: true },
    { from: 'A', to: 'C', directed: true },
    { from: 'A', to: 'D', directed: true },
    { from: 'B', to: 'E', directed: true },
    { from: 'C', to: 'E', directed: true },
    { from: 'D', to: 'F', directed: true },
    { from: 'E', to: 'G', directed: true },
    { from: 'F', to: 'G', directed: true },
    { from: 'G', to: 'Finish', directed: true },
  ],
}
export const N3_CRITICAL_PATH_EDGES: [string, string][] = [
  ['Start', 'A'],
  ['A', 'C'],
  ['C', 'E'],
  ['E', 'G'],
  ['G', 'Finish'],
]

// Flow network for MS-N3's max-flow/min-cut sub-questions (n3q11/n3q12):
// S->A (12), S->B (8), A->B (5), A->T (7), B->T (9).
export const N3_FLOW_NETWORK: NetworkData = {
  vertices: [
    { id: 'S', label: 'S' },
    { id: 'A', label: 'A' },
    { id: 'B', label: 'B' },
    { id: 'T', label: 'T' },
  ],
  edges: [
    { from: 'S', to: 'A', weight: 12, directed: true },
    { from: 'S', to: 'B', weight: 8, directed: true },
    { from: 'A', to: 'B', weight: 5, directed: true },
    { from: 'A', to: 'T', weight: 7, directed: true },
    { from: 'B', to: 'T', weight: 9, directed: true },
  ],
}
