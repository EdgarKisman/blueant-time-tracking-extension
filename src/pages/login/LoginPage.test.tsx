import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import LoginPage from './LoginPage'

describe('App', () => {
  afterEach(cleanup)
  it('should show title', () => {
    render(<LoginPage />)

    expect(screen.findByRole('button', { name: 'Login' })).toBeDefined()
  })
})
