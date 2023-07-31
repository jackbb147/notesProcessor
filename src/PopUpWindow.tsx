
import React from "react";

function Overlay({children}:{
    children?: React.ReactNode
})
{
    return <div className={"absolute w-full h-full bg-blend-overlay bg-blue-300 flex items-center justify-center"}>
        {children}
    </div>
}

export function PopUpWindow({children}:{

    children?: React.ReactNode
})
{
    return (
        <Overlay>{children}</Overlay>
    )
}