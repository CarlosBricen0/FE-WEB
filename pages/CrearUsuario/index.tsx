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
import { BigScreen } from 'components-front-end/helpers'
import { useRef, useState } from 'react'
import { usePostUser } from '../../shared/hooks/api-db'

export const handleKeyEnterUser = (
  usuario: string,
  password: string,
  setButtonStatus: (statusButton: ButtonStatus) => void
) => {
  debugger
  if (usuario.length > 0 && password.length > 0) {
    setButtonStatus('initial')
  } else {
    setButtonStatus('disabled')
  }
}

const CrearUsuario = () => {
  const inputUser = useRef<HTMLInputElement>(null)
  const inputPassword = useRef<HTMLInputElement>(null)
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>('disabled')
  const { mutate, data, isLoading, isError, error, isSuccess } =
    usePostUser('createUser')

  const creaUsuarioMongo = async (usuario: string, password: string) => {
    setButtonStatus('loading')
    console.log(`ingreso a la función`)
    const passwordEncrypted: string = await encryptPass(password)
    mutate({ user: usuario, password: passwordEncrypted })

    if (isSuccess) {
      console.log('Usuario creado correctamente ')
    }
    setButtonStatus('initial')
  }

  return (
    <Container
      backgroundColor='white'
      isWrap
      padding='10px'
    >
      <BigScreen>
        <>
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
                />
              </Column>
            </Row>
            <Spacer.Horizontal size={24} />
            <Row justifyContent='end'>
              <Button
                status={buttonStatus}
                color='white'
                label='Crear'
                background={
                  buttonStatus === 'disabled' ? 'gray' : 'rgb(13, 33, 89)'
                }
                onChange={() => {
                  handleKeyEnterUser(
                    inputUser?.current?.value || '',
                    inputPassword?.current?.value || '',
                    setButtonStatus
                  )
                }}
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
    </Container>
  )
}
export default CrearUsuario
