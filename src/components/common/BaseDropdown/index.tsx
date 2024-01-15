import { FC, useState, useRef, useEffect } from 'react'

import { IconChevronDown } from '../../../assets/icons'

interface Option {
  id: string
  img: string
  label: string
}

interface BaseDropdownProps {
  placeholder?: string
  selectedOption?: Option
  options: Array<Option>
  onSelect: (option: Option) => void
}

export const BaseDropdown: FC<BaseDropdownProps> = ({
  options,
  onSelect,
  selectedOption,
  placeholder = 'Select option',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleSelect = (option?: Option) => {
    option && onSelect(option)
    setIsOpen(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <button
        data-testid="dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
        className={`z-0 flex items-center justify-between py-[2px] 
        ${
          selectedOption
            ? 'bg-background-800 pl-1 pr-2 ring-1 ring-gray-800 '
            : 'bg-primary-500 px-3'
        }
        rounded-3xl text-white focus:outline-none focus:ring`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {selectedOption ? (
          <div className="flex items-center gap-2 ">
            {selectedOption.img && (
              <img
                src={selectedOption.img}
                alt={selectedOption.label}
                className="w-6 h-6 rounded-full bg-white"
              />
            )}
            <span>{selectedOption.label}</span>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <IconChevronDown width={20} stroke="white" />
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <span className="text-md font-semibold">{placeholder}</span>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <IconChevronDown width={20} stroke="white" />
          </div>
        )}
      </button>
      <div className="z-80" ref={dropdownRef} data-testid="dropdown-content">
        {isOpen && (
          <ul
            data-testid="dropdown-options"
            className="absolute left-0 mt-4 w-full flex flex-col rounded-md shadow-2xl bg-background-800 "
          >
            {options &&
              options.map(
                (option: { id: string; img?: string; label: string }) => (
                  <li
                    role="option"
                    key={option.id}
                    data-testid={`dropdown-option-${option.id}`}
                    onClick={() => handleSelect(option as Option)}
                    className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  >
                    {option.img && (
                      <img
                        src={option.img}
                        alt={option.label}
                        className="w-6 h-6 rounded-full mr-2 bg-white"
                      />
                    )}
                    <span className="flex-1 text-white">{option.label}</span>
                  </li>
                ),
              )}
          </ul>
        )}
      </div>
    </>
  )
}
