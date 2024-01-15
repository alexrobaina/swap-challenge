import { describe, test, expect } from 'vitest'

import { BaseAmountInput } from '../../../../components/common/BaseAmountInput'
import { render, screen, fireEvent } from '../../../test-utils'

describe('BaseAmountInput', () => {
  test('renders the input with the correct label', () => {
    render(
      <BaseAmountInput label="Test Label" value={10} onChange={() => {}} />,
    )
    const labelElement = screen.getByTestId('input-label')
    expect(labelElement).toHaveTextContent('Test Label')
  })

  test('renders the input with the correct value', () => {
    render(
      <BaseAmountInput label="Test Label" value={10} onChange={() => {}} />,
    )
    const inputElement = screen.getByTestId('number-input') as HTMLInputElement
    expect(inputElement.value).toBe('10')
  })

  test('calls onChange when the input value is changed', () => {
    const handleChange = vi.fn()
    render(
      <BaseAmountInput label="Test Label" value={10} onChange={handleChange} />,
    )
    const inputElement = screen.getByTestId('number-input') as HTMLInputElement
    fireEvent.change(inputElement, { target: { value: '20' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
