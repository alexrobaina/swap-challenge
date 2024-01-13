import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { UniswapLogo } from '../../assets/icons'

interface Props {}

export const Navbar: FC<Props> = () => {
  return (
    <>
      <nav className="bg-background-800 fixed top-0 left-0 w-full z-10">
        <div className="md:pl-5 md:pr-20">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex items-center gap-10 w-full">
              <div className="text-primary-50">
                <UniswapLogo />
              </div>
              <div className="text-primary-50 text-sm">Swap</div>
              <div className="text-gray-400 text-sm">Token</div>
              <div className="text-gray-400 text-sm">NFTs</div>
            </div>
          </div>
        </div>
      </nav>
      <div className="p-5 md:ml-16 md:mr-16 pt-28">
        <Outlet />
      </div>
    </>
  )
}
