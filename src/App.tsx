import { observer } from 'mobx-react'
import { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Navbar } from './components/Navbar'
import { SwapPage } from './pages/SwapPage'
import { AppContext, AppContextProps } from './services/AppContext'

interface Props {
  appContext: AppContextProps
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <SwapPage />,
      },
      {
        path: '*',
        element: <SwapPage />,
      },
    ],
  },
])

const App: FC<Props> = observer((props) => {
  return (
    <AppContext.Provider value={props.appContext}>
      <ToastContainer
        draggable
        rtl={false}
        pauseOnHover
        hideProgressBar
        autoClose={5000}
        pauseOnFocusLoss
        closeButton={false}
        newestOnTop={false}
        position="bottom-right"
      />
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
})

export default App
