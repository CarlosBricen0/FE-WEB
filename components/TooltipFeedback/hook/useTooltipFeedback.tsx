import { typeMessage } from '../../../pages/CrearUsuario'
import { Row, Container } from 'components-front-end'
import { getGlobalStyle } from 'components-front-end/helpers'
import React, { useEffect, useState } from 'react'
import { TooltipFeedback } from '..'

export const useTooltipFeedback = () => {
    const [notificacionUser, setNotificacionUser] = useState<boolean>(false)
    const [notificacionUserText, setNotificacionUserText] = useState<string>('')
    const [notificacionUserType, setNotificacionUserType] = useState<typeMessage>('success')

    const tooltipMessage = () => {
        if (!notificacionUser) {
            return null;
        }
        return notificacionUser && (
            <Row position='sticky' top='74' zIndex={getGlobalStyle('--z-index-20')}>
                <Container absoluteDefault='topRight' maxWidth='fit-content' position='absolute' margin='10px'>
                    <TooltipFeedback
                        onClose={() => setNotificacionUser(false)}
                        text={notificacionUserText}
                        type={notificacionUserType}
                    />
                </Container>
            </Row>
        );
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setNotificacionUser(false)
        }, 3000)
        return () => {
            clearTimeout(timer)
        }
    }, [notificacionUser])


    return { setNotificacionUser, setNotificacionUserType, setNotificacionUserText, TooltipMessage: tooltipMessage };


}
