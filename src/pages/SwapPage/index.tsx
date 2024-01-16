import { FC, useEffect, ChangeEvent, useState, useContext } from 'react'

import { BaseButton } from '../../components/common/BaseButton'
import { useCalculateUsdValue } from '../../hooks/useCalculateUsdValue'
import { useGetTokens } from '../../hooks/useGetTokens'
import { useSendTransaction } from '../../hooks/useSendTrasaction'
import { useSwap } from '../../hooks/useSwap'
import { AppContext } from '../../services/AppContext'

import { ConnectWalletModal } from './components/ConnectWalletModal'
import { Form } from './components/Form'
import { Header } from './components/Header/Header'

interface Option {
  id: string
  img: string
  label: string
}

export const SwapPage: FC = () => {
  const context = useContext(AppContext)
  const { mutate, isLoading } = useSendTransaction()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    pricePerCoin: fromPricePerCoinUSD,
    calculateUsdValue: calculateUsdValueFrom,
  } = useCalculateUsdValue()
  const {
    pricePerCoin: toPricePerCoinUSD,
    calculateUsdValue: calculateUsdValueTo,
  } = useCalculateUsdValue()
  const { data } = useGetTokens()
  const {
    toAmount,
    fromAmount,
    setToAmount,
    setLastEdited,
    setFromAmount,
    selectedCoinTo,
    selectedCoinFrom,
    setSelectedCoinTo,
    setSelectedCoinFrom,
  } = useSwap({
    id: 'ethereum',
    img: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32%402x/color/eth%402x.png',
    label: 'ETH',
  } as Option)

  useEffect(() => {
    setTimeout(() => {
      if (selectedCoinFrom.id) {
        calculateUsdValueFrom(selectedCoinFrom.id, fromAmount || 0)
      }

      if (selectedCoinTo?.id) {
        calculateUsdValueTo(selectedCoinTo.id, toAmount || 0)
      }
    }, 1000)
  }, [toAmount, fromAmount, selectedCoinTo, selectedCoinFrom])

  const handleFromAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFromAmount(e.target.value as unknown as number)
    setLastEdited('from')
  }

  const handleToAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToAmount(e.target.value as unknown as number)
    setLastEdited('to')
  }

  const handleSubmit = () => {
    if (!context?.wallet?.address) setIsModalOpen(true)
    mutate({
      address: context?.wallet?.address,
      fromCoinId: selectedCoinFrom.id || '',
      toCoinId: selectedCoinTo?.id || '',
      fromAmount,
      toAmount,
    })
  }

  const setNameButton = (address: string) => {
    if (address) return 'Send'

    return 'Connect wallet'
  }

  return (
    <div data-testid="swap-component" className="flex justify-center">
      {context?.wallet?.address && (
        <div
          data-testid="address"
          className="absolute top-3 z-40 right-10 bg-primary-500 text-background-800 rounded-3xl px-3 py-2 flex items-center justify-center text-sm"
        >
          {context?.wallet?.address}
        </div>
      )}
      <div className="z-10 flex min-h-full flex-col justify-center py-8">
        <div className="bg-[#131313] w-[480px] border-[#7d45d847] border-[1px] rounded-lg flex flex-col items-center justify-center shadow-3xl sm:rounded-[24px] p-2">
          <Header />
          <Form
            coinOptions={data}
            toAmount={toAmount}
            fromAmount={fromAmount}
            selectedCoinTo={selectedCoinTo}
            selectedCoinFrom={selectedCoinFrom}
            toPricePerCoinUSD={toPricePerCoinUSD}
            setSelectedCoinTo={setSelectedCoinTo}
            fromPricePerCoinUSD={fromPricePerCoinUSD}
            setSelectedCoinFrom={setSelectedCoinFrom}
            handleToAmountChange={handleToAmountChange}
            handleFromAmountChange={handleFromAmountChange}
          />

          {isLoading && (
            <div
              data-testid="send-transaction-loading"
              className="mt-1 w-full ring-1 ring-gray-800 rounded-lg h-12"
            >
              <div className="flex ml-3 items-center h-full text-gray-400 text-sm">
                Send transaction...
              </div>
            </div>
          )}

          <div className="mt-2 w-full">
            <BaseButton
              style="primary"
              height="h-[55px]"
              testId="send-button"
              className="w-[300px]"
              onClick={handleSubmit}
              text={setNameButton(context?.wallet?.address || '')}
            />
          </div>
        </div>
      </div>
      <ConnectWalletModal
        isOpen={isModalOpen}
        handleCloseModal={() => setIsModalOpen(false)}
      />
    </div>
  )
}
