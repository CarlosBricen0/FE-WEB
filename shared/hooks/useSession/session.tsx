import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useGetUser } from '../api-db';
import { useTooltipFeedback } from '../../../components/TooltipFeedback/hook/useTooltipFeedback';

const useSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setNotificacionUser, setNotificacionUserType, setNotificacionUserText, TooltipMessage } = useTooltipFeedback()
  const authToken = Cookies.get('authToken');
  const router = useRouter();
  const notValidateLoginPath = ['']
  const isNotValidateLoginPath = notValidateLoginPath.includes(router.pathname)

  const { refetch } = useGetUser(
    `getUserByPass/${authToken}`,
    { enabled: !!authToken } // Activa la consulta si authToken existe
  );

  useEffect(() => {
    const checkSession = async () => {
      if (isNotValidateLoginPath) {
        return
      }
      if (authToken) {
        try {
          const response = await refetch()

          if (!Array.isArray(response?.data) && response?.data?.password === authToken) {
            console.log('logueado correctamente')
            setIsLoggedIn(true);
          } else {
            setNotificacionUserType('error');
            setNotificacionUserText('Favor iniciar sesion');
            setNotificacionUser(true);
            setIsLoggedIn(false);
            console.log('cookie incorrecta')
            router.push('Login');
          }
        } catch (error) {
          setNotificacionUserType('error');
          setNotificacionUserText('Favor iniciar sesion');
          setNotificacionUser(true);
          setIsLoggedIn(false);
          router.push('Login');
          console.log('error en la peticion')
        }
      } else {
        setNotificacionUserType('error');
        setNotificacionUserText('Favor iniciar sesion');
        setNotificacionUser(true);
        setIsLoggedIn(false);
        router.push('Login');
        console.log('cookie no existe')
      }
    };



    checkSession()

    const intervalId = setInterval(checkSession, 15 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [authToken]);


  return { isLoggedIn, TooltipUserLogin: TooltipMessage };
};

export default useSession;
