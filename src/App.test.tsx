import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the study subjects and opens a subject detail view', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /study quick/i })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /modern history/i }))

    expect(screen.getByRole('heading', { name: /power & authority/i })).toBeInTheDocument()
  })
})
