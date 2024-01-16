import { Button, Column, Container, Picture, Row, Spacer } from 'components-front-end'
import { getGlobalStyle } from 'components-front-end/helpers'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import style from '../Header.module.css'

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
  const widthColumnSection = '150px'
  const backgroundButtons = '#0d2159'
  const colorTextButtons = 'white'
  const marginColumnButtons = '0px 5px'
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handlerActionButton = (action: () => void) => {
    action()
    setActiveMenu(null);
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
          <Column alignSelf='center' position='relative' margin={marginColumnButtons} width={widthColumnSection} key={menu.label}>
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
              <Row zIndex='10' justifyContent='center' isWrap customClassName={style.headerLogin} position='absolute' >
                {menu.items.map((item) => (
                  <>
                    <Spacer.Horizontal size={2} />
                    <Column alignItems='center' key={item.label}>
                      <Button background={backgroundButtons}
                        minWidth='140px'
                        width='140px'
                        fontSize={fontSizeBUtton}
                        label={item.label}
                        color={colorTextButtons}
                        onClick={() => handlerActionButton(item.action)}></Button>
                    </Column>
                  </>
                ))}
              </Row >
            )}
          </Column>
        ))}
      </Row>
    </Container>
  )
}

