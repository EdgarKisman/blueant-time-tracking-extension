import { afterEach, describe, expect, it } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import App from './App'

describe('Testing App Page', () => {
  afterEach(cleanup)
  it('should show title', () => {
    render(<App />)

    expect(screen.getByText('BlueAnt Time Tracker')).toBeDefined()
  })
})
