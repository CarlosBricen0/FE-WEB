import { useGetUsers } from '../../shared/hooks/api-db'
import { Container, Text } from 'components-front-end'
import React from 'react'

export const HomeWeb = (): React.ReactElement => {
  const { data, isLoading, error, isSuccess } = useGetUsers('listUser')
  if (isLoading) {
    return <>Está cargando ctm</>
  }
  if (error) {
    return <>existe un problema en el sitio recargue</>
  }
  return (
    <Container
      isWrap
      minHeight='1000px'
      height='1000px'
    >
      {data?.map((user, index) => {
        return (
          <React.Fragment key={`key-${index}`}>
            <Container isWrap>
              <Text
                fontSize='lg'
                color='primary-green'
              >
                Usuario: {user?.user}
              </Text>
              <Text
                fontSize='lg'
                color='primary-green'
              >
                Contraseña: {user?.password}
              </Text>
            </Container>
          </React.Fragment>
        )
      })}
    </Container>
  )
}
