import { FC } from 'react'

interface Props {
  value: number | undefined
  label: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const BaseAmountInput: FC<Props> = ({ value, onChange, label }) => (
  <div className="relative w-full flex flex-col">
    <label
      htmlFor="input"
      data-testid="input-label"
      className="block absolute z-10 top-4 left-4 text-xs font-medium text-gray-400"
    >
      {label}
    </label>
    <input
      id="input"
      type="number"
      value={value}
      placeholder="0"
      onChange={onChange}
      data-testid="number-input"
      className="block p-4 pl-4 w-full h-[120px] text-white bg-[#1b1b1b] rounded-lg text-4xl font-medium
      placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 placeholder-lg"
    />
  </div>
)
