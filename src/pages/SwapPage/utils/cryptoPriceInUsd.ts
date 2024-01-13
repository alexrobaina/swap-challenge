import axios from 'axios'

// Define an interface for the response structure for better type checking
interface CryptoPriceResponse {
  [key: string]: {
    usd: number
  }
}

// Function to get the price of a cryptocurrency in USD
async function getCryptoPriceInUsd(coinId: string): Promise<number> {
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

// Function to calculate the USD value for a given amount of cryptocurrency
export async function calculateUsdValue(
  coinId: string,
  amount: number,
): Promise<number> {
  try {
    const pricePerCoin = await getCryptoPriceInUsd(coinId)
    return amount * pricePerCoin
  } catch (error) {
    console.error('Error in calculation:', error)
    throw new Error('Failed to calculate USD value')
  }
}
