import { describe, test, expect } from 'vitest'

import { ReactModal } from '../../../../components/common/ReactModal'
import { render, screen, fireEvent } from '../../../test-utils'

describe('ReactModal', () => {
  test('renders modal when open', () => {
    render(
      <ReactModal isOpen title="Test Modal" description="Test Description">
        <div data-testid="children">Hi</div>
      </ReactModal>,
    )
    expect(screen.getByTestId('modal-title').textContent).toBe('Test Modal')
    expect(screen.getByTestId('modal-description').textContent).toBe(
      'Test Description',
    )
  })

  test('does not render modal when not open', () => {
    render(
      <ReactModal isOpen={false} title="Test Modal">
        <div data-testid="children">Hi</div>
      </ReactModal>,
    )
    expect(screen.queryByTestId('react-modal-open')).toBeNull()
  })

  test('calls closeModal when close button is clicked', () => {
    const closeModalMock = vi.fn()
    render(
      <ReactModal isOpen={true} buttonClose={true} closeModal={closeModalMock}>
        <div data-testid="children">Hi</div>
      </ReactModal>,
    )
    const closeButton = screen.getByTestId('modal-close-button')
    fireEvent.click(closeButton)
    expect(closeModalMock).toHaveBeenCalledTimes(1)
  })
})
