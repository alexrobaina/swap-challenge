import { ChangeEvent, FC, ReactElement } from 'react'

import './baseInput.css'
interface Props {
  name?: string
  type?: string
  error?: string
  label?: string
  isdisabled?: boolean
  placeholder: string
  value?: string | number
  iconLeft?: ReactElement
  IconRight?: ReactElement
  handleChange?: (value: ChangeEvent<HTMLInputElement>) => void
}

export const BaseInput: FC<Props> = (
  {
    name,
    value,
    label,
    error,
    iconLeft,
    IconRight,
    isdisabled,
    placeholder,
    handleChange,
    type = 'text',
  },
  props,
) => {
  return (
    <div className="relative w-full">
      {label && (
        <label
          data-testid="input-label"
          className="block text-sm font-medium leading-6 text-primary-50"
        >
          {label}
        </label>
      )}
      <input
        {...props}
        type={type}
        name={name}
        value={value}
        disabled={isdisabled}
        onChange={handleChange}
        data-testid="text-input"
        placeholder={placeholder}
        className={`${
          error && 'ring-red-500'
        } block w-full rounded-[4px] border-0 py-1.5 text-primary-100 ring-1 ring-inset ring-primary-900 outline-none bg-background-800
               ${
                 iconLeft && 'pl-9'
               }  placeholder:text-neutral-500 placeholder:text-sm eight: '20px', focus:ring-primary-300 sm:text-sm sm:leading-6 pl-3`}
      />
      {iconLeft && (
        <div data-testid="icon-left" className="icon absolute -mt-7 ml-2.5">
          {iconLeft}
        </div>
      )}
      {IconRight && (
        <div data-testid="icon-right" className="icon absolute">
          {IconRight}
        </div>
      )}
      {error && (
        <div
          data-testid="error-message"
          className="pointer-events-none absolute right-0 top-8 flex items-center pr-3"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
