import React, {useState} from 'react';

export function ListItem({text, icon, rootClassName, active, onClick}:{
    text: string,
    icon?: React.ReactNode,
    rootClassName?: string,
    active?:boolean,
    onClick?:(e:React.MouseEvent)=>any
})
{
    return <div  onClick={onClick} className={`flex flex-row ${active && "bg-selectedItem-2"} p-1 rounded items-center cursor-default  ${rootClassName} overflow-hidden`} >
        <div className={"w-5 mr-2 min-w-[1.25rem] "}> {icon} </div> <div className={`whitespace-nowrap ${active && "font-bold"}`}>{text}</div>
    </div>
}