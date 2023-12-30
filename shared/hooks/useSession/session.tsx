import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useGetUser } from '../api-db';

const useSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authToken = Cookies.get('authToken');
  const router = useRouter();

  const { refetch } = useGetUser(
    `getUserByPass/${authToken}`,
    { enabled: !!authToken } // Activa la consulta si authToken existe
  );

  useEffect(() => {
    const checkSession = async () => {
      if (authToken) {
        try {
          const response = await refetch()

          if (!Array.isArray(response?.data) && response?.data?.password === authToken) {

            console.log('logueado correctamente')
            setIsLoggedIn(true);
          } else {

            setIsLoggedIn(false);
            console.log('cookie incorrecta')
            router.push('Login');
          }
        } catch (error) {

          setIsLoggedIn(false);
          router.push('Login');
          console.log('error en la peticion')
        }
      } else {

        setIsLoggedIn(false);
        router.push('Login');
        console.log('cookie no existe')
      }
    };

    checkSession();
    const intervalId = setInterval(checkSession, 15 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [authToken]);

  return { isLoggedIn };
};

export default useSession;
