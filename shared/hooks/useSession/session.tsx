// hooks/useSession.tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useGetUser } from '../api-db'

const useSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [tokenUser, setTokenUser] = useState<string>('')

  const {
    data: dataPass,
    refetch,
    isSuccess,
    isLoading
  } = useGetUser(
    `getUserByPass/${tokenUser}`,
    { enabled: false } // Deshabilita la consulta inicial
  )

  useEffect(() => {
    const checkSession = async () => {
      const authToken = Cookies.get('authToken') // Reemplaza 'authToken' con el nombre de tu cookie
      if (authToken) {
        setTokenUser(authToken)
        setTimeout(async () => {
          await refetch()
            .then(async () => {
              console.log(
                'isLoading ' + isLoading + ' data ' + JSON.stringify(dataPass)
              )

              debugger
              if (
                !Array.isArray(dataPass) &&
                isSuccess &&
                dataPass &&
                dataPass?.password
              ) {
                console.log('Entró a valida login')
                if (dataPass?.password === authToken) {
                  console.log('logueado')
                  setIsLoggedIn(true)
                } else {
                  setIsLoggedIn(false)
                  console.log('no logueado')
                }
              }
            })
            .catch((error) => {
              setIsLoggedIn(false)
              console.error('Error al cargar los datos:', error)
            })
        }, 10)
      } else {
        setIsLoggedIn(false)
        console.log('no logueado')
      }
    }
    // Realiza la validación cuando se carga la página
    checkSession()

    // Realiza la validación cada 15 minutos (ajusta el tiempo según tus necesidades)
    const intervalId = setInterval(checkSession, 15 * 60 * 1000)

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId)
  }, [])

  return { isLoggedIn }
}

export default useSession
