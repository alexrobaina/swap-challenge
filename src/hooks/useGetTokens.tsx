import { useQuery } from 'react-query'

import { getTokens } from '../api/getTokens'

export const useGetTokens = () => {
  const { data, error, isLoading } = useQuery(['tokens'], getTokens)

  return { data, error, isLoading }
}
