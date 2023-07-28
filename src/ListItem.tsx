import React, {useState} from 'react';

export function ListItem({text, icon, rootStyle}:{text: string, icon?: string, rootStyle?: Object})
{
    return <div className={"flex flex-row mb-4 bg-selectedItem-2 p-1 rounded items-center"} style={rootStyle}>
        <div className={"w-1/6 mr-1"}> <img src={icon}/> </div> {text}
    </div>
}