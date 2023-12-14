import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import TimeOverviewPage from './TimeOverviewPage'

describe('App', () => {
  afterEach(cleanup)
  it('should show title', () => {
    render(<TimeOverviewPage />)

    expect(screen.getByText('Time')).toBeDefined()
  })
})
