import { describe, test, expect } from 'vitest'

import { BaseDropdown } from '../../../../components/common/BaseDropdown'
import { render, screen, fireEvent } from '../../../test-utils'

describe('BaseDropdown', () => {
  vi.mock('../../../../assets/icons', () => {
    return {
      IconChevronDown: () => <span>Mocked Icon</span>,
    }
  })

  const options = [
    { id: '1', img: 'img1.jpg', label: 'Option 1' },
    { id: '2', img: 'img2.jpg', label: 'Option 2' },
  ]

  test('renders with placeholder', () => {
    render(
      <BaseDropdown
        options={options}
        onSelect={() => {}}
        placeholder="Select option"
      />,
    )
    expect(screen.getByTestId('dropdown-button')).toHaveTextContent(
      'Select option',
    )
  })

  test('opens and shows options when clicked', () => {
    render(<BaseDropdown options={options} onSelect={() => {}} />)
    fireEvent.click(screen.getByTestId('dropdown-button'))
    expect(screen.getByTestId('dropdown-options')).toBeVisible()
    expect(screen.getAllByTestId(/dropdown-option-/)).toHaveLength(
      options.length,
    )
  })

  test('calls onSelect with correct option when an option is clicked', () => {
    const onSelectMock = vi.fn()
    render(<BaseDropdown options={options} onSelect={onSelectMock} />)
    fireEvent.click(screen.getByTestId('dropdown-button'))
    fireEvent.click(screen.getByTestId('dropdown-option-1'))
    expect(onSelectMock).toHaveBeenCalledWith(options[0])
  })

  test('closes the dropdown when an option is selected', async () => {
    render(<BaseDropdown options={options} onSelect={() => {}} />)
    // Open dropdown
    fireEvent.click(screen.getByTestId('dropdown-button'))
    // Click on an option
    fireEvent.click(screen.getByTestId('dropdown-option-1'))
    // Dropdown should be closed
    expect(screen.queryByTestId('dropdown-options')).not.toBeInTheDocument()
  })

  test('closes the dropdown when clicking outside', () => {
    render(<BaseDropdown options={options} onSelect={() => {}} />)
    // Open dropdown
    fireEvent.click(screen.getByTestId('dropdown-button'))
    // Simulate clicking outside
    fireEvent.mouseDown(document)
    // Dropdown should be closed
    expect(screen.queryByTestId('dropdown-options')).not.toBeInTheDocument()
  })
})
