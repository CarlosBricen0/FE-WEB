import { encryptPass } from '../../shared/helpers/encryptPass/encrypt'
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
import { BigScreen, } from 'components-front-end/helpers'
import { useRef, useState } from 'react'
import { useGetUser, usePostUser } from '../../shared/hooks/api-db'
import { useTooltipFeedback } from '../../components/TooltipFeedback/hook/useTooltipFeedback'

export type typeMessage = 'success' | 'error' | 'warning' | 'info'
const CrearUsuario = () => {

  const inputUser = useRef<HTMLInputElement>(null)
  const inputPassword = useRef<HTMLInputElement>(null)
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>('disabled')
  const [nameUser, setNameUser] = useState<string>('')
  const { setNotificacionUser, setNotificacionUserType, setNotificacionUserText, TooltipMessage } = useTooltipFeedback()


  const { mutate: mustateCreateUser } = usePostUser('createUser')
  const { isSuccess: isSuccesGetUser, refetch: refetchGetUser } = useGetUser(
    `getUserByName/${nameUser}`,
    { enabled: false } // Deshabilita la consulta inicial
  )

  const creaUsuarioMongo = async (usuario: string, password: string) => {
    setNameUser(usuario);
    try {
      setButtonStatus('loading');
      const passwordEncrypted: string = await encryptPass(password);
      const response = await refetchGetUser();

      if (!Array.isArray(response?.data) && response?.data?.user !== usuario) {
        mustateCreateUser({ user: usuario, password: passwordEncrypted }, {
          onSuccess: () => {
            setNotificacionUserType('success');
            setNotificacionUserText('Usuario creado correctamente');
            setNotificacionUser(true);
            setButtonStatus('disabled');
          },
          onError: () => {
            setNotificacionUserType('error');
            setNotificacionUserText('Error al crear el usuario');
            setNotificacionUser(true);
            setButtonStatus('initial');
          }
        });
      } else {
        setNotificacionUserType('error');
        setNotificacionUserText('Usuario ya existe, favor pruebe con otro nombre');
        setNotificacionUser(true);
        setButtonStatus('initial');
      }
    } catch (error) {
      // Manejar los errores aquí
      console.error('Error en refetchGetUser:', error);
      setNotificacionUserType('error');
      setNotificacionUserText('Error al procesar la solicitud');
      setNotificacionUser(true);
      setButtonStatus('initial');
    }
  };


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
                  autoFocus
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
                status={buttonStatus}
                color='white'
                label='Crear'
                background={buttonStatus === 'initial' ? 'blue' : 'gray'}
                onClick={() => {
                  creaUsuarioMongo(
                    inputUser?.current?.value || '',
                    inputPassword?.current?.value || ''
                  )
                }}
              />
            </Row>
          </Container>
        </>
      </BigScreen>
    </Container >
  )
}
export default CrearUsuario
