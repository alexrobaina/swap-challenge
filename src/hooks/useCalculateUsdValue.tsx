import axios from 'axios'
import { useState } from 'react'

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

interface CryptoPriceResponse {
  [key: string]: {
    usd: number
  }
}

const getCryptoPriceInUsd = async (coinId: string): Promise<number> => {
  try {
    const response = await axios.get<CryptoPriceResponse>(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`,
    )
    return response.data[coinId].usd
  } catch (error) {
    console.error('Error fetching price:', error)
    throw new Error('Failed to fetch price')
  }
}
