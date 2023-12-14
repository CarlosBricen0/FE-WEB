import { IResponseUser, IResponseUsers, IUser } from '@/shared/interfaces/API-DB/IUsers'
import axios, { AxiosInstance, AxiosResponse } from 'axios'

// Creamos una instancia de Axios con la URL base configurada
const httpClientMongo: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API_DB
})

const uriBase = 'api/user/'

// Función para invocar una petición GET a la API con la ruta proporcionada
export const methoGets = async (apiPath: string): Promise<IResponseUsers> => {
  const response: AxiosResponse<IResponseUsers> = await httpClientMongo.get(
    uriBase + apiPath
  )
  return response.data // Devolvemos directamente los datos sin incluir la AxiosResponse
}
export const methoGet = async (apiPath: string): Promise<IResponseUser> => {
  const response: AxiosResponse<IResponseUser> = await httpClientMongo.get(
    uriBase + apiPath
  )
  return response.data // Devolvemos directamente los datos sin incluir la AxiosResponse
}

// Función para invocar una petición POST a la API con los datos proporcionados
export const createUser = async (apiPath:string,userData: IUser): Promise<IUser> => {
  const response: IUser = await httpClientMongo.post(apiPath, userData);
  return response;
};
/*

// Función para invocar una petición PUT a la API con los datos proporcionados
export const updateUser = async (userId: number, userData: UserInputData): Promise<AxiosResponse<UserData>> => {
  const response: AxiosResponse<UserData> = await httpClient.put(`/users/${userId}`, userData);
  return response;
};

// Función para invocar una petición DELETE a la API con el ID proporcionado
export const deleteUser = async (userId: number): Promise<void> => {
  await httpClient.delete(`/users/${userId}`); */
