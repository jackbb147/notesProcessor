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
               
                top-0
                left-0
                right-0
                bottom-0
                m-auto
                w-fit
                h-fit
                flex
                flex-col
                justify-center
                z-20
                
                min-w-[50%]
            `}>
                {/*https://stackoverflow.com/a/9998303/21646295*/}
                {children}
            </div>

        </>

    )
}