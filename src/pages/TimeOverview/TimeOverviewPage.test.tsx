import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import TimeOverviewPage from './TimeOverviewPage'

describe('App', () => {
  afterEach(cleanup)
  it('should show title', () => {
    render(<TimeOverviewPage />)
    expect(screen.getByText('Datum')).toBeDefined()
  })
})
