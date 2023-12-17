// hooks/useSession.tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useGetUser } from '../api-db'

//Este hook lo que hace es validar el token de sesion cada 15 minutos, esté hook donde se llama desde Layout es ejecutado en todo el sitio para validar si el usuario está logueado.

const useSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [tokenUser, setTokenUser] = useState<string>('')
  const router = useRouter()

  const {
    data: dataPass,
    refetch,
    isSuccess,
    isLoading
  } = useGetUser(
    `getUserByPass/${tokenUser}`,
    { enabled: false } // Deshabilita la consulta inicial
  )
  //Revisen lo que es useEffect , usar chat gpt o google putitos
  useEffect(() => {
    const checkSession = async () => {
      const authToken = Cookies.get('authToken') // Obtenemos la cookie de la sesión  (authToken) // despuesValida si existe el token
      if (authToken) {
        setTokenUser(authToken)
        setTimeout(async () => {
          await refetch()
            .then(async () => {
              console.log(
                'isLoading ' + isLoading + ' data ' + JSON.stringify(dataPass)
              )
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
                  //Aquí si no está logueado podemos forzar el login del usuario redireccionandolo a la página del login, así -> router.push('Login')
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
        //Si no existe es porque el usuario no a iniciado sesion
        setIsLoggedIn(false)
        console.log('no logueado')
      }
    }
    // Realiza la validación cuando se carga la página
    checkSession()

    // Realiza la validación cada 15 minutos
    const intervalId = setInterval(checkSession, 15 * 60 * 1000)

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId)
  }, [])

  return { isLoggedIn }
}

export default useSession
