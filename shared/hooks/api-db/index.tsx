import { IUser } from '../../../shared/interfaces/API-DB/IUsers'
import { methodPostUser, methoGetUser } from '../../../shared/services/api-db'
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryFunction,
  UseMutationResult,
  UseMutationOptions,
  useMutation
} from 'react-query'
import { AxiosResponse } from 'axios'

// Hook personalizado utilizando react-query para una petición GET
export const useGetUser = (
  apiPath: string,
  options?: UseQueryOptions<IUser[] | IUser, Error>
): UseQueryResult<IUser[] | IUser, Error> => {
  const queryFn: QueryFunction<IUser[] | IUser> = () => methoGetUser(apiPath)
  return useQuery<IUser[] | IUser, Error>(apiPath, queryFn, options)
}

export const usePostUser = (
  apiPath: string,
  options?: UseMutationOptions<IUser, Error, IUser>
): UseMutationResult<IUser, Error, IUser> => {
  return useMutation<IUser, Error, IUser>(
    (userData: IUser) => methodPostUser(apiPath, userData),
    options
  )
}
