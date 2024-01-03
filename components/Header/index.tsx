import {
  BigScreen,
  getGlobalStyle,
  SmallScreen
} from 'components-front-end/helpers'
import { Container } from 'components-front-end'
import { HeaderLogin } from './HeaderLogin';
import { HeaderLogout } from './HeaderLogout';
import { removeCookie } from '../../shared/helpers/cookie/cookie';
import router from 'next/router';


interface HeaderProps {
  isLoggedIn: boolean;
}
export const Header = ({ isLoggedIn }: HeaderProps): React.ReactElement => {
  const menus = [
    {
      label: 'Usuarios',
      items: [
        {
          label: 'Crear Usuario',
          action: () => router.push(`/CrearUsuario}`),
        },
        {
          label: 'ModificarUsuario',
          action: () => alert('Item 2 clicked'),
        },
      ],
    },
    {
      label: 'Perfil',
      items: [
        {
          label: 'Cerrar Sesion',
          action: () => {
            removeCookie('authToken')
            router.reload()
          },
        },
      ],
    },
  ];

  return (
    <Container
      backgroundColor='#FFFFFF'
      isWrap
      alignSelf='center'
      justifyContent='center'
      alignItems='center'
      padding='auto 10px'
      boxShadow={getGlobalStyle('--box-shadow-2xs')}
    >
      <BigScreen>
        {isLoggedIn ?
          <HeaderLogin
            menus={menus}
            fontSizeBUtton='16px'
            widthButtons='150px'
          /> : <HeaderLogout
            fontSizeBUtton='16px'
            widthButtons='100px'
          />}
      </BigScreen>
      <SmallScreen>
        {isLoggedIn ?
          <HeaderLogin
            menus={menus}
            fontSizeBUtton='8px'
            widthButtons='80px'
          /> : <HeaderLogout
            fontSizeBUtton='8px'
            widthButtons='60px'
          />
        }
      </SmallScreen>
    </Container>
  )
}
