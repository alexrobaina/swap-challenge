import { useState } from 'react'

import { getCryptoPriceInUsd } from '../api/getCryptoPriceInUsd'

export const useCalculateUsdValue = () => {
  const [pricePerCoin, setPricePerCoin] = useState<number>(0)

  const calculateUsdValue = async (coinId: string, amount: number) => {
    try {
      if (amount === 0) return setPricePerCoin(0)

      const pricePerCoin = await getCryptoPriceInUsd(coinId)
      setPricePerCoin(amount * pricePerCoin)
    } catch (error) {
      console.error('Error in calculation:', error)
      throw new Error('Failed to calculate USD value')
    }
  }

  return { calculateUsdValue, pricePerCoin }
}
