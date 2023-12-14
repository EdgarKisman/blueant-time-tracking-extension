import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import App from './App'

describe('App', () => {
  afterEach(cleanup)
  it('should show title', () => {
    render(<App />)

    expect(screen.getByText('BlueAnt Time Tracker')).toBeDefined()
  })
})