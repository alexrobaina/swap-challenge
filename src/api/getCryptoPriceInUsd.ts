export const getCryptoPriceInUsd = async (coinId: string): Promise<number> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const randomPrice = Math.random() * 1000
    const roundedPrice = parseFloat(randomPrice.toFixed(0))

    const response = {
      data: {
        [coinId]: {
          usd: roundedPrice,
        },
      },
    }

    return response.data[coinId].usd
  } catch (error) {
    console.error('Error fetching price:', error)
    throw new Error('Failed to fetch price')
  }
}
