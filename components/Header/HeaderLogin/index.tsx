import { Button, Column, Container, Picture, Row } from 'components-front-end'
import { getGlobalStyle } from 'components-front-end/helpers'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

interface MenuItem {
  label: string;
  action: () => void;
}

interface Menu {
  label: string;
  items: MenuItem[];
}

interface HeaderLoginProps {
  fontSizeBUtton: string
  menus: Menu[];
  widthButtons: string
}
export const HeaderLogin = ({
  fontSizeBUtton,
  menus,
  widthButtons,
}: HeaderLoginProps) => {
  const router = useRouter()
  const widthColumnSection = '25'
  const backgroundButtons = '#0d2159'
  const colorTextButtons = 'white'
  const marginColumnButtons = '0px 5px'
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handlerOnClickButton = (textRedirect: string) => {
    router.push(`/${textRedirect}`)
  }

  const handleMenuClick = (menuLabel: string) => {
    if (activeMenu === menuLabel) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuLabel);
    }
  };

  return (
    <Container
      backgroundColor='#FFFFFF'
      isWrap
      alignSelf='center'
      justifyContent='center'
      alignItems='center'
      padding='auto 10px'
      boxShadow={getGlobalStyle('--box-shadow-2xs')}
      customClassName="header"
    >
      <Row customHeight='80px' >
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
        {menus.map((menu) => (
          <Column alignSelf='center' margin={marginColumnButtons} customWidth={widthColumnSection} customClassName="menu" key={menu.label}>
            <Button
              background={backgroundButtons}
              minWidth={widthButtons}
              width={widthButtons}
              fontSize={fontSizeBUtton}
              label={menu.label}
              color={colorTextButtons}
              onClick={() => { handleMenuClick(menu.label) }}
            >
            </Button>

            {activeMenu === menu.label && (
              <Row className="menu-items">
                {menu.items.map((item) => (
                  <Column key={item.label}>
                    <Button background={backgroundButtons}
                      minWidth={widthButtons}
                      width={widthButtons}
                      fontSize={fontSizeBUtton}
                      label={item.label}
                      color={colorTextButtons}
                      onClick={item.action}></Button>
                  </Column>
                ))}
              </Row>
            )}
          </Column>
        ))}
      </Row>
    </Container>
  )
}

