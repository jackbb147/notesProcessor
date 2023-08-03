import React from "react";

export function Overlay({children, handleClick=()=>{}}:{
    children?: React.ReactNode,
    handleClick?: (e: React.MouseEvent)=> any
}) {
    return (
        <div
            className={(`
                w-full
                h-full
                absolute
                left-0
                top-0
                bg-selectedItem-2
                flex
                flex-col
                justify-center
                z-10
            `)}
            onClick={handleClick}
        >
            {children}
        </div>
    )
}