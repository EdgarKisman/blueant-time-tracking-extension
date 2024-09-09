import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import LoginPage from './LoginPage'

describe('Testing Login Page', () => {
  it('should show title', () => {
    const { findByRole } = render(<LoginPage />)
    expect(findByRole('button', { name: 'Login' })).toBeDefined()
  })
})
