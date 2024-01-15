import { createContext } from 'react'

export interface AppContextProps {
  wallet: { address: string } | null
}

const warning: AppContextProps = {
  get wallet(): { address: string } {
    console.warn('Accessed context.wallet without context provider.')
    throw new Error('Accessed context.wallet without context provider.')
  },
}

export const AppContext = createContext<AppContextProps>(warning)
