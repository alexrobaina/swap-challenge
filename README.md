# Swap challenge

Swap Challenge is a single-page application (SPA) built using ReactJS and Vite.js, simulating cryptocurrency token swapping. Users can select and "swap" mock tokens like Uniswap's swap interface.

### Features

I added custom hooks like useSwap, useSendTrasaction, useScreenWidth, useGetTokens, useCalculateUsdValue
I added several component test vite vitest (It is like a jest) and react testing library.
Token Selection: Users can choose a 'From' token and a 'To' token from dropdown menus with predefined mock tokens such as BTC, ETH, and LTC.
Amount Input: An input field is provided for users to specify the amount of the 'From' token they wish to swap, with an estimated amount of the 'To' token displayed.
Swap Button: A button to initiate the swap action, simulating the process with a mock API call.

### Deployment
The application is deployed on Vercel and can be accessed [Swap-challenge](https://swap-challenge.vercel.app/) 

### Prerequisites
Node.js v20.x
A package manager like npm or Yarn

### Installation and Setup
To run this project locally, follow these steps:

```
git clone https://your-repository-url.git
cd swap-challenge
```

Using Yarn
```
yarn install
```

Run the project
```
yarn dev
```

Navigate to http://localhost:3000 to view the application in your browser.

Testing
To run the unit tests for the components:
```
yarn test
```

Technologies Used
- ReactJS
- Vite.js
- TypeScript
- MobX
- React Query
- Node.js
- Tailwind

Thanks 🚀

