import { createSeededRandom, randomInt } from './seededRandom'

describe('seededRandom', () => {
  it('is deterministic for the same key', () => {
    const a = createSeededRandom('topic#q1')
    const b = createSeededRandom('topic#q1')
    const seqA = [a(), a(), a()]
    const seqB = [b(), b(), b()]
    expect(seqA).toEqual(seqB)
  })

  it('produces different sequences for different keys', () => {
    const a = createSeededRandom('topic#q1')
    const b = createSeededRandom('topic#q2')
    expect(a()).not.toBe(b())
  })

  it('randomInt stays within the requested inclusive bounds', () => {
    const random = createSeededRandom('bounds-check')
    for (let i = 0; i < 200; i++) {
      const n = randomInt(random, 5, 9)
      expect(n).toBeGreaterThanOrEqual(5)
      expect(n).toBeLessThanOrEqual(9)
      expect(Number.isInteger(n)).toBe(true)
    }
  })
})
