import { FC } from 'react'

import { BaseAmountInput } from '../../../../components/common/BaseAmountInput'
import { BaseDropdown } from '../../../../components/common/BaseDropdown'

interface Option {
  id: string
  img: string
  label: string
}

interface Props {
  selectedCoinFrom: Option
  toPricePerCoinUSD: number
  fromPricePerCoinUSD: number
  toAmount: number | undefined
  fromAmount: number | undefined
  coinOptions: Option[] | unknown
  selectedCoinTo: Option | undefined
  setSelectedCoinTo: (option: Option) => void
  setSelectedCoinFrom: (option: Option) => void
  handleToAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFromAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Form: FC<Props> = ({
  toAmount,
  fromAmount,
  coinOptions,
  selectedCoinTo,
  selectedCoinFrom,
  setSelectedCoinTo,
  toPricePerCoinUSD,
  fromPricePerCoinUSD,
  setSelectedCoinFrom,
  handleToAmountChange,
  handleFromAmountChange,
}) => (
  <div className="mt-5 flex gap-1 w-full flex-col">
    <div className="relative">
      <div className="absolute top-10 right-5 z-20">
        <BaseDropdown
          options={coinOptions as Option[]}
          onSelect={setSelectedCoinFrom}
          selectedOption={selectedCoinFrom}
        />
      </div>
      <BaseAmountInput
        label="You pay"
        value={fromAmount}
        onChange={handleFromAmountChange}
      />
      {fromPricePerCoinUSD > 0 && (
        <div className="absolute z-30 bottom-[10px] left-4 text-gray-400 text-sm">{`$${fromPricePerCoinUSD}`}</div>
      )}
    </div>
    <div className="relative">
      <div className="absolute top-10 right-5 z-10">
        <BaseDropdown
          options={coinOptions as Option[]}
          onSelect={setSelectedCoinTo}
          selectedOption={selectedCoinTo}
        />
      </div>
      <BaseAmountInput
        value={toAmount}
        label="You receive"
        onChange={handleToAmountChange}
      />
      {toPricePerCoinUSD > 0 && (
        <div className="absolute z-30 bottom-[10px] left-4 text-gray-400 text-sm">{`$${toPricePerCoinUSD}`}</div>
      )}
    </div>
  </div>
)
