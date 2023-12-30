import { useEffect, useState } from 'react'
interface UseMobileProps {
    callBack?: () => void
}

export const useMobile = (
    props?: UseMobileProps
): { isMobile: any; innerHeight: any; innerWidth: any } => {
    const {
        callBack = () => {
            return null
        }
    } = props || {}
    const [innerHeight, setInnerHeight] = useState<number>()
    const [innerWidth, setInnerWidth] = useState<number>()
    let isMobile = false

    useEffect(() => {
        setInnerHeight(window.innerHeight)
        setInnerWidth(window.innerWidth)
        callBack()
    }, [])

    useEffect(() => {
        const handleResize = () => {
            if (!isNaN(window?.innerHeight) && window?.innerHeight != innerHeight) {
                setInnerHeight(window.innerHeight)
            }

            if (!isNaN(window.innerWidth) && window.innerWidth != innerWidth) {
                setInnerWidth(window.innerWidth)
            }

            callBack()
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize)
        }

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })

    if (typeof window !== 'undefined' && /Mobile/i.test(navigator?.userAgent)) {
        isMobile = true
    }

    return {
        isMobile,
        innerHeight,
        innerWidth
    }
}
