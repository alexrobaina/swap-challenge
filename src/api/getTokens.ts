export const getTokens = async () => {
  try {
    return [
      {
        img: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32%402x/color/eth%402x.png',
        label: 'ETH',
        id: 'eth',
      },
      {
        img: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32%402x/color/dai%402x.png',
        label: 'DAI',
        id: 'dai',
      },
      {
        img: 'https://github.com/spothq/cryptocurrency-icons/blob/master/32@2x/color/usdc@2x.png?raw=true',
        label: 'USDC',
        id: 'usd-coin',
      },
      {
        img: 'https://github.com/spothq/cryptocurrency-icons/blob/master/32@2x/color/usdt@2x.png?raw=true',
        label: 'USDT',
        id: 'tether',
      },
      {
        img: 'https://github.com/spothq/cryptocurrency-icons/blob/master/32@2x/color/wbtc@2x.png?raw=true',
        label: 'WBTC',
        id: 'wrapped-bitcoin',
      },
    ]
  } catch (error) {
    return error
  }
}
