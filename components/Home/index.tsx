import React from 'react'
import { Container, Spacer, Text } from 'components-front-end'
export const HomeWeb = (): React.ReactElement => {

  return (
    <Container
      isWrap
      minHeight='auto'
    >
      <>
        <Container
          isWrap
          height='100px'
        >
          <Text
            fontSize='lg'
            color='primary-green'
          >
            Usuario:
          </Text>
          <Spacer.Vertical size={24} />
          <Text
            fontSize='lg'
            color='primary-green'
          >
            Contraseña:
          </Text>
        </Container>
        <Spacer.Horizontal size={24} />
      </>
    </Container>
  )
}
