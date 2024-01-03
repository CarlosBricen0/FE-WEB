import { Button, Column, Container, Picture, Row } from 'components-front-end'
import { useRouter } from 'next/router'
import React from 'react'

interface HeaderLogoutProps {
  widthButtons: string
  fontSizeBUtton: string
}
export const HeaderLogout = ({
  widthButtons,
  fontSizeBUtton
}: HeaderLogoutProps) => {
  const router = useRouter()
  const widthColumnSection = '25'
  const backgroundButtons = '#0d2159'
  const colorTextButtons = 'white'
  const marginColumnButtons = '0px 5px'
  const handlerOnClickButton = (textRedirect: string) => {
    router.push(`/${textRedirect}`)
  }
  return (
    <Container>
      <Row customHeight='80px'>
        <Column
          width='25%'
          height='75px'
          onClick={() => {
            router.push('/')
          }}
        >
          <Picture
            src='https://cdn-icons-png.flaticon.com/512/5988/5988117.png'
            height='80px'
            width='150px'
          />
        </Column>
        {/* <Column margin={marginColumnButtons} customWidth={widthColumnSection}>
        <Button 
            background={backgroundButtons}
            minWidth={widthButtons}
            width={widthButtons}
            fontSize={fontSizeBUtton}
            label='Equipos'
            color={colorTextButtons}
            onClick={()=>{handlerOnClickButton('Teams')}}
            />
        </Column>
        <Column margin={marginColumnButtons} customWidth={widthColumnSection}>
        <Button 
            background={backgroundButtons}
            minWidth={widthButtons}
            width={widthButtons}
            fontSize={fontSizeBUtton}
            label='Jugadores'
            color={colorTextButtons}
            onClick={()=>{handlerOnClickButton('Players')}}
        />
        </Column>
        <Column margin={marginColumnButtons} customWidth={widthColumnSection}>
        <Button 
            background={backgroundButtons}
            minWidth={widthButtons}
            width={widthButtons}
            fontSize={fontSizeBUtton}
            label='Conferencias'
            color={colorTextButtons}
            onClick={()=>{handlerOnClickButton('Conferences')}}
            />
        </Column> */}
        <Column
          margin={marginColumnButtons}
          customWidth={widthColumnSection}
          alignSelf='center'
        >
          <Button
            background={backgroundButtons}
            minWidth={widthButtons}
            width={widthButtons}
            fontSize={fontSizeBUtton}
            label='Login'
            color={colorTextButtons}
            onClick={() => {
              handlerOnClickButton('Login')
            }}
          />
        </Column>
      </Row>
    </Container>
  )
}
