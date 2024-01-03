import { decryptPass } from '../../shared/helpers/encryptPass/encrypt'
import {
  Button,
  ButtonStatus,
  Column,
  Container,
  Input,
  Row,
  Spacer,
  Text
} from 'components-front-end'
import { BigScreen } from 'components-front-end/helpers'
import { useRef, useState } from 'react'
import { useGetUser } from '../../shared/hooks/api-db'
import { setCookie } from '../../shared/helpers/cookie/cookie'
import { TWENTY_FOUR_HOURS_MILLI_SECONDS } from '../../shared/constants'
import router from 'next/router'
import { useTooltipFeedback } from '../../components/TooltipFeedback/hook/useTooltipFeedback'

const Login = () => {
  const inputUser = useRef<HTMLInputElement>(null)
  const inputPassword = useRef<HTMLInputElement>(null)
  const [nameUser, setNameUser] = useState<string>('')
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>('disabled')
  const { setNotificacionUser, setNotificacionUserType, setNotificacionUserText, TooltipMessage } = useTooltipFeedback()


  const { refetch } = useGetUser(
    `getUserByName/${nameUser}`,
    { enabled: false } // Deshabilita la consulta inicial
  )

  const loginMongo = async (user: string, password: string) => {
    setNameUser(user)
    setButtonStatus('loading')
    setTimeout(async () => {
      try {
        const response = await refetch()

        if (!Array.isArray(response?.data) && response?.data?.password) {
          const isMatchPassWord = await decryptPass(password, response?.data?.password)
          if (isMatchPassWord) {
            setCookie(
              'authToken',
              response?.data?.password,
              TWENTY_FOUR_HOURS_MILLI_SECONDS
            )

            console.log(`Usuario ingresó correctamente`)
            setNotificacionUserType('success');
            setNotificacionUserText('Usuario Ingresó correctamente');
            setNotificacionUser(true);
            setButtonStatus('disabled')
            router.push('/')
          } else {

            console.log(`Usuario o Contraseña incorrectos`)
            setNotificacionUserType('error');
            setNotificacionUserText('Usuario o Contraseña incorrectos');
            setNotificacionUser(true);
            setButtonStatus('initial')

          }
        } else {

          console.log(`Usuario o Contraseña incorrectos`)
          setNotificacionUserType('error');
          setNotificacionUserText('Usuario o Contraseña incorrectos');
          setNotificacionUser(true);
          setButtonStatus('initial')
        }
      } catch (error) {

        console.error('Error al cargar los datos:', error)
        setNotificacionUserType('error');
        setNotificacionUserText('Conexión de usuario erronea');
        setNotificacionUser(true);
        setButtonStatus('initial')
      }

    }, 10)
  }

  const validateFields = (): boolean => {
    const userValue = inputUser?.current?.value || '';
    const passwordValue = inputPassword?.current?.value || '';
    return userValue.length > 0 && passwordValue.length > 0;
  };

  const handleButtonStatus = () => {
    const isFieldsValid = validateFields();
    setButtonStatus(isFieldsValid ? 'initial' : 'disabled');
  }

  return (
    <Container
      backgroundColor='white'
      isWrap
      padding='10px'
    >
      <BigScreen>
        <>
          <TooltipMessage />
          <Container
            isWrap
            width='50%'
            alignItems='center'
            alignSelf='center'
            margin='10px auto'
            border='2px solid black'
            padding='10px'
          >
            <Row alignItems='start'>
              <Column alignItems='center'>
                <Text>Usuario</Text>
              </Column>
              <Spacer.Vertical size={12} />
              <Column alignItems='center'>
                <Text>Password</Text>
              </Column>
            </Row>
            <Row alignItems='start'>
              <Column
                border='1px solid black'
                borderRadius='5px'
              >
                <Input
                  ref={inputUser}
                  width='100%'
                  borderRadius='5px'
                  placeholder='Usuario'
                  textAlign='center'
                  onChange={() => {
                    handleButtonStatus()
                  }}
                />
              </Column>
              <Spacer.Vertical size={12} />
              <Column
                border='1px solid black'
                borderRadius='5px'
              >
                <Input
                  ref={inputPassword}
                  width='100%'
                  borderRadius='5px'
                  placeholder='Password'
                  textAlign='center'
                  type='password'
                  onChange={() => {
                    handleButtonStatus()
                  }}
                />
              </Column>
            </Row>
            <Spacer.Horizontal size={24} />
            <Row justifyContent='end'>
              <Button
                background={buttonStatus === 'initial' ? 'blue' : 'gray'}
                color='white'
                label='Ingresar'
                status={buttonStatus}
                onClick={() => {
                  loginMongo(
                    inputUser?.current?.value || '',
                    inputPassword?.current?.value || ''
                  )
                }}
              />
            </Row>
          </Container>
        </>
      </BigScreen>
    </Container>
  )
}

export default Login
