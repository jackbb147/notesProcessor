import React from "react";

export function Button({icon, rootClassName, onClick}: {icon?:string, rootClassName?:string, onClick?:(e:React.MouseEvent)=>any})
{
    return <div  onClick={onClick} className={"ml-1 cursor-default "+rootClassName}><img className={"w-6 h-6 "} src={icon}/></div>
}