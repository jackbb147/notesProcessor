import React, {useRef, useState} from 'react';
import './App.css';
export function SidePanel(
    {panelChildren , children}:{
        panelChildren?: React.ReactNode,
        children?: React.ReactNode
    }
)
{
    const containerRef = useRef<any>(null)
    const [dragging, setDragging] = useState(false)

    const [sidePanelWidth, setSidePanelWidth] = useState("20%");

    function onSidePanelResize(e:React.MouseEvent):void
    {

        if(!dragging) return;
        let mouseX:number = e.clientX;
        console.log(mouseX)
        var offsetLeft = containerRef.current.offsetLeft;
        setSidePanelWidth(width=>`${mouseX - offsetLeft}px`)
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
        <div ref={containerRef} className={"sidePanelWrapper flex flex-row w-full h-full"} onMouseMove={onSidePanelResize} onMouseUp={onEndResize}>
            <div className={"sidePanel h-full flex relative"} style={{width : sidePanelWidth}}>
                <div className={"sidePanel__left w-full h-full"}>{panelChildren}</div>
                <div className={"sidePanel__resize bg-black cursor-ew-resize h-full absolute right-0 w-1"}
                     onMouseDown={onBeginResize}
                ></div>
            </div>
            {children}
        </div>

    )
}