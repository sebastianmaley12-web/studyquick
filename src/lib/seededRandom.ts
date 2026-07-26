/** Deterministic PRNG seeded from a string key — mulberry32, seeded via a
 * simple string hash. Used so a given student/device always sees the same
 * randomised version of a variable-numbers question: stable across reloads
 * (no mismatch against a previously stored answer) without persisting a
 * seed anywhere, so the localStorage schema stays untouched. */
function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i)
    h |= 0
  }
  return h >>> 0
}

function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function createSeededRandom(seedKey: string): () => number {
  return mulberry32(hashString(seedKey))
}

/** A random integer in [min, max], inclusive. */
export function randomInt(random: () => number, min: number, max: number): number {
  return Math.floor(random() * (max - min + 1)) + min
}
