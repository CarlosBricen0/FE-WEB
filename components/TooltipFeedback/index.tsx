import React, { useEffect } from 'react'
import {
    Column,
    Container,
    Icon,
    Row,
    Text,
    Tooltip
} from 'components-front-end'
import type { IconNames } from 'components-front-end'
import { getGlobalStyle } from 'components-front-end/helpers'

type Position = 'absolute' | 'relative' | 'fixed' | 'initial' | 'sticky'

type FeedbackStyles = {
    background: string
    iconColor: string
    icon: IconNames
}

type FeedbackTypes = {
    success: FeedbackStyles
    warning: FeedbackStyles
    error: FeedbackStyles
    info: FeedbackStyles
}

export interface ITooltipFeedback {
    text: string
    type: 'success' | 'error' | 'warning' | 'info'
    position?: Position
    linkText?: string
    positionContainer?: Position
    nestedTextComponent?: React.ReactElement | null
    width?: string
    maxWidth?: string
    closeIcon?: boolean
    onClickLink?: () => void
    onClose?: () => void
}

export const TooltipFeedback = ({
    text = 'Mensaje Exitoso',
    type = 'success',
    position = 'sticky',
    positionContainer = 'sticky',
    nestedTextComponent = null,
    linkText = '',
    width = '343px',
    maxWidth = '343px',
    onClose,
    onClickLink,
    closeIcon = true
}: ITooltipFeedback): React.ReactElement => {
    const feedbackStyles: FeedbackTypes = {
        success: {
            background: getGlobalStyle('--color-feedback-success-bg'),
            iconColor: getGlobalStyle('--color-feedback-success-light'),
            icon: 'CheckCircle'
        },
        warning: {
            background: getGlobalStyle('--color-feedback-warning-bg'),
            iconColor: getGlobalStyle('--color-feedback-warning-light'),
            icon: 'WarningFilled'
        },
        error: {
            background: getGlobalStyle('--color-feedback-error-bg'),
            iconColor: getGlobalStyle('--color-feedback-error-light'),
            icon: 'InfoFill'
        },
        info: {
            background: getGlobalStyle('--color-feedback-info-bg'),
            iconColor: getGlobalStyle('--color-feedback-info'),
            icon: 'InfoFill'
        }
    }

    useEffect(() => {
        const closeTimeout = setTimeout(() => {
            if (onClose) onClose()
        }, 3000)

        return () => {
            return clearTimeout(closeTimeout)
        }
    }, [])

    return (
        <Tooltip
            alignAllItems='center'
            background={feedbackStyles[type].background}
            borderRadius={getGlobalStyle('--border-radius-2sm')}
            boxShadow={getGlobalStyle('--box-shadow-3md')}
            closeColor={getGlobalStyle('--color-icons-black')}
            closeIcon={closeIcon}
            display='flex'
            align='center'
            height='50px'
            padding='10px'
            maxWidth={maxWidth}
            onClick={onClose}
            position={position}
            positionContainer={positionContainer}
            textComponent={
                <Container alignItems='center'
                    justifyContent='center'
                    alignSelf='center'>
                    <Row
                        alignItems='center'
                        justifyContent='center'
                        alignSelf='center'
                        gap='8px'
                    >
                        <Column maxWidth='max-content'>
                            <Icon
                                color={feedbackStyles[type].iconColor}
                                customSize={20}
                                name={feedbackStyles[type].icon}
                            />
                        </Column>
                        <Column margin='0 8px 0 0'>
                            <Text
                                color='black'
                                fontSize='md'
                                fontWeight='medium'
                                truncate={74}
                            >
                                {text}
                            </Text>
                            {nestedTextComponent}
                        </Column>
                        {linkText && (
                            <Column
                                margin='0 8px 0 0'
                                maxWidth='15%'
                            >
                                <Text
                                    clickable='pointer'
                                    color='success'
                                    fontSize='sm'
                                    fontWeight='semibold'
                                    onClick={onClickLink}
                                >
                                    {linkText}
                                </Text>
                            </Column>
                        )}
                    </Row>
                </Container>
            }
            type='bottom'
            width={width}
        />
    )
}
