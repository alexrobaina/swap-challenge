export const sendTrasaction = async ({
  address,
  fromCoinId,
  toCoinId,
  fromAmount,
  toAmount,
}: {
  address?: string
  fromCoinId?: string
  toCoinId?: string
  fromAmount?: number
  toAmount?: number
}): Promise<{
  status: number
  message: string
}> => {
  try {
    console.log(fromCoinId, toCoinId, fromAmount, toAmount, address)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    return {
      status: 200,
      message: 'Transaction sent successfully',
    }
  } catch (error) {
    console.error('Error fetching price:', error)
    throw new Error('Failed to fetch price')
  }
}
