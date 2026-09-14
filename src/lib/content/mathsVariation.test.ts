import { MATHS_VARIATION_ENTRIES } from './mathsVariation'
import { createSeededRandom } from '../seededRandom'

const SEEDS = Array.from({ length: 60 }, (_, i) => `seed-${i}`)

/** Pulls the numbers out of a rendered questionHtml string, in the order
 * they appear — used to independently re-derive the expected answer from
 * what the student actually sees, rather than trusting the generator's
 * own internal variables (which is what a plain unit test of the function
 * in isolation would do). HTML entities (e.g. "&frac12;" contains the
 * literal digits "12") and <sup>2</sup>/<sup>3</sup> unit exponents are
 * stripped first, since they're not semantic quantities and would
 * otherwise silently shift every later index; thousands separators from
 * `.toLocaleString('en-AU')` (e.g. "518,000") are stripped too, since a
 * bare digit regex would otherwise split that into two numbers. */
function numbersIn(html: string): number[] {
  const cleaned = html
    .replace(/&[a-zA-Z0-9]+;/g, ' ')
    .replace(/<su[pb]>[\s\S]*?<\/su[pb]>/g, ' ')
    .replace(/(?<=\d),(?=\d{3})/g, '')
  return (cleaned.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number)
}

describe('mathsVariation: every generated question is answerable and consistent', () => {
  for (const id of Object.keys(MATHS_VARIATION_ENTRIES)) {
    it(`${id}: never produces NaN/invalid/negative output, and is deterministic per seed`, () => {
      for (const seed of SEEDS) {
        const result = MATHS_VARIATION_ENTRIES[id].generate(createSeededRandom(seed))
        expect(Number.isFinite(result.answer)).toBe(true)
        // Every question in this bank is a physical/financial quantity or
        // a positive equation solution — none has a legitimately negative
        // answer. This is exactly the check that would have caught a real
        // bug found while authoring this bank: f4q11 and f1q10 could each
        // independently pick a monthly repayment/expenses total that
        // exceeded the loan/income, producing a nonsensical negative
        // "interest paid"/"surplus" (both fixed by deriving one value
        // from the other instead of picking both independently).
        expect(result.answer).toBeGreaterThanOrEqual(0)
        expect(result.tolerance).toBeGreaterThan(0)
        expect(result.questionHtml.length).toBeGreaterThan(0)
        expect(result.solutionHtml.length).toBeGreaterThan(0)

        // Same seed must reproduce the same question and answer — this is
        // what makes a "new attempt" show new numbers while a page
        // refresh mid-attempt doesn't silently change them underneath the
        // student.
        const again = MATHS_VARIATION_ENTRIES[id].generate(createSeededRandom(seed))
        expect(again.answer).toBe(result.answer)
        expect(again.questionHtml).toBe(result.questionHtml)
      }
    })
  }

  // Equation-solving entries are reverse-engineered from a target answer,
  // which is exactly where a transcription slip would produce a plausible-
  // looking but wrong "correct" answer — so these are checked by parsing
  // the actual rendered numbers back out and re-solving independently.
  it('a1q3: ax - c = bx + d actually holds for the given answer', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.a1q3.generate(createSeededRandom(seed))
      const [a, c, b, d] = numbersIn(r.questionHtml)
      expect(a * r.answer - c).toBe(b * r.answer + d)
    }
  })

  it('a1q4: v = u + at actually holds for the given answer', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.a1q4.generate(createSeededRandom(seed))
      const [v, u, t] = numbersIn(r.questionHtml)
      expect(u + r.answer * t).toBe(v)
    }
  })

  it('a1q5: (2x + n)/3 = k actually holds for the given answer', () => {
    // questionHtml is "Solve (2<em>x</em> + {n}) ÷ 3 = {k}." — the "2" and
    // "3" are the formula's own fixed coefficients, not dynamic values, so
    // n and k are the 2nd and 4th numbers in the rendered text, not the 1st/2nd.
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.a1q5.generate(createSeededRandom(seed))
      const nums = numbersIn(r.questionHtml)
      const [n, k] = [nums[1], nums[3]]
      expect((2 * r.answer + n) / 3).toBe(k)
    }
  })

  it('a1q8: S = 180(n - 2) matches the answer', () => {
    // "180" and the "2" in "(n − 2)" are the formula's fixed constants, so
    // n is the 3rd number rendered, not the 1st.
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.a1q8.generate(createSeededRandom(seed))
      const n = numbersIn(r.questionHtml)[2]
      expect(180 * (n - 2)).toBe(r.answer)
    }
  })

  it('a1q10: A = h(a + b)/2 actually holds for the given answer', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.a1q10.generate(createSeededRandom(seed))
      const [A, a, b] = numbersIn(r.questionHtml)
      expect((r.answer * (a + b)) / 2).toBe(A)
    }
  })

  it('a1q11: p(qx - r) = s actually holds for the given answer', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.a1q11.generate(createSeededRandom(seed))
      const [p, q, rConst, s] = numbersIn(r.questionHtml)
      expect(p * (q * r.answer - rConst)).toBe(s)
    }
  })

  it('f1q3: fortnightly pay × 26 reconstructs the stated annual salary', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f1q3.generate(createSeededRandom(seed))
      const [salary] = numbersIn(r.questionHtml)
      expect(r.answer * 26).toBe(salary)
    }
  })

  it('f1q6: Medicare levy is exactly 2% of the stated income', () => {
    // The fixed "2%" renders before the income figure, so income is the
    // 2nd number, not the 1st.
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f1q6.generate(createSeededRandom(seed))
      const income = numbersIn(r.questionHtml)[1]
      expect(r.answer).toBeCloseTo(income * 0.02, 6)
    }
  })

  it('f1q7: GST × 11 reconstructs the stated GST-inclusive price', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f1q7.generate(createSeededRandom(seed))
      const [price] = numbersIn(r.questionHtml)
      expect(r.answer * 11).toBe(price)
    }
  })

  it('f1q8: sale price matches marked price minus the stated discount %', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f1q8.generate(createSeededRandom(seed))
      const [marked, pct] = numbersIn(r.questionHtml)
      expect(r.answer).toBeCloseTo(marked - (marked * pct) / 100, 6)
    }
  })

  it('f1q1: gross pay reconstructs from the stated rate and hours', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f1q1.generate(createSeededRandom(seed))
      const [rate, normalHours, otHalf, otDouble] = numbersIn(r.questionHtml)
      const expected = normalHours * rate + otHalf * 1.5 * rate + otDouble * 2 * rate
      expect(r.answer).toBeCloseTo(expected, 2)
    }
  })

  it('f1q11: the answer is the lower of the two computed unit prices', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f1q11.generate(createSeededRandom(seed))
      const [volA, priceA, volB, priceB] = numbersIn(r.questionHtml)
      const unitA = Math.round((priceA / volA) * 100) / 100
      const unitB = Math.round((priceB / volB) * 100) / 100
      expect(r.answer).toBe(Math.min(unitA, unitB))
    }
  })

  // ---- MS-F4 / MS-F5: independent recomputation from the rendered text ----

  it('f4q1: simple interest matches independently recomputed I = Prn', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f4q1.generate(createSeededRandom(seed))
      const [p, ratePct, years] = numbersIn(r.questionHtml)
      expect(r.answer).toBeCloseTo(p * (ratePct / 100) * years, 2)
    }
  })

  it('f4q2: compound interest (annual) matches independent recomputation', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f4q2.generate(createSeededRandom(seed))
      const [pv, ratePct, years] = numbersIn(r.questionHtml)
      expect(r.answer).toBeCloseTo(pv * (1 + ratePct / 100) ** years, 2)
    }
  })

  it('f4q3: compound interest (monthly) matches independent recomputation', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f4q3.generate(createSeededRandom(seed))
      const [pv, annualPct, years] = numbersIn(r.questionHtml)
      const monthlyRate = annualPct / 100 / 12
      expect(r.answer).toBeCloseTo(pv * (1 + monthlyRate) ** (12 * years), 2)
    }
  })

  it('f4q5: straight-line depreciation matches the stated inputs', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f4q5.generate(createSeededRandom(seed))
      const [value0, depreciation, years] = numbersIn(r.questionHtml)
      expect(r.answer).toBe(value0 - depreciation * years)
    }
  })

  it('f4q6: declining-balance depreciation matches independent recomputation', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f4q6.generate(createSeededRandom(seed))
      const [value0, ratePct, years] = numbersIn(r.questionHtml)
      expect(r.answer).toBeCloseTo(value0 * (1 - ratePct / 100) ** years, 2)
    }
  })

  it('f4q7: inflation-adjusted cost matches independent recomputation', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f4q7.generate(createSeededRandom(seed))
      const [price, ratePct, years] = numbersIn(r.questionHtml)
      expect(r.answer).toBeCloseTo(price * (1 + ratePct / 100) ** years, 2)
    }
  })

  it('f4q8: dividend = shares × cents/share', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f4q8.generate(createSeededRandom(seed))
      const [shares, cents] = numbersIn(r.questionHtml)
      expect(r.answer).toBeCloseTo((shares * cents) / 100, 6)
    }
  })

  it('f4q9: dividend yield stays in a realistic band and matches the formula', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f4q9.generate(createSeededRandom(seed))
      const [price, cents] = numbersIn(r.questionHtml)
      expect(r.answer).toBeCloseTo(((cents / 100 / price) * 100), 2)
      // A real ASX-style yield is never absurd — this is what would have
      // caught the original too-wide range that could produce ~30%.
      expect(r.answer).toBeLessThan(10)
    }
  })

  it('f4q10: daily simple interest matches independent recomputation', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f4q10.generate(createSeededRandom(seed))
      const [ratePct, balance, days] = numbersIn(r.questionHtml)
      expect(r.answer).toBeCloseTo((balance * (ratePct / 100) * days) / 365, 2)
    }
  })

  it('f4q11: total interest is always positive (repayments always clear the loan)', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f4q11.generate(createSeededRandom(seed))
      const [principal, monthly, years] = numbersIn(r.questionHtml)
      const expected = monthly * 12 * years - principal
      expect(r.answer).toBe(expected)
      expect(r.answer).toBeGreaterThan(0)
    }
  })

  it('f4q13: appreciation matches independent recomputation', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f4q13.generate(createSeededRandom(seed))
      const [value0, ratePct, years] = numbersIn(r.questionHtml)
      expect(r.answer).toBeCloseTo(value0 * (1 + ratePct / 100) ** years, 2)
    }
  })

  it('f5q1: annuity future value (annual) matches independent recomputation', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f5q1.generate(createSeededRandom(seed))
      const [contribution, years, ratePct] = numbersIn(r.questionHtml)
      const rate = ratePct / 100
      expect(r.answer).toBeCloseTo(contribution * (((1 + rate) ** years - 1) / rate), 2)
    }
  })

  it('f5q2: annuity future value (monthly) matches independent recomputation', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f5q2.generate(createSeededRandom(seed))
      const [contribution, years, annualPct] = numbersIn(r.questionHtml)
      const r_ = annualPct / 100 / 12
      const n = 12 * years
      expect(r.answer).toBeCloseTo(contribution * (((1 + r_) ** n - 1) / r_), 2)
    }
  })

  it('f5q4: annuity present value matches independent recomputation', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f5q4.generate(createSeededRandom(seed))
      const [months, repayment, monthlyRatePct] = numbersIn(r.questionHtml)
      const rate = monthlyRatePct / 100
      const growth = (1 + rate) ** months
      expect(r.answer).toBe(Math.round((repayment * (growth - 1)) / (rate * growth)))
    }
  })

  it('f5q5: superannuation future value matches independent recomputation', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f5q5.generate(createSeededRandom(seed))
      const [contribution, ratePct, years] = numbersIn(r.questionHtml)
      const rate = ratePct / 100
      expect(r.answer).toBe(Math.round(contribution * (((1 + rate) ** years - 1) / rate)))
    }
  })

  it('f5q6: recursive annuity A3 matches independent recomputation', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f5q6.generate(createSeededRandom(seed))
      const [mult, contribution] = numbersIn(r.questionHtml)
      const a1 = contribution
      const a2 = Math.round((a1 * mult + contribution) * 100) / 100
      const a3 = Math.round((a2 * mult + contribution) * 100) / 100
      expect(r.answer).toBe(a3)
    }
  })

  it('f5q7: monthly interest matches independent recomputation', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f5q7.generate(createSeededRandom(seed))
      const [balance, monthlyRatePct] = numbersIn(r.questionHtml)
      expect(r.answer).toBeCloseTo(balance * (monthlyRatePct / 100), 6)
    }
  })

  it('f5q10: repayment-per-$1000 lookup matches independent recomputation', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f5q10.generate(createSeededRandom(seed))
      const [perThousand, fixed1000, loan] = numbersIn(r.questionHtml)
      expect(fixed1000).toBe(1000)
      expect(r.answer).toBeCloseTo(perThousand * (loan / 1000), 6)
    }
  })

  it('f5q12: quarterly periods = 4 × years', () => {
    for (const seed of SEEDS) {
      const r = MATHS_VARIATION_ENTRIES.f5q12.generate(createSeededRandom(seed))
      const [years] = numbersIn(r.questionHtml)
      expect(r.answer).toBe(4 * years)
    }
  })
})
