import { randomInt } from '../seededRandom'

/**
 * Additive numeric-variation layer for existing Maths questions (matched
 * by id against topics.json) — NOT a rewrite of the maths database. Each
 * entry regenerates the question's numbers from a seeded random source
 * (see seededRandom.ts) and recomputes the real answer with plain
 * arithmetic — no AI, so no risk of an incorrect "correct" answer. Any
 * question with no entry here renders exactly as before, from the static
 * topics.json values.
 *
 * Coverage is every `num`-type question in MS-A1 (Formulae and Equations),
 * MS-F1 (Money Matters), MS-F4 (Investments and Loans) and MS-F5
 * (Annuities) — the topics flagged in the product-quality audit as the
 * most noticeable places where retrying a topic showed identical numbers
 * every time, with a few individual questions deliberately left out (see
 * the "not varied" notes on f4q4 and f5q3/f5q8/f5q9 below) where the
 * original question explicitly depends on the exact numbers from the one
 * before it — varying either side independently would make them describe
 * two different scenarios. Other topics still render statically; expanding
 * coverage further is a follow-up pass, not promised as complete here.
 *
 * Deliberately scoped to MathsQuestion.tsx only (not the KaTeX workspace) —
 * kept as a separate, orthogonal enhancement so the two new systems don't
 * compound into one component.
 */

export interface MathsVariationResult {
  questionHtml: string
  answer: number
  tolerance: number
  solutionHtml: string
}

export interface MathsVariationEntry {
  generate: (random: () => number) => MathsVariationResult
}

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

