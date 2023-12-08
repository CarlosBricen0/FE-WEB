import {
  BigScreen,
  getGlobalStyle,
  SmallScreen
} from 'components-front-end/helpers'
import { Container } from 'components-front-end'
import { BaseHeader } from './BaseHeader'

export const Header = (): React.ReactElement => {
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
        <BaseHeader
          fontSizeBUtton='16px'
          widthButtons='100px'
        />
      </BigScreen>
      <SmallScreen>
        <>
          <BaseHeader
            fontSizeBUtton='8px'
            widthButtons='60px'
          />
        </>
      </SmallScreen>
    </Container>
  )
}
