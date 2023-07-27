import React, {useState} from 'react';
import './App.css';
export function SidePanel(
    {children}:{
        children: React.ReactNode
    }
)
{
    const [dragging, setDragging] = useState(false)

    const [sidePanelWidth, setSidePanelWidth] = useState("20%");

    function onSidePanelResize(e:React.MouseEvent):void
    {

        if(!dragging) return;
        let mouseX:number = e.clientX;
        console.log(mouseX)
        setSidePanelWidth(width=>`${mouseX}px`)
    }

    function onBeginResize()
    {
        setDragging(true);
    }

    function onEndResize()
    {
        setDragging(false);
    }


    return (
        <div className={"sidePanelWrapper flex flex-row w-full"} onMouseMove={onSidePanelResize} onMouseUp={onEndResize}>
            <div className={"sidePanel h-full flex relative"} style={{width : sidePanelWidth}}>
                <div className={"sidePanel__left w-full h-full"}></div>
                <div className={"sidePanel__resize bg-black cursor-ew-resize h-full absolute right-0 w-2"}
                     onMouseDown={onBeginResize}
                ></div>
            </div>
            {children}
        </div>

    )
}