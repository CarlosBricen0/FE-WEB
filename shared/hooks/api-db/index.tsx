import {
  IResponseUsers,
  IResponseUser,
  IUser
} from '../../../shared/interfaces/API-DB/IUsers'
import { createUser, methoGet, methoGets } from '../../../shared/services/api-db'
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryFunction,
  UseMutationResult,
  UseMutationOptions,
  useMutation
} from 'react-query'

// Hook personalizado utilizando react-query para una petición GET
export const useGetUsers = (
  apiPath: string,
  options?: UseQueryOptions<IResponseUsers, Error>
): UseQueryResult<IResponseUsers, Error> => {
  const queryFn: QueryFunction<IResponseUsers> = () => methoGets(apiPath)
  return useQuery<IResponseUsers, Error>(apiPath, queryFn, options)
}
//return only 1 user
export const useGetUserLogin = (
  apiPath: string,
  options?: UseQueryOptions<IResponseUser, Error>
): UseQueryResult<IResponseUser, Error> => {
  const queryFn: QueryFunction<IResponseUser> = () => methoGet(apiPath)
  return useQuery<IResponseUser, Error>(apiPath, queryFn, options)
}


export const usePostDataToApi = (
  apiPath: string,
  options?: UseMutationOptions<IResponseUser, Error, IUser>
): UseMutationResult<IResponseUser, Error, IUser> => {
  return useMutation<IResponseUser, Error, IUser>((userData: IUser) => createUser(apiPath, userData), options);
}; 

