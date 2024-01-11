import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import App from './App'

describe('Testing App Page', () => {
  it('should show title', () => {
    const {getByText} = render(<App />)
    expect(getByText('BlueAnt Time Tracker')).toBeDefined()
  })
})
