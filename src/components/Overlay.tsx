import React from "react";

export function Overlay({children, handleClick=()=>{}}:{
    children?: React.ReactNode,
    handleClick?: (e: React.MouseEvent)=> any
}) {
    return (
        <>
            <div
                className={(`
                w-full
                h-full
                absolute
                left-0
                top-0
                bg-dark_overlay
                opacity-60
                z-10
            `)}
                onClick={handleClick}
            >
            </div>

            <div className={`
                absolute
                w-full
                h-full
                flex
                flex-col
                justify-center
                z-20
                pointer-events-none
            `}>
                {children}
            </div>

        </>

    )
}