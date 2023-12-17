import { useGetUser } from '../../shared/hooks/api-db'
import { Container, Spacer, Text } from 'components-front-end'
import React from 'react'
import { IUser } from '@/shared/interfaces/API-DB/IUsers'

export const HomeWeb = (): React.ReactElement => {
  const { data, isLoading, error } = useGetUser('listUser', {
    enabled: false //petición cancelada
  })
  if (isLoading) {
    return <>Está cargando ctm</>
  }
  if (error) {
    return <>existe un problema en el sitio recargue</>
  }
  return (
    <Container
      isWrap
      minHeight='auto'
    >
      {Array.isArray(data) &&
        data.length > 0 &&
        data?.map((user: IUser, index: number) => {
          return (
            <React.Fragment key={`key-${index}`}>
              <Container
                isWrap
                height='100px'
              >
                <Text
                  fontSize='lg'
                  color='primary-green'
                >
                  Usuario: {user?.user}
                </Text>
                <Spacer.Vertical size={24} />
                <Text
                  fontSize='lg'
                  color='primary-green'
                >
                  Contraseña: {user?.password}
                </Text>
              </Container>
              <Spacer.Horizontal size={24} />
            </React.Fragment>
          )
        })}
    </Container>
  )
}
