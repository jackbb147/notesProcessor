import React, {useState} from 'react';

export function ListItem({text, icon, rootClassName, active, onClick, optionalText}:{
    text: string,
    icon?: React.ReactNode,
    rootClassName?: string,
    active?:boolean,
    onClick?:(e:React.MouseEvent)=>any,
    optionalText?: string
})
{
    return <div  onClick={onClick} className={`flex flex-row ${active && "bg-selectedItem-2"} p-1 rounded items-center cursor-default  ${rootClassName} overflow-hidden`} >
        <div className={"w-5 mr-2 min-w-[1.25rem] flex items-center "}> {icon} </div>
        <div className={` flex flex-col text-left  whitespace-nowrap ${active && "font-bold"}`}>
            <span>{text}</span>
            <span>{optionalText}</span>
        </div>
    </div>
}