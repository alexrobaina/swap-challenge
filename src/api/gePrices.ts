export const getPrices = async ({
  payCoin,
  receiveCoin,
}: {
  payCoin: string
  receiveCoin: string
}) => {
  try {
    const resPayCoin = {
      data: {
        [payCoin]: {
          usd: Math.random() * 1000,
        },
      },
    }
    const resReceiveCoin = {
      data: {
        [receiveCoin]: {
          usd: Math.random() * 1000,
        },
      },
    }

    // redondea los valores a 5 decimales
    const payCoinPrice = resPayCoin.data[payCoin].usd
    const receiveCoinPrice = resReceiveCoin.data[receiveCoin].usd

    await new Promise((resolve) => setTimeout(resolve, 100))

    return { payCoinPrice, receiveCoinPrice }
  } catch (error) {
    console.error('Error fetching prices:', error)
  }
}
