import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { sendTrasaction } from '../api/sendTransaction'

export const useSendTransaction = () => {
  const { mutate, isLoading } = useMutation(sendTrasaction, {
    onSuccess: async () => {
      toast.success('Transaction sent!')
    },
    onError: (error: unknown) => {
      toast.error('🙈 Something is wrong!')
      console.log(error)
    },
  })

  return { mutate, isLoading }
}
