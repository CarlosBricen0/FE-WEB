import { encryptPass } from '../../shared/helpers/encryptPass/encrypt'
import {
  Button,
  Column,
  Container,
  Input,
  Row,
  Spacer,
  Text
} from 'components-front-end'
import { BigScreen } from 'components-front-end/helpers'
import { useEffect, useRef, useState } from 'react'
import { useGetUser, usePostUser } from '../../shared/hooks/api-db'

const Login = () => {
  const inputUser = useRef<HTMLInputElement>(null)
  const inputPassword = useRef<HTMLInputElement>(null)
  const [nameUser, setNameUser] = useState<string>('')
  const { data, refetch } = useGetUser(
    `getUserByName/${nameUser}`,
    { enabled: false } // Deshabilita la consulta inicial
  )

  const loginMongo = async (user: string, password: string) => {
    setNameUser(user)
    await refetch()
      .then(() => {
        if (!Array.isArray(data) && data?.password == password) {
          console.log(`Conexión de usuario exitosa`)
        } else {
          console.log(`Usuario o Contraseña invalidos`)
        }
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error)
      })
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
                color='white'
                label='Acceder'
                background='rgb(13, 33, 89)'
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
