import React, {useState} from 'react';
import './App.css';
export function SidePanel(
    {width,  onBeginResize}:{
        width: string,
        onBeginResize: (e:React.MouseEvent)=>void,
    }
)
{
    return (
        <div className={"sidePanel h-full flex relative"} style={{width : width}}>
            <div className={"sidePanel__left w-full h-full"}></div>
            <div className={"sidePanel__resize bg-black cursor-ew-resize h-full absolute right-0 w-2"}
                 onMouseDown={onBeginResize}
            ></div>
        </div>
    )
}