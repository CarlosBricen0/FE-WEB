import { IResponseUser } from '@/shared/interfaces/API-DB/IUsers'
import axios, { AxiosInstance, AxiosResponse } from 'axios'

// Creamos una instancia de Axios con la URL base configurada
const httpClientMongo: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API_DB
})

// Función para invocar una petición GET a la API con la ruta proporcionada
export const methoGet = async (apiPath: string): Promise<IResponseUser> => {
  const response: AxiosResponse<IResponseUser> =
    await httpClientMongo.get(apiPath)
  return response.data // Devolvemos directamente los datos sin incluir la AxiosResponse
}
