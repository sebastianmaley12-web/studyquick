/**
 * MS-N2 Network Concepts — block entries, keyed by question id from
 * src/content/maths/topics.json (topic slug "n2"). See mathBlocks.ts for the
 * schema and mathBlockEntries.ts (the index) for how these get consumed.
 * n2q1/n2q6/n2q7 done and approved in the Stage B prototype review —
 * preserved verbatim below. n2q2-q5, q8-q13 filled in for the full-topic
 * migration.
 */
import type { MathBlockEntry } from '../../lib/content/mathBlocks'
import { N2_UNWEIGHTED_NETWORK, N2_WEIGHTED_NETWORK } from './shared'

export const N2_ENTRIES: Record<string, MathBlockEntry> = {
  n2q1: {
    blocks: [
      { kind: 'paragraph', html: 'How many edges does the network below have?' },
      { kind: 'network', data: N2_UNWEIGHTED_NETWORK },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'Counting the edges shown in the diagram: AB, AC, AD, BC, BE, CD, CE, DE, EF — that is 9 edges.',
      },
    ],
  },

  n2q2: {
    blocks: [
      { kind: 'paragraph', html: 'For the network below, find the degree of vertex C.' },
      { kind: 'network', data: N2_UNWEIGHTED_NETWORK },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'Vertex C connects to A, B, D and E — four edges meet at C, so the degree of C is 4.',
      },
    ],
  },

  n2q3: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'For the same network, find the sum of the degrees of all vertices.',
      },
      { kind: 'network', data: N2_UNWEIGHTED_NETWORK },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The degree sum of a network is always twice the number of edges.',
      },
      { kind: 'equation', latex: '2 \\times 9 = 18' },
    ],
  },

  n2q4: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A connected network has exactly two vertices of odd degree. What can be said about it?',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'A connected network with exactly two odd-degree vertices has an Eulerian trail — a route that uses every edge exactly once, starting at one odd vertex and finishing at the other.',
      },
    ],
  },

  n2q5: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'In the network below, is it possible to trace a route that uses every edge exactly once? Explain.',
      },
      { kind: 'network', data: N2_UNWEIGHTED_NETWORK },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'Checking each vertex&rsquo;s degree: A = 3, B = 3, C = 4, D = 3, E = 4, F = 1. Four vertices (A, B, D and F) have odd degree — more than two, so no Eulerian trail exists.',
      },
    ],
  },

  n2q6: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'The weighted network below shows the possible connections between five sites. Find the weight of the minimum spanning tree.',
      },
      { kind: 'network', data: N2_WEIGHTED_NETWORK },
    ],
    steps: [
      { label: "Take the cheapest edge that doesn't form a cycle", latex: 'DE = 3' },
      { label: 'Next cheapest', latex: 'AB = 4' },
      { label: 'Next cheapest', latex: 'BC = 5' },
      { label: 'Connect the two remaining halves', latex: 'CD = 6' },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'Using Kruskal&rsquo;s algorithm, take the cheapest edges that never form a cycle — highlighted below:',
      },
      {
        kind: 'network',
        data: {
          ...N2_WEIGHTED_NETWORK,
          highlightEdges: [
            ['D', 'E'],
            ['A', 'B'],
            ['B', 'C'],
            ['C', 'D'],
          ],
        },
      },
      { kind: 'equation', latex: '3 + 4 + 5 + 6 = 18' },
    ],
  },

  n2q7: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'For the same weighted network, find the length of the shortest path from A to E.',
      },
      { kind: 'network', data: N2_WEIGHTED_NETWORK },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'Comparing the possible routes: A&ndash;C&ndash;E = 7 + 8 = 15; A&ndash;B&ndash;D&ndash;E = 4 + 9 + 3 = 16; A&ndash;C&ndash;D&ndash;E = 7 + 6 + 3 = 16; A&ndash;B&ndash;C&ndash;D&ndash;E = 4 + 5 + 6 + 3 = 18. The shortest route is highlighted below.',
      },
      {
        kind: 'network',
        data: {
          ...N2_WEIGHTED_NETWORK,
          highlightEdges: [
            ['A', 'C'],
            ['C', 'E'],
          ],
        },
      },
      { kind: 'equation', latex: '7 + 8 = 15' },
    ],
  },

  n2q8: {
    blocks: [{ kind: 'paragraph', html: 'A tree has 12 vertices. How many edges does it have?' }],
    solutionBlocks: [
      { kind: 'paragraph', html: 'A tree with n vertices always has n &minus; 1 edges.' },
      { kind: 'equation', latex: '12 - 1 = 11' },
    ],
  },

  n2q9: {
    blocks: [{ kind: 'paragraph', html: 'What is a Hamiltonian path?' }],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'A Hamiltonian path is a route through a network that visits every vertex exactly once (it does not need to use every edge, unlike an Eulerian trail).',
      },
    ],
  },

  n2q10: {
    blocks: [
      { kind: 'paragraph', html: 'How many edges does a complete graph with 6 vertices have?' },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'A complete graph on n vertices has n(n &minus; 1) &divide; 2 edges.',
      },
      { kind: 'equation', latex: '\\dfrac{6 \\times 5}{2} = 15' },
    ],
  },

  n2q11: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A network has 7 vertices, six of degree 4 and one of degree 6. How many edges does it have?',
      },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: 'The degree sum is twice the number of edges.' },
      { kind: 'equation', latex: '(6 \\times 4) + 6 = 30' },
      { kind: 'equation', latex: '30 \\div 2 = 15' },
    ],
  },

  n2q12: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'In a network representing towns and roads, what does the weight on an edge usually represent?',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The weight typically represents a real-world quantity associated with travelling that connection — commonly distance, travel time, or cost.',
      },
    ],
  },

  n2q13: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A minimum spanning tree of a connected network with n vertices always has:',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'A spanning tree connects all n vertices without any cycles, so — like any tree — it always has exactly n &minus; 1 edges.',
      },
    ],
  },
}
