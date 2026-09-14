import '@testing-library/jest-dom/vitest'

// jsdom doesn't implement scrolling — stub it out so TopicShell's
// scroll-to-top-on-navigate effect doesn't spam "not implemented" warnings.
window.scrollTo = () => {}

// Without this, progressStore's localStorage writes from one test can leak
// into another when Vitest schedules multiple test files onto the same
// worker thread — surfaced as an intermittent, hard-to-reproduce failure in
// an unrelated test (e.g. a maths sequential-test question count/button
// changing depending on run order). Clearing after every test makes each
// one start from the same "no saved progress" state regardless of pool
// scheduling.
afterEach(() => {
  localStorage.clear()
})
