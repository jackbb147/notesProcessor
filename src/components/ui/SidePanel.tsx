import React, {useEffect, useRef, useState} from 'react';
import '../../App.css';
import {ListItem} from "../panels/ListItem";
import {AppActionType, Collections} from "../../reducers/AppStateReducer";
export function SidePanel(
    {panelChildren , children, isClosed=false}:{
        panelChildren?: React.ReactNode,
        children?: React.ReactNode,
        isClosed?:boolean
    }
)
{
    const containerRef = useRef<any>(null)
    const [dragging, setDragging] = useState(false)

    const [sidePanelWidth, setSidePanelWidth] = useState("25%");



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
            <div className={"sidePanel h-full flex relative"} style={{width : isClosed?"0px":sidePanelWidth}}>
                <div className={"sidePanel__left w-full h-full"}>
                    <div className={"w-full h-full  flex flex-col pl-4 pr-4"}>
                            <div className={"grow flex flex-col"}>
                                {panelChildren}
                            </div>
                        </div>

                </div>
                <div className={"sidePanel__resize bg-inherit cursor-ew-resize h-full absolute right-0 w-6 flex justify-center"}
                     onMouseDown={onBeginResize}
                >
                    <div className={"h-full bg-grey w-px"}></div>
                </div>
            </div>
            {children}
        </div>

    )
}