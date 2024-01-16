import { useFormik } from 'formik'
import { action } from 'mobx'
import { FC, useContext } from 'react'
import * as Yup from 'yup'

import { BaseButton } from '../../../../components/common/BaseButton'
import { BaseInput } from '../../../../components/common/BaseInput'
import { ReactModal } from '../../../../components/common/ReactModal'
import { AppContext, AppContextProps } from '../../../../services/AppContext'

interface Props {
  isOpen: boolean
  handleCloseModal: () => void
}

export const ConnectWalletModal: FC<Props> = ({ handleCloseModal, isOpen }) => {
  const context = useContext(AppContext)

  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/

  const setAddress = action((context: AppContextProps, address: string) => {
    context.wallet = { address }
  })

  const formik = useFormik({
    validationSchema: Yup.object({
      address: Yup.string()
        .matches(ethAddressRegex, 'Invalid Ethereum address')
        .required('Ethereum address is required'),
    }),
    initialValues: {
      address: '',
    },
    validateOnChange: false,
    onSubmit: async (values) => {
      setAddress(context, values.address)
      handleCloseModal()
    },
  })

  const { values, errors, handleChange, handleSubmit } = formik

  return (
    <ReactModal isOpen={isOpen} closeModal={handleCloseModal}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col"
        data-testid="connect-wallet-modal"
      >
        <h1 className="text-2xl font-medium text-primary-50 col-span-full">
          Connect your wallet
        </h1>
        <div className="flex flex-col gap-3">
          <div className="flex mt-4 text-sm text-gray-400">
            This is only for use MOBX and simple validation with Formik, please
            add a ERC20 adddress.
          </div>
          <div>
            <BaseInput
              name="address"
              label="Address"
              value={values.address}
              error={errors.address}
              placeholder="0x5F2913..."
              handleChange={handleChange}
            />
          </div>
          <div className="mt-5">
            <BaseButton type="submit" text="Connect" />
          </div>
        </div>
      </form>
    </ReactModal>
  )
}
