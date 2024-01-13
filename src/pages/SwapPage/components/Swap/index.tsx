import { FC, useEffect, useState } from 'react'

import { IconSettings } from '../../../../assets/icons'
import { BaseAmountInput } from '../../../../components/common/BaseAmountInput'
import { BaseButton } from '../../../../components/common/BaseButton'
import { BaseLoading } from '../../../../components/common/BaseLoading'
import { DropdownCoin } from '../../../../components/common/DropdownCoin'
import { useCalculateUsdValue } from '../../../../hooks/useCalculateUsdValue'
import { useGetTokens } from '../../../../hooks/useGetTokens'

interface Option {
  id: string
  img: string
  label: string
}

export const Swap: FC = () => {
  const {
    pricePerCoin: pricePerCoinFrom,
    calculateUsdValue: calculateUsdValueFrom,
  } = useCalculateUsdValue()
  const {
    pricePerCoin: pricePerCoinTo,
    calculateUsdValue: calculateUsdValueTo,
  } = useCalculateUsdValue()
  const { data, isLoading } = useGetTokens()
  const [from, setFrom] = useState<number>()
  const [to, setTo] = useState<number>()
  const [selectedCoinFrom, setSelectedCoinFrom] = useState<{
    label: string
    img: string
    id: string
  }>({
    img: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32%402x/color/eth%402x.png',
    label: 'ETH',
    id: 'ethereum',
  })
  const [selectedCoinTo, setSelectedCoinTo] = useState<{
    label: string
    img: string
    id: string
  }>()

  useEffect(() => {
    setTimeout(() => {
      if (selectedCoinFrom.id) {
        calculateUsdValueFrom(selectedCoinFrom.id, from || 0)
      }

      if (selectedCoinTo?.id) {
        calculateUsdValueTo(selectedCoinTo.id, to || 0)
      }
    }, 1000)
  }, [selectedCoinTo, selectedCoinFrom, from, to, calculateUsdValueFrom])

  if (isLoading) return <BaseLoading large />

  return (
    <div className="flex justify-center">
      <div className="z-10 flex min-h-full flex-col justify-center py-8">
        <div className="bg-[#131313] w-[480px] border-[#7d45d847] border-[1px] rounded-lg flex flex-col items-center justify-center shadow-3xl sm:rounded-[24px] p-2">
          <div className="pt-4 px-2 flex justify-between sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex gap-4 flex-row">
              <div className="text-sm text-white">Swap</div>
              <div className="text-sm text-[#6b7280]">Buy</div>
            </div>
            <div className="">
              <IconSettings />
            </div>
          </div>
          <div className="mt-5 flex gap-1 w-full flex-col">
            <div className="relative">
              <div className="absolute top-10 right-5 z-20">
                <DropdownCoin
                  options={data}
                  onSelect={setSelectedCoinFrom}
                  selectedOption={selectedCoinFrom}
                />
              </div>
              <BaseAmountInput
                value={from}
                label="You pay"
                onChange={(e) => setFrom(parseInt(e.target.value))}
              />
              {pricePerCoinFrom > 0 && (
                <div className="absolute z-30 bottom-[10px] left-4 text-gray-400 text-sm">{`$${pricePerCoinFrom}`}</div>
              )}
            </div>
            <div className="relative">
              <div className="absolute top-10 right-5 z-10">
                <DropdownCoin
                  options={data as Option[]}
                  onSelect={setSelectedCoinTo}
                  selectedOption={selectedCoinTo}
                />
              </div>
              <BaseAmountInput
                value={to}
                label="You receive"
                onChange={(e) => setTo(parseInt(e.target.value))}
              />
              {pricePerCoinTo > 0 && (
                <div className="absolute z-30 bottom-[10px] left-4 text-gray-400 text-sm">{`$${pricePerCoinTo}`}</div>
              )}
            </div>
          </div>
          <div className="mt-2 w-full">
            <BaseButton
              style="primary"
              height="h-[55px]"
              text="Connect wallet"
              className="w-[300px]"
              // onClick={handleLogin}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
