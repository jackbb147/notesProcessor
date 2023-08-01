import React from "react";

export function Button({icon, rootClassName, onClick}: {icon?:React.ReactNode, rootClassName?:string, onClick?:(e:React.MouseEvent)=>any})
{
    return <div  onClick={onClick} className={"ml-1 cursor-default "+rootClassName}>{icon}</div>
}