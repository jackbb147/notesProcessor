import React, {useState} from 'react';

export function ListItem({text, icon, rootClassName, active}:{text: string, icon?: string, rootClassName?: string, active?:boolean})
{
    return <div className={`flex flex-row ${active && "bg-selectedItem-2"} p-1 rounded items-center cursor-default  ${rootClassName} overflow-hidden`} >
        <div className={"w-5 mr-1 min-w-[1.25rem] "}> <img src={icon}/> </div> <div className={"whitespace-nowrap"}>{text}</div>
    </div>
}