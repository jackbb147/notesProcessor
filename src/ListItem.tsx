import React, {useState} from 'react';

export function ListItem({text, icon, rootStyle}:{text: string, icon?: React.ReactNode, rootStyle?: Object})
{
    return <div className={"flex flex-row"} style={rootStyle}>
        {icon} {text}
    </div>
}