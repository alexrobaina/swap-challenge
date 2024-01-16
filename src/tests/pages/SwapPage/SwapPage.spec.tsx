import { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { describe, test, expect } from 'vitest'

import { SwapPage } from '../../../pages/SwapPage'
import { AppContext, AppContextProps } from '../../../services/AppContext'
import { render, screen, fireEvent, waitFor } from '../../test-utils'

interface MockAppContextProviderProps {
  children: ReactNode
}

describe('SwapPage', () => {
  const queryClient = new QueryClient()

  const mockAppContextValueFilled = {
    wallet: { address: 'mocked_address' },
  }

  const MockAppContextProvider: FC<MockAppContextProviderProps> = ({
    children,
  }) => {
    return (
      <AppContext.Provider value={mockAppContextValueFilled}>
        {children}
      </AppContext.Provider>
    )
  }

  vi.mock('../../../assets/icons', () => {
    return {
      IconSettings: () => <span>IconSettings</span>,
      IconChevronDown: () => <span>IconChevronDown</span>,
    }
  })

  const component = (
    <QueryClientProvider client={queryClient}>
      <MockAppContextProvider>
        <SwapPage />
      </MockAppContextProvider>
    </QueryClientProvider>
  )

  test('SwapPage correct render', () => {
    render(component)
    expect(screen.getByTestId('swap-component')).toBeVisible()
  })

  test('Show address badge', () => {
    render(component)
    expect(screen.getByTestId('address').textContent).toBe('mocked_address')
  })

  test('Show header component', () => {
    render(component)
    expect(screen.getByTestId('header')).toBeVisible()
  })

  const mockAppContextValue: AppContextProps = {
    wallet: null, // No wallet address
  }

  test('Open modal when address is not present and button is clicked', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider value={mockAppContextValue}>
          <SwapPage />
        </AppContext.Provider>
      </QueryClientProvider>,
    )

    fireEvent.click(screen.getByTestId('send-button'))

    await waitFor(() => {
      // Now the modal should be visible
      expect(screen.getByTestId('connect-wallet-modal')).toBeVisible()
    })
  })

  test('Button is clicked and send transaction', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider value={mockAppContextValueFilled}>
          <SwapPage />
        </AppContext.Provider>
      </QueryClientProvider>,
    )

    fireEvent.click(screen.getByTestId('send-button'))

    await waitFor(() => {
      expect(screen.getByTestId('send-transaction-loading')).toBeVisible()
    })
  })
})
