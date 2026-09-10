import '@testing-library/jest-dom/vitest'

// jsdom doesn't implement scrolling — stub it out so TopicShell's
// scroll-to-top-on-navigate effect doesn't spam "not implemented" warnings.
window.scrollTo = () => {}
