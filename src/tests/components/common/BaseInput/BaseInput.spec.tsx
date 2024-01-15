import { describe, test, expect } from 'vitest'

import { BaseInput } from '../../../../components/common/BaseInput'
import { render, screen, fireEvent } from '../../../test-utils'

describe('BaseInput', () => {
  test('renders with correct label', () => {
    render(<BaseInput label="Test Label" placeholder="Enter text" />)
    expect(screen.getByTestId('input-label').textContent).toBe('Test Label')
  })

  test('calls handleChange on input change', () => {
    const handleChange = vi.fn()
    render(<BaseInput handleChange={handleChange} placeholder="Enter text" />)
    const input = screen.getByTestId('text-input')
    fireEvent.change(input, { target: { value: 'new value' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  test('displays error message', () => {
    const errorMessage = 'Error message'
    render(<BaseInput error={errorMessage} placeholder="Enter text" />)
    expect(screen.getByTestId('error-message')).toBeTruthy()
    expect(screen.getByText(errorMessage)).toBeTruthy()
  })

  test('input is disabled when isdisabled is true', () => {
    render(<BaseInput isdisabled placeholder="Enter text" />)
    const input = screen.getByTestId('text-input')
    expect(input).toBeDisabled()
  })

  test('renders left icon when provided', () => {
    const leftIcon = <span>Left Icon</span>
    render(<BaseInput iconLeft={leftIcon} placeholder="Enter text" />)
    expect(screen.getByTestId('icon-left')).toBeTruthy()
  })

  test('renders right icon when provided', () => {
    const rightIcon = <span>Right Icon</span>
    render(<BaseInput IconRight={rightIcon} placeholder="Enter text" />)
    expect(screen.getByTestId('icon-right')).toBeTruthy()
  })
})
