import { FC } from 'react'

import { IconSettings } from '../../../../assets/icons'

export const Header: FC = () => (
  <div className="pt-4 px-2 flex justify-between sm:mx-auto sm:w-full sm:max-w-md">
    <div className="flex gap-4 flex-row">
      <div className="text-sm text-white">Swap</div>
      <div className="text-sm text-[#6b7280]">Buy</div>
    </div>
    <IconSettings />
  </div>
)
