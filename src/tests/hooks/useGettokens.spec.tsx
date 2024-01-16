import { renderHook } from '@testing-library/react-hooks'
import { QueryClient, QueryClientProvider } from 'react-query'
import { describe, test, expect, vi } from 'vitest'

// eslint-disable-next-line import/order
import * as api from '../../api/getTokens'

vi.mock('../../api/getCryptoPriceInUsd')

import { useGetTokens } from '../../hooks/useGetTokens'

vi.mock('../api/getTokens')

// Create a QueryClient insqtance
const queryClient = new QueryClient()

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useGetTokens', () => {
  const mockData = [
    {
      img: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32%402x/color/eth%402x.png',
      label: 'ETH',
      id: 'eth',
    },
  ]
  test('initially is in a loading state', async () => {
    vi.spyOn(api, 'getTokens').mockResolvedValue(mockData)

    const { result, waitForNextUpdate } = renderHook(() => useGetTokens(), {
      wrapper,
    })

    expect(result.current.isLoading).toBe(true)
    await waitForNextUpdate()
    expect(result.current.isLoading).toBe(false)
  })
})
