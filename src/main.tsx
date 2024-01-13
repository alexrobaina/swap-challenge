import { observable } from 'mobx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App.tsx'
import { AppContextProps } from './services/AppContext.ts'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'

const queryClient = new QueryClient()

async function main() {
  const appContext: AppContextProps = observable({
    session: { token: '' },
    user: {
      id: '',
      email: '',
    },
  })

  return ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  ).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App appContext={appContext} />
      </QueryClientProvider>
    </React.StrictMode>,
  )
}

void main()
