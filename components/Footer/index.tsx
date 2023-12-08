import {
  Text,
  Container,
  Row,
  Column,
  Horizontal,
  Picture
} from 'components-front-end'
import { getGlobalStyle } from 'components-front-end/helpers'

export const Footer = (): React.ReactElement => {
  const colorText = 'black'
  return (
    <Container
      isWrap
      backgroundColor='#FFFFFF'
      height='40%'
      width='100%'
      //boxShadow={getGlobalStyle('--box-shadow-2xs')}
      boxShadow={`0px -4px 3px ${getGlobalStyle('--box-shadow-2xs')}`}
    >
      <Row
        margin='50px 10%'
        alignItems='center'
      >
        <Column>
          <Picture
            src='https://colectivos.trescruces.com.uy/files/logo.png'
            width='250px'
            height='60px'
          />
        </Column>
        <Column>
          <Text
            fontSize='xl'
            customColor={colorText}
          >
            Leer Más
          </Text>
        </Column>
        <Column>
          <Text customColor={colorText}>Nosotros</Text>
        </Column>
        <Column>
          <Text customColor={colorText}>Redes sociales</Text>
        </Column>
        <Column>
          <Text customColor={colorText}>Contactanos</Text>
        </Column>
      </Row>
    </Container>
  )
}
