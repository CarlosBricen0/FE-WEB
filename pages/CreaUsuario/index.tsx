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
import { useRef, useState } from 'react'
import { useGetUserLogin, usePostDataToApi } from '../../shared/hooks/api-db'
import { IUser } from '@/shared/interfaces/API-DB/IUsers'

const CreaUsuario = () => {
  const inputUser = useRef<HTMLInputElement>(null)
  const inputPassword = useRef<HTMLInputElement>(null)
  const [nameCreateUser , setCreateUser] = useState<IUser>() 
  const { data, isLoading, error, isSuccess } = usePostDataToApi(
    `createUser/${nameCreateUser}`
  )


  const creaUsuarioMongo = async (usuario: string, password: string) => {
    console.log(`ingreso a la función`)
    const passwordEncrypted:string = '1234';//await encryptPass(password)
    debugger
    setCreateUser({user:usuario,password:passwordEncrypted})
    

    /*setNameUser(usuario)
    if(data?.password == password){
      console.log(`Conexión de usuario exitosa`)
    }else{
      console.log(`Usuario o Contraseña invalidos`)
    }*/
    /*debugger
    const hashedPassword = await encryptPass(password)
    debugger*/
    /*console.log(
      `conexion a la db usuario : ${usuario} password: ${hashedPassword}`
    )*/
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
                label='Crear'
                background='rgb(13, 33, 89)'
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
export default CreaUsuario
