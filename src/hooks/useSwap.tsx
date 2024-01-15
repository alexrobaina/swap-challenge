// useSwap.ts
import { useState, useEffect, useCallback } from 'react'

import { getPrices } from '../api/gePrices'

interface Option {
  id: string
  img: string
  label: string
}

interface UseSwapHook {
  selectedCoinFrom: Option
  toAmount: number | undefined
  fromAmount: number | undefined
  selectedCoinTo: Option | undefined
  setToAmount: (amount: number) => void
  calculateToAmount: () => Promise<void>
  setFromAmount: (amount: number) => void
  setSelectedCoinTo: (coin: Option) => void
  setSelectedCoinFrom: (coin: Option) => void
  setLastEdited: (lastEdited: 'from' | 'to') => void
}

export const useSwap = (
  initialCoinFrom: Option,
  initialCoinTo?: Option | undefined,
): UseSwapHook => {
  const [lasEdited, setLastEdited] = useState<'from' | 'to'>()
  const [fromAmount, setFromAmount] = useState<number | undefined>()
  const [toAmount, setToAmount] = useState<number | undefined>()
  const [selectedCoinFrom, setSelectedCoinFrom] =
    useState<Option>(initialCoinFrom)
  const [selectedCoinTo, setSelectedCoinTo] = useState<Option | undefined>(
    initialCoinTo,
  )

  const calculateToAmount = useCallback(async () => {
    if (selectedCoinFrom && selectedCoinTo && fromAmount) {
      const { payCoinPrice, receiveCoinPrice } =
        (await getPrices({
          payCoin: selectedCoinFrom.id,
          receiveCoin: selectedCoinTo.id,
        })) || {}

      if (payCoinPrice && receiveCoinPrice) {
        const newToAmount = (fromAmount * payCoinPrice) / receiveCoinPrice
        const roundedToAmount = Math.round(newToAmount * 10000) / 10000
        setToAmount(roundedToAmount)
      }
    }
  }, [fromAmount, selectedCoinFrom, selectedCoinTo])

  const calculateFromAmount = useCallback(async () => {
    if (selectedCoinFrom && selectedCoinTo && toAmount) {
      const { payCoinPrice, receiveCoinPrice } =
        (await getPrices({
          payCoin: selectedCoinFrom.id,
          receiveCoin: selectedCoinTo.id,
        })) || {}

      if (payCoinPrice && receiveCoinPrice) {
        const newFromAmount = (toAmount * receiveCoinPrice) / payCoinPrice
        const roundedFromAmount = Math.round(newFromAmount * 10000) / 10000
        setFromAmount(roundedFromAmount)
      }
    }
  }, [toAmount, selectedCoinFrom, selectedCoinTo])

  useEffect(() => {
    if (lasEdited === 'from') calculateToAmount()
  }, [
    lasEdited,
    fromAmount,
    selectedCoinTo,
    selectedCoinFrom,
    calculateToAmount,
  ])

  useEffect(() => {
    if (lasEdited === 'to') calculateFromAmount()
  }, [
    toAmount,
    lasEdited,
    selectedCoinTo,
    selectedCoinFrom,
    calculateFromAmount,
  ])

  return {
    toAmount,
    fromAmount,
    setToAmount,
    setFromAmount,
    setLastEdited,
    selectedCoinTo,
    selectedCoinFrom,
    setSelectedCoinTo,
    calculateToAmount,
    setSelectedCoinFrom,
  }
}
