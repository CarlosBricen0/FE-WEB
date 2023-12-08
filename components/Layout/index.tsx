import { Column, Container, Row, Spacer } from 'components-front-end'
import { Header, Footer } from './../'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps): React.ReactElement => {
  return (
    <Container isWrap>
      <Header />
      <Spacer.Horizontal size={24} />
      <Container
        customHeight={'68vh'}
        margin='0 5%'
      >
        {children}
      </Container>

      <Spacer.Horizontal size={24} />
      <Column style={{ opacity: 0.1, border: '1px solid gray' }}>
        <Spacer.Horizontal
          size={1}
          backgroundColor='gray'
        />
      </Column>

      <Footer />
    </Container>
  )
}
