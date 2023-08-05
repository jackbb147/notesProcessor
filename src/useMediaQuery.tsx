import { useMediaQuery } from 'react-responsive'
import React from "react";

export const Desktop = ({ children }: {
    children: React.ReactNode
}) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })

    return isDesktop ? <>{children}</> : null
}



export const Tablet = ({ children }: {
    children: React.ReactNode
}) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? <>{children}</> : null
}

export const Mobile = ({ children }: {
    children: React.ReactNode
}) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? <>{children}</> : null
}