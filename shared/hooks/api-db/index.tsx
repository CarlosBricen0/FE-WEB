import {
  IResponseUsers,
  IResponseUser
} from '../../../shared/interfaces/API-DB/IUsers'
import { methoGet } from '../../../shared/services/api-db'
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryFunction
} from 'react-query'

// Hook personalizado utilizando react-query para una petición GET
export const useGetUsers = (
  apiPath: string,
  options?: UseQueryOptions<IResponseUsers, Error>
): UseQueryResult<IResponseUsers, Error> => {
  const queryFn: QueryFunction<IResponseUsers> = () => methoGet(apiPath)
  return useQuery<IResponseUsers, Error>(apiPath, queryFn, options)
}
//return only 1 user
export const useGetUser = (
  apiPath: string,
  options?: UseQueryOptions<IResponseUser, Error>
): UseQueryResult<IResponseUser, Error> => {
  const queryFn: QueryFunction<IResponseUser> = () => methoGet(apiPath)
  return useQuery<IResponseUser, Error>(apiPath, queryFn, options)
}
