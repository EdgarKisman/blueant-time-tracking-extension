import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import { cleanup } from '@testing-library/react'

describe('App', () => {
  afterEach(cleanup)
  it('should show title', () => {
    render(<App />)

    expect(screen.getByText('BlueAnt Time Tracker')).toBeDefined()
  })
  
  it('should toggle darkmode', () => {
    render(<App />)
  
    // Get the theme switch button
    const themeSwitchButton = screen.getByTestId('toggle-theme-btn')
    
    // Simulate a click on the button
    fireEvent.click(themeSwitchButton)
    
    expect(screen.findAllByTestId("moon"))
  })
})