export const MATHS_VARIATION_ENTRIES: Record<string, MathsVariationEntry> = {
  // ---- MS-A1: Formulae and Equations ----

  // Circle area: A = πr². r generated to 1 decimal place, same style as the
  // original (r = 6.4); the answer is never "clean" here since it depends
  // on π, matching how the original question already worked.
  a1q1: {
    generate: (random) => {
      const r = randomInt(random, 30, 90) / 10
      const answer = round(Math.PI * r * r, 2)
      return {
        questionHtml: `The area of a circle is <em>A</em> = &pi;<em>r</em><sup>2</sup>. Find the area of a circular garden bed of radius ${r} m, correct to 2 decimal places.`,
        answer,
        tolerance: Math.max(answer * 0.002, 0.02),
        solutionHtml: `A = &pi; &times; ${r}<sup>2</sup> = &pi; &times; ${round(r * r, 4)} = ${answer} m<sup>2</sup>`,
      }
    },
  },

  // Linear equation ax − c = bx + d, solved for x. b and the gap between a
  // and b are generated first, then c and d are derived from a target x so
  // the result is always a clean integer, same as the original 5x − 7 = 3x + 11.
  a1q3: {
    generate: (random) => {
      const b = randomInt(random, 2, 6)
      const diff = randomInt(random, 2, 5)
      const a = b + diff
      const x = randomInt(random, 4, 15)
      const c = randomInt(random, 1, diff * x - 1)
      const d = diff * x - c
      return {
        questionHtml: `Solve ${a}<em>x</em> &minus; ${c} = ${b}<em>x</em> + ${d}.`,
        answer: x,
        tolerance: 0.001,
        solutionHtml: `${a}x &minus; ${b}x = ${d} + ${c}, so ${diff}x = ${diff * x} and x = ${x}`,
      }
    },
  },

  // v = u + at, solved for a. t, a and u are generated first and v derived
  // forward, so a (the answer) is exact by construction.
  a1q4: {
    generate: (random) => {
      const t = randomInt(random, 2, 9)
      const a = randomInt(random, 2, 9)
      const u = randomInt(random, 5, 40)
      const v = u + a * t
      return {
        questionHtml: `Using <em>v</em> = <em>u</em> + <em>at</em>, find <em>a</em> when <em>v</em> = ${v}, <em>u</em> = ${u} and <em>t</em> = ${t}.`,
        answer: a,
        tolerance: 0.001,
        solutionHtml: `${v} = ${u} + ${t}a, so ${t}a = ${v - u} and a = ${a}`,
      }
    },
  },

  // (2x + n)/3 = k, solved for x. The coefficient (2) and divisor (3) stay
  // fixed to match the original's structure; n is derived from x so the
  // division is always exact, then k follows.
  a1q5: {
    generate: (random) => {
      const x = randomInt(random, 3, 12)
      const remainder = (2 * x) % 3
      let n = (3 - remainder) % 3
      if (n === 0) n = 3
      const k = (2 * x + n) / 3
      return {
        questionHtml: `Solve (2<em>x</em> + ${n}) &divide; 3 = ${k}.`,
        answer: x,
        tolerance: 0.001,
        solutionHtml: `Multiply both sides by 3: 2x + ${n} = ${3 * k}, so 2x = ${3 * k - n} and x = ${x}`,
      }
    },
  },

  // BMI = m ÷ h². Mass and height (in cm, converted to m) generated
  // independently — this one, like the original, isn't forced to a clean
  // result, since real BMI values aren't clean either.
  a1q6: {
    generate: (random) => {
      const mass = randomInt(random, 50, 100)
      const heightCm = randomInt(random, 150, 195)
      const height = heightCm / 100
      const answer = round(mass / (height * height), 1)
      return {
        questionHtml: `Body mass index is BMI = <em>m</em> &divide; <em>h</em><sup>2</sup>, with mass in kg and height in metres. Find the BMI of a person of mass ${mass} kg and height ${height} m, correct to 1 decimal place.`,
        answer,
        tolerance: Math.max(answer * 0.002, 0.05),
        solutionHtml: `BMI = ${mass} &divide; ${height}<sup>2</sup> = ${mass} &divide; ${round(height * height, 4)} = ${answer}`,
      }
    },
  },

  // MHR = 208 − 0.7 × age. Whole-year ages keep the result to exactly one
  // decimal place, same as the original.
  a1q7: {
    generate: (random) => {
      const age = randomInt(random, 10, 80)
      const answer = round(208 - 0.7 * age, 1)
      return {
        questionHtml: `A formula for maximum heart rate is MHR = 208 &minus; 0.7 &times; age (in beats per minute). Find the MHR of a ${age}-year-old.`,
        answer,
        tolerance: 0.1,
        solutionHtml: `MHR = 208 &minus; 0.7 &times; ${age} = 208 &minus; ${round(0.7 * age, 1)} = ${answer} bpm`,
      }
    },
  },

  // S = 180(n − 2). Always an exact whole number for any whole n.
  a1q8: {
    generate: (random) => {
      const n = randomInt(random, 5, 12)
      const answer = 180 * (n - 2)
      const polygonNames: Record<number, string> = {
        5: 'pentagon',
        6: 'hexagon',
        7: 'heptagon',
        8: 'octagon',
        9: 'nonagon',
        10: 'decagon',
        11: 'hendecagon',
        12: 'dodecagon',
      }
      return {
        questionHtml: `The sum of the interior angles of a polygon is <em>S</em> = 180(<em>n</em> &minus; 2) degrees. Find the sum for a ${polygonNames[n]} (<em>n</em> = ${n}).`,
        answer,
        tolerance: 0.001,
        solutionHtml: `S = 180 &times; (${n} &minus; 2) = 180 &times; ${n - 2} = ${answer}&deg;`,
      }
    },
  },

  // Trapezium area A = ½h(a + b), solved for h. h is generated as an even
  // integer so A is always a whole number, then a and b are chosen
  // independently — same forward-construction approach as a1q9.
  a1q10: {
    generate: (random) => {
      const h = randomInt(random, 2, 10) * 2
      const a = randomInt(random, 5, 15)
      const b = randomInt(random, a + 3, a + 15)
      const area = (h * (a + b)) / 2
      return {
        questionHtml: `The area of a trapezium is <em>A</em> = &frac12;<em>h</em>(<em>a</em> + <em>b</em>). Find <em>h</em> when <em>A</em> = ${area} m<sup>2</sup>, <em>a</em> = ${a} m and <em>b</em> = ${b} m.`,
        answer: h,
        tolerance: 0.001,
        solutionHtml: `${area} = &frac12; &times; h &times; (${a} + ${b}) = ${(a + b) / 2}h, so h = ${h} m`,
      }
    },
  },

  // p(qx − r) = s, solved for x. q, x and r are generated first (with r
  // kept smaller than qx so the inner bracket stays positive), then s is
  // derived forward so it's always exactly divisible by p.
  a1q11: {
    generate: (random) => {
      const q = randomInt(random, 2, 5)
      const x = randomInt(random, 3, 12)
      const r = randomInt(random, 1, q * x - 1)
      const p = randomInt(random, 2, 6)
      const inner = q * x - r
      const s = p * inner
      return {
        questionHtml: `Solve ${p}(${q}<em>x</em> &minus; ${r}) = ${s}.`,
        answer: x,
        tolerance: 0.001,
        solutionHtml: `${q * p}x &minus; ${p * r} = ${s}, so ${q * p}x = ${s + p * r} and x = ${x}`,
      }
    },
  },

  // Pendulum period T = 2π√(L ÷ g). g stays fixed at Earth gravity (9.8),
  // matching the original; L varies to 2 decimal places.
  a1q12: {
    generate: (random) => {
      const L = randomInt(random, 50, 300) / 100
      const g = 9.8
      const answer = round(2 * Math.PI * Math.sqrt(L / g), 2)
      return {
        questionHtml: `The period of a pendulum is <em>T</em> = 2&pi;&radic;(<em>L</em>&divide;<em>g</em>) seconds. Find <em>T</em> for <em>L</em> = ${L} m and <em>g</em> = 9.8 m/s<sup>2</sup>, correct to 2 decimal places.`,
        answer,
        tolerance: Math.max(answer * 0.002, 0.02),
        solutionHtml: `T = 2&pi;&radic;(${L} &divide; 9.8) = 2&pi; &times; &radic;${round(L / g, 5)} = 2&pi; &times; ${round(Math.sqrt(L / g), 5)} = ${answer} s`,
      }
    },
  },

  // ---- MS-F1: Money Matters ----

  // Gross pay with overtime. Hourly rate kept to 20c steps so that ×1.5 and
  // ×2 overtime multipliers never produce more than 2 decimal places.
  f1q1: {
    generate: (random) => {
      const rate = round(randomInt(random, 100, 175) * 0.2, 2)
      const normalHours = 38
      const otHalf = randomInt(random, 2, 6)
      const otDouble = randomInt(random, 1, 5)
      const normalPay = round(normalHours * rate, 2)
      const halfPay = round(otHalf * 1.5 * rate, 2)
      const doublePay = round(otDouble * 2 * rate, 2)
      const answer = round(normalPay + halfPay + doublePay, 2)
      return {
        questionHtml: `Mia earns $${rate.toFixed(2)} per hour. In one week she works ${normalHours} normal hours, ${otHalf} hours at time-and-a-half and ${otDouble} hours at double time. Find her gross weekly pay.`,
        answer,
        tolerance: 0.05,
        solutionHtml: `Normal: ${normalHours} &times; $${rate.toFixed(2)} = $${normalPay.toFixed(2)}. Time-and-a-half: ${otHalf} &times; 1.5 &times; $${rate.toFixed(2)} = $${halfPay.toFixed(2)}. Double time: ${otDouble} &times; 2 &times; $${rate.toFixed(2)} = $${doublePay.toFixed(2)}. Total = $${answer.toFixed(2)}`,
      }
    },
  },

  // Commission: sales × rate%.
  f1q2: {
    generate: (random) => {
      const ratePct = round(randomInt(random, 20, 60) / 10, 1)
      const sales = randomInt(random, 100, 900) * 1000
      const answer = round((sales * ratePct) / 100, 2)
      return {
        questionHtml: `A salesperson is paid ${ratePct}% commission. Find the commission on sales of $${sales.toLocaleString('en-AU')}.`,
        answer,
        tolerance: Math.max(answer * 0.002, 0.05),
        solutionHtml: `Commission = ${ratePct}% &times; $${sales.toLocaleString('en-AU')} = ${ratePct / 100} &times; ${sales} = $${answer.toFixed(2)}`,
      }
    },
  },

  // Annual salary ÷ 26 fortnights. Salary generated as a multiple of 26 so
  // the fortnightly figure is always a whole number of dollars.
  f1q3: {
    generate: (random) => {
      const perFortnight = randomInt(random, 1500, 4500)
      const salary = perFortnight * 26
      return {
        questionHtml: `An annual salary of $${salary.toLocaleString('en-AU')} is paid fortnightly. Find the gross fortnightly pay.`,
        answer: perFortnight,
        tolerance: 0.05,
        solutionHtml: `There are 26 fortnights in a year: $${salary.toLocaleString('en-AU')} &divide; 26 = $${perFortnight.toFixed(2)}`,
      }
    },
  },

  // Net pay: gross minus two deductions — plain subtraction, exact to the
  // cent for any 2-decimal inputs.
  f1q4: {
    generate: (random) => {
      const gross = randomInt(random, 800, 1800)
      const tax = round(randomInt(random, 1500, 4000) / 10, 2)
      const union = round(randomInt(random, 80, 220) / 10, 2)
      const answer = round(gross - tax - union, 2)
      return {
        questionHtml: `Gross weekly pay is $${gross.toFixed(2)}. Deductions are $${tax.toFixed(2)} tax and $${union.toFixed(2)} union fees. Find the net pay.`,
        answer,
        tolerance: 0.05,
        solutionHtml: `Net = $${gross.toFixed(2)} &minus; $${tax.toFixed(2)} &minus; $${union.toFixed(2)} = $${answer.toFixed(2)}`,
      }
    },
  },

  // Tax bracket lookup — the bracket's own base amount and rate stay fixed
  // (that's the syllabus fact being tested), only the taxable income within
  // the bracket's range varies.
  f1q5: {
    generate: (random) => {
      const income = randomInt(random, 46, 119) * 1000
      const excess = income - 45000
      const answer = round(5092 + 0.325 * excess, 2)
      return {
        questionHtml: `A tax table states: for taxable income $45&thinsp;001&ndash;$120&thinsp;000, tax = $5092 plus 32.5c for each $1 over $45&thinsp;000. Find the tax payable on a taxable income of $${income.toLocaleString('en-AU')}.`,
        answer,
        tolerance: Math.max(answer * 0.002, 0.05),
        solutionHtml: `Excess = $${income.toLocaleString('en-AU')} &minus; $45&thinsp;000 = $${excess.toLocaleString('en-AU')}. Tax = $5092 + 0.325 &times; ${excess} = $5092 + $${round(0.325 * excess, 2).toFixed(2)} = $${answer.toFixed(2)}`,
      }
    },
  },

  // Medicare levy: 2% of taxable income. Income generated as a multiple of
  // 50 so 2% is always a whole number of dollars.
  f1q6: {
    generate: (random) => {
      const income = randomInt(random, 300, 1600) * 50
      const answer = income * 0.02
      return {
        questionHtml: `The Medicare levy is 2% of taxable income. Find the levy on a taxable income of $${income.toLocaleString('en-AU')}.`,
        answer,
        tolerance: 0.05,
        solutionHtml: `Levy = 0.02 &times; $${income.toLocaleString('en-AU')} = $${answer.toFixed(2)}`,
      }
    },
  },

  // GST reverse-calculation. GST generated first as a whole dollar amount,
  // then the GST-inclusive price is derived (price = GST × 11) so dividing
  // by 11 always gives back the exact original GST.
  f1q7: {
    generate: (random) => {
      const gst = randomInt(random, 20, 150)
      const price = gst * 11
      return {
        questionHtml: `A television costs $${price} including 10% GST. Find the amount of GST included in the price.`,
        answer: gst,
        tolerance: 0.05,
        solutionHtml: `The price is 110% of the pre-GST price, so GST = price &divide; 11 = ${price} &divide; 11 = $${gst.toFixed(2)}`,
      }
    },
  },

  // Percentage discount. Marked price a multiple of $100 and the discount a
  // multiple of 5% guarantees a whole-dollar discount amount and sale price.
  f1q8: {
    generate: (random) => {
      const marked = randomInt(random, 5, 30) * 100
      const discountPct = randomInt(random, 2, 8) * 5
      const discountAmount = (marked * discountPct) / 100
      const answer = marked - discountAmount
      const remainingPct = 100 - discountPct
      return {
        questionHtml: `A lounge marked $${marked} is discounted by ${discountPct}%. Find the sale price.`,
        answer,
        tolerance: 0.05,
        solutionHtml: `Sale price = ${remainingPct}% of $${marked} = ${remainingPct / 100} &times; ${marked} = $${answer.toFixed(2)}`,
      }
    },
  },

  // Simple interest: I = Prn. Months generated as a multiple of 6 so years
  // (months ÷ 12) is always a clean multiple of 0.5.
  f1q9: {
    generate: (random) => {
      const principal = randomInt(random, 10, 80) * 100
      const ratePct = round(randomInt(random, 20, 90) / 10, 1)
      const months = randomInt(random, 1, 8) * 6
      const years = months / 12
      const answer = round(principal * (ratePct / 100) * years, 2)
      return {
        questionHtml: `Find the simple interest on $${principal.toLocaleString('en-AU')} invested at ${ratePct}% p.a. for ${months} months.`,
        answer,
        tolerance: Math.max(answer * 0.003, 0.05),
        solutionHtml: `${months} months = ${years} years. I = Prn = ${principal} &times; ${ratePct / 100} &times; ${years} = $${answer.toFixed(2)}`,
      }
    },
  },

  // Weekly budget surplus — plain subtraction of whole-dollar expenses from
  // whole-dollar income, exact by construction.
  f1q10: {
    generate: (random) => {
      const rent = randomInt(random, 250, 550)
      const food = randomInt(random, 100, 250)
      const transport = randomInt(random, 40, 130)
      const savings = randomInt(random, 100, 300)
      const other = randomInt(random, 60, 180)
      const totalExpenses = rent + food + transport + savings + other
      // Income is derived from total expenses plus a guaranteed positive
      // surplus, rather than picked independently — picking both
      // separately could otherwise let expenses exceed income and produce
      // a negative "surplus", which isn't a coherent budget scenario.
      const income = totalExpenses + randomInt(random, 50, 350)
      const answer = income - totalExpenses
      return {
        questionHtml: `Weekly income is $${income}. Weekly expenses are rent $${rent}, food $${food}, transport $${transport}, savings $${savings} and other $${other}. Find the weekly surplus.`,
        answer,
        tolerance: 0.05,
        solutionHtml: `Total expenses = $${totalExpenses.toFixed(2)}. Surplus = $${income} &minus; $${totalExpenses.toFixed(2)} = $${answer.toFixed(2)}`,
      }
    },
  },

  // "Better buy" unit price comparison. Two independently generated
  // (volume, price) options; the answer is whichever has the lower
  // per-litre price, rounded to the nearest cent like the original.
  f1q11: {
    generate: (random) => {
      const volA = round(randomInt(random, 10, 20) / 10, 2)
      const priceA = round(randomInt(random, 250, 450) / 100, 2)
      const volB = round(randomInt(random, 15, 30) / 10, 2)
      const priceB = round(randomInt(random, 400, 650) / 100, 2)
      const unitA = round(priceA / volA, 2)
      const unitB = round(priceB / volB, 2)
      const better = unitA <= unitB ? { vol: volA, price: priceA, unit: unitA } : { vol: volB, price: priceB, unit: unitB }
      return {
        questionHtml: `Juice is sold as ${volA} L for $${priceA.toFixed(2)} or ${volB} L for $${priceB.toFixed(2)}. Find the unit price (per litre) of the better buy, correct to the nearest cent.`,
        answer: better.unit,
        tolerance: 0.02,
        solutionHtml: `${volA} L: $${priceA.toFixed(2)} &divide; ${volA} = $${unitA.toFixed(2)}/L. ${volB} L: $${priceB.toFixed(2)} &divide; ${volB} = $${unitB.toFixed(2)}/L. The ${better.vol} L bottle is the better buy at $${better.unit.toFixed(2)} per litre`,
      }
    },
  },

  // Piecework: units × rate per unit — a single multiplication.
  f1q12: {
    generate: (random) => {
      const rate = round(randomInt(random, 100, 300) / 100, 2)
      const units = randomInt(random, 50, 300)
      const answer = round(units * rate, 2)
      return {
        questionHtml: `A pieceworker is paid $${rate.toFixed(2)} for each unit assembled. Find the pay for ${units} units.`,
        answer,
        tolerance: 0.05,
        solutionHtml: `Pay = ${units} &times; $${rate.toFixed(2)} = $${answer.toFixed(2)}`,
      }
    },
  },

  // ---- MS-F4: Investments and Loans ----
  // (f4q4 is deliberately not varied — its question text says "for the
  // investment in the previous question", referring to f4q3's exact
  // numbers rather than restating them; varying f4q3 independently would
  // make f4q4 describe a scenario that no longer matches.)

  // Simple interest.
  f4q1: {
    generate: (random) => {
      const principal = randomInt(random, 20, 150) * 100
      const ratePct = round(randomInt(random, 20, 90) / 10, 1)
      const years = randomInt(random, 2, 8)
      const answer = round(principal * (ratePct / 100) * years, 2)
      return {
        questionHtml: `Find the simple interest earned on $${principal.toLocaleString('en-AU')} invested at ${ratePct}% p.a. for ${years} years.`,
        answer,
        tolerance: Math.max(answer * 0.003, 0.05),
        solutionHtml: `I = Prn = ${principal} &times; ${ratePct / 100} &times; ${years} = $${answer.toFixed(2)}`,
      }
    },
  },

  // Compound interest, annual.
  f4q2: {
    generate: (random) => {
      const principal = randomInt(random, 40, 300) * 500
      const ratePct = round(randomInt(random, 20, 80) / 10, 1)
      const years = randomInt(random, 3, 10)
      const rate = ratePct / 100
      const answer = round(principal * (1 + rate) ** years, 2)
      return {
        questionHtml: `Find the future value of $${principal.toLocaleString('en-AU')} invested at ${ratePct}% p.a. compounded annually for ${years} years.`,
        answer,
        tolerance: Math.max(answer * 0.003, 0.1),
        solutionHtml: `FV = PV(1 + r)<sup>n</sup> = ${principal.toLocaleString('en-AU')} &times; ${1 + rate}<sup>${years}</sup> = $${answer.toFixed(2)}`,
      }
    },
  },

  // Compound interest, monthly.
  f4q3: {
    generate: (random) => {
      const principal = randomInt(random, 30, 200) * 250
      const annualPct = round(randomInt(random, 30, 90) / 10, 1)
      const years = randomInt(random, 2, 6)
      const r = annualPct / 100 / 12
      const n = 12 * years
      const answer = round(principal * (1 + r) ** n, 2)
      return {
        questionHtml: `Find the future value of $${principal.toLocaleString('en-AU')} invested at ${annualPct}% p.a. compounded monthly for ${years} years.`,
        answer,
        tolerance: Math.max(answer * 0.003, 0.1),
        solutionHtml: `r = ${annualPct / 100} &divide; 12 = ${round(r, 6)} per month and n = ${n}. FV = ${principal.toLocaleString('en-AU')} &times; ${round(1 + r, 6)}<sup>${n}</sup> = $${answer.toFixed(2)}`,
      }
    },
  },

  // Straight-line depreciation. D and n generated first so the value
  // never goes negative, then V0 is derived to leave a clean remainder.
  f4q5: {
    generate: (random) => {
      const years = randomInt(random, 3, 8)
      const depreciation = randomInt(random, 20, 80) * 100
      const remainder = randomInt(random, 50, 300) * 100
      const value0 = depreciation * years + remainder
      const answer = value0 - depreciation * years
      return {
        questionHtml: `A machine bought for $${value0.toLocaleString('en-AU')} depreciates by $${depreciation.toLocaleString('en-AU')} each year (straight-line). Find its value after ${years} years.`,
        answer,
        tolerance: 0.05,
        solutionHtml: `S = V&#8320; &minus; Dn = ${value0.toLocaleString('en-AU')} &minus; ${depreciation.toLocaleString('en-AU')} &times; ${years} = $${answer.toLocaleString('en-AU')}.00`,
      }
    },
  },

  // Declining-balance depreciation.
  f4q6: {
    generate: (random) => {
      const value0 = randomInt(random, 100, 600) * 100
      const ratePct = randomInt(random, 10, 25)
      const years = randomInt(random, 3, 6)
      const rate = ratePct / 100
      const answer = round(value0 * (1 - rate) ** years, 2)
      return {
        questionHtml: `A machine bought for $${value0.toLocaleString('en-AU')} depreciates by ${ratePct}% p.a. using the declining-balance method. Find its value after ${years} years.`,
        answer,
        tolerance: Math.max(answer * 0.003, 0.1),
        solutionHtml: `S = V&#8320;(1 &minus; r)<sup>n</sup> = ${value0.toLocaleString('en-AU')} &times; ${round(1 - rate, 4)}<sup>${years}</sup> = $${answer.toFixed(2)}`,
      }
    },
  },

  // Inflation-adjusted future cost.
  f4q7: {
    generate: (random) => {
      const price = randomInt(random, 2000, 25000) / 100
      const ratePct = round(randomInt(random, 15, 60) / 10, 1)
      const years = randomInt(random, 3, 8)
      const rate = ratePct / 100
      const answer = round(price * (1 + rate) ** years, 2)
      return {
        questionHtml: `An item costs $${price.toFixed(2)} today. With inflation at ${ratePct}% p.a., find its expected cost in ${years} years.`,
        answer,
        tolerance: Math.max(answer * 0.003, 0.05),
        solutionHtml: `Cost = ${price.toFixed(2)} &times; ${1 + rate}<sup>${years}</sup> = $${answer.toFixed(2)}`,
      }
    },
  },

  // Dividend = shares × cents per share. Shares kept a multiple of 100 so
  // the dividend is always a whole number of dollars.
  f4q8: {
    generate: (random) => {
      const shares = randomInt(random, 5, 30) * 100
      const cents = randomInt(random, 10, 90)
      const answer = (shares * cents) / 100
      return {
        questionHtml: `An investor owns ${shares.toLocaleString('en-AU')} shares paying a dividend of ${cents} cents per share. Find the total dividend.`,
        answer,
        tolerance: 0.1,
        solutionHtml: `Dividend = ${shares.toLocaleString('en-AU')} &times; $${(cents / 100).toFixed(2)} = $${answer.toFixed(2)}`,
      }
    },
  },

  // Dividend yield.
  f4q9: {
    generate: (random) => {
      // Price kept comfortably above the dividend so the yield stays in a
      // realistic band (real ASX dividend yields are roughly 0.5%–7%) —
      // picking both independently could otherwise produce an absurd
      // yield like 30%.
      const cents = randomInt(random, 15, 60)
      const price = round(randomInt(random, 1000, 4000) / 100, 2)
      const dividend = cents / 100
      const answer = round((dividend / price) * 100, 2)
      return {
        questionHtml: `A share priced at $${price.toFixed(2)} pays a dividend of ${cents} cents. Find the dividend yield as a percentage, correct to 2 decimal places.`,
        answer,
        tolerance: Math.max(answer * 0.005, 0.02),
        solutionHtml: `Yield = dividend &divide; price &times; 100 = ${dividend.toFixed(2)} &divide; ${price.toFixed(2)} &times; 100 = ${answer}%`,
      }
    },
  },

  // Daily simple interest on a credit card balance.
  f4q10: {
    generate: (random) => {
      const balance = randomInt(random, 500, 5000)
      const ratePct = round(randomInt(random, 1500, 2400) / 100, 2)
      const days = randomInt(random, 10, 45)
      const answer = round((balance * (ratePct / 100) * days) / 365, 2)
      return {
        questionHtml: `A credit card charges ${ratePct}% p.a. simple interest, calculated daily. Find the interest on a $${balance.toLocaleString('en-AU')} balance carried for ${days} days, correct to the nearest cent.`,
        answer,
        tolerance: 0.02,
        solutionHtml: `I = ${balance} &times; ${round(ratePct / 100, 4)} &times; ${days} &divide; 365 = $${answer.toFixed(2)}`,
      }
    },
  },

  // Total interest on a home loan — plain multiplication and subtraction.
  f4q11: {
    generate: (random) => {
      const principal = randomInt(random, 150, 600) * 1000
      const years = randomInt(random, 15, 30)
      // The monthly repayment must clear the loan with room for interest —
      // derived from principal/years rather than picked independently, so
      // total repaid always exceeds the principal (an earlier version
      // could pick a monthly figure too low for the term, producing a
      // negative "interest paid").
      const minMonthly = Math.ceil(principal / (12 * years))
      const monthly = minMonthly + randomInt(random, 200, 900)
      const totalRepaid = monthly * 12 * years
      const answer = totalRepaid - principal
      return {
        questionHtml: `A $${principal.toLocaleString('en-AU')} home loan is repaid at $${monthly.toLocaleString('en-AU')} per month for ${years} years. Find the total interest paid.`,
        answer,
        tolerance: 0.5,
        solutionHtml: `Total repaid = ${monthly} &times; 12 &times; ${years} = $${totalRepaid.toLocaleString('en-AU')}.00. Interest = $${totalRepaid.toLocaleString('en-AU')}.00 &minus; $${principal.toLocaleString('en-AU')} = $${answer.toLocaleString('en-AU')}.00`,
      }
    },
  },

  // Appreciation, compounding annually.
  f4q13: {
    generate: (random) => {
      const value0 = randomInt(random, 1500, 9000) * 100
      const ratePct = round(randomInt(random, 20, 70) / 10, 1)
      const years = randomInt(random, 2, 6)
      const rate = ratePct / 100
      const answer = round(value0 * (1 + rate) ** years, 2)
      return {
        questionHtml: `A property worth $${value0.toLocaleString('en-AU')} appreciates at ${ratePct}% p.a. Find its value after ${years} years.`,
        answer,
        tolerance: Math.max(answer * 0.003, 0.1),
        solutionHtml: `Value = ${value0.toLocaleString('en-AU')} &times; ${1 + rate}<sup>${years}</sup> = $${answer.toFixed(2)}`,
      }
    },
  },

  // ---- MS-F5: Annuities ----
  // (f5q3, f5q8 and f5q9 are deliberately not varied — each explicitly
  // depends on the exact numbers from the question(s) before it, the same
  // reason f4q4 is skipped above.)

  // Future value of an annuity, annual contributions.
  f5q1: {
    generate: (random) => {
      const contribution = randomInt(random, 5, 50) * 100
      const ratePct = round(randomInt(random, 30, 80) / 10, 1)
      const years = randomInt(random, 5, 15)
      const rate = ratePct / 100
      const answer = round(contribution * (((1 + rate) ** years - 1) / rate), 2)
      return {
        questionHtml: `Find the future value of an annuity of $${contribution.toLocaleString('en-AU')} paid at the end of each year for ${years} years, earning ${ratePct}% p.a. compounded annually.`,
        answer,
        tolerance: Math.max(answer * 0.003, 0.1),
        solutionHtml: `FV = ${contribution} &times; [(${1 + rate}<sup>${years}</sup> &minus; 1) &divide; ${rate}] = $${answer.toFixed(2)}`,
      }
    },
  },

  // Future value of an annuity, monthly contributions.
  f5q2: {
    generate: (random) => {
      const contribution = randomInt(random, 100, 600)
      const annualPct = round(randomInt(random, 30, 90) / 10, 1)
      const years = randomInt(random, 3, 10)
      const r = annualPct / 100 / 12
      const n = 12 * years
      const answer = round(contribution * (((1 + r) ** n - 1) / r), 2)
      return {
        questionHtml: `$${contribution} is deposited at the end of each month for ${years} years into an account earning ${annualPct}% p.a. compounded monthly. Find the final balance.`,
        answer,
        tolerance: Math.max(answer * 0.003, 0.1),
        solutionHtml: `r = ${round(r, 6)}, n = ${n}. FV = ${contribution} &times; [(${round(1 + r, 6)}<sup>${n}</sup> &minus; 1) &divide; ${round(r, 6)}] = $${answer.toFixed(2)}`,
      }
    },
  },

  // Present value of an annuity (loan amount from repayments).
  f5q4: {
    generate: (random) => {
      const repayment = randomInt(random, 800, 2500)
      const monthlyRatePct = round(randomInt(random, 25, 60) / 100, 2)
      const months = randomInt(random, 120, 300)
      const r = monthlyRatePct / 100
      const growth = (1 + r) ** months
      const answer = Math.round((repayment * (growth - 1)) / (r * growth))
      return {
        questionHtml: `A loan is repaid with ${months} monthly payments of $${repayment.toLocaleString('en-AU')} at ${monthlyRatePct}% per month. Find the amount borrowed (the present value), to the nearest dollar.`,
        answer,
        tolerance: Math.max(answer * 0.002, 5),
        solutionHtml: `PV = ${repayment} &times; [(${round(1 + r, 4)}<sup>${months}</sup> &minus; 1) &divide; (${r} &times; ${round(1 + r, 4)}<sup>${months}</sup>)] = $${answer.toLocaleString('en-AU')}`,
      }
    },
  },

  // Future value of an annuity — superannuation framing, rounded to the
  // nearest dollar like the original.
  f5q5: {
    generate: (random) => {
      const contribution = randomInt(random, 20, 80) * 100
      const ratePct = round(randomInt(random, 40, 80) / 10, 1)
      const years = randomInt(random, 15, 35)
      const rate = ratePct / 100
      const answer = Math.round(contribution * (((1 + rate) ** years - 1) / rate))
      return {
        questionHtml: `A worker contributes $${contribution.toLocaleString('en-AU')} at the end of each year to superannuation earning ${ratePct}% p.a. Find the balance after ${years} years, to the nearest dollar.`,
        answer,
        tolerance: Math.max(answer * 0.002, 5),
        solutionHtml: `FV = ${contribution} &times; [(${1 + rate}<sup>${years}</sup> &minus; 1) &divide; ${rate}] = $${answer.toLocaleString('en-AU')}`,
      }
    },
  },

  // Recursive annuity definition, three terms.
  f5q6: {
    generate: (random) => {
      const contribution = randomInt(random, 20, 90) * 10
      const rateThousandths = randomInt(random, 2, 9)
      const mult = 1 + rateThousandths / 1000
      const a1 = contribution
      const a2 = round(a1 * mult + contribution, 2)
      const a3 = round(a2 * mult + contribution, 2)
      return {
        questionHtml: `An annuity is modelled by <em>A</em><sub><em>n</em>+1</sub> = <em>A</em><sub><em>n</em></sub> &times; ${mult} + ${contribution}, with <em>A</em><sub>1</sub> = ${a1}. Find <em>A</em><sub>3</sub>, correct to 2 decimal places.`,
        answer: a3,
        tolerance: Math.max(a3 * 0.003, 0.05),
        solutionHtml: `A&#8322; = ${a1} &times; ${mult} + ${contribution} = $${a2.toFixed(2)}. A&#8323; = $${a2.toFixed(2)} &times; ${mult} + ${contribution} = $${a3.toFixed(2)}`,
      }
    },
  },

  // Monthly interest charged on a loan balance.
  f5q7: {
    generate: (random) => {
      const balance = randomInt(random, 800, 4500) * 100
      const monthlyRatePct = round(randomInt(random, 25, 60) / 100, 2)
      const answer = round(balance * (monthlyRatePct / 100), 2)
      return {
        questionHtml: `A loan balance is $${balance.toLocaleString('en-AU')} and the monthly interest rate is ${monthlyRatePct}%. Find the interest charged for the month.`,
        answer,
        tolerance: Math.max(answer * 0.003, 0.05),
        solutionHtml: `Interest = ${balance.toLocaleString('en-AU')} &times; ${round(monthlyRatePct / 100, 4)} = $${answer.toFixed(2)}`,
      }
    },
  },

  // Repayment-per-$1000-borrowed lookup table. Loan amount kept a multiple
  // of $1000 so the division is always exact.
  f5q10: {
    generate: (random) => {
      const perThousand = round(randomInt(random, 400, 900) / 100, 2)
      const thousands = randomInt(random, 100, 400)
      const loan = thousands * 1000
      const answer = round(perThousand * thousands, 2)
      return {
        questionHtml: `A table gives the monthly repayment on a loan as $${perThousand.toFixed(2)} per $1000 borrowed. Find the monthly repayment on a $${loan.toLocaleString('en-AU')} loan.`,
        answer,
        tolerance: 0.05,
        solutionHtml: `${loan.toLocaleString('en-AU')} &divide; 1000 = ${thousands} lots of $1000, so the repayment is ${thousands} &times; $${perThousand.toFixed(2)} = $${answer.toFixed(2)}`,
      }
    },
  },

  // Number of periods for quarterly contributions — always a clean
  // multiple of 4.
  f5q12: {
    generate: (random) => {
      const years = randomInt(random, 5, 20)
      const answer = 4 * years
      return {
        questionHtml: `Contributions are made quarterly for ${years} years. How many periods <em>n</em> are used in the annuity formula?`,
        answer,
        tolerance: 0.001,
        solutionHtml: `Quarterly means 4 periods per year: n = 4 &times; ${years} = ${answer}`,
      }
    },
  },
}
