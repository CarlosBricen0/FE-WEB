import React from 'react'
import { useMobile } from '../../shared/hooks/useMobile'
import {
    Column,
    Container,
    Modal,
    Picture,
    Row,
    Text
} from 'components-front-end'
import { useRouter } from 'next/router'

interface ModalProps {
    openModal: boolean
    modalImage: string
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}
export const ModalRepeatPurchase = ({
    openModal,
    modalImage,
    setOpenModal
}: ModalProps) => {
    const router = useRouter()
    const { isMobile } = useMobile()
    const customMaxWidth = isMobile ? '265px' : '340px'
    const customImageSize = isMobile ? '198px' : '164px'

    const handleGoToCart = () => {
        setOpenModal(false)
        //router.push(process.env.NEXT_PUBLIC_CARTURL)
    }

    const handleKeepShopping = () => {
        setOpenModal(false)
        //router.push(process.env.NEXT_PUBLIC_HOMEURL)
    }

    return (
        <>
            <Modal
                isOpen={openModal}
                toggle={() => {
                    return setOpenModal(false)
                }}
                modalTitle='Ir al carro'
            >
                <>
                    <Column
                        alignItems='center'
                        margin='36px 0 0 0'
                        width='250px'
                    >
                        <Picture
                            height='auto'
                            src='https://source.unsplash.com/600x400/?Dawn%20%20%20%20%20%20%20%20%20%20%20&__cacheBuster=1703901153050'
                            width={customImageSize}
                        />
                        <Container
                            justifyContent='center'
                            margin='27px 0'
                        >
                            <Text
                                fontSize='xl'
                                fontWeight='medium'
                                textAlign='center'
                            >
                                Tu carro está listo
                            </Text>
                        </Container>
                    </Column>
                    <Row maxWidth={customMaxWidth}>
                        <Text
                            fontWeight='regular'
                            isFlex
                            textAlign='center'
                        >
                            Tus productos ya fueron agregados. ¡Sólo te queda un paso para que
                            sean tuyos!
                        </Text>
                    </Row>
                </>
            </Modal>
        </>
    )
}
