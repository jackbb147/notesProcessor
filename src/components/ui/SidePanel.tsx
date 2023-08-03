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

    const [sidePanelWidth, setSidePanelWidth] = useState("fit-content");



    function onSidePanelResize(e:React.MouseEvent):void
    {


        if(!dragging) return;
        e.preventDefault()
        let mouseX:number = e.clientX;
        console.log(mouseX)
        var offsetLeft = containerRef.current.offsetLeft;
        console.log(`offsetLeft: ${offsetLeft}`)
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
        <div ref={containerRef} className={"sidePanelWrapper flex flex-row w-full h-full dark:border-inherit"} onMouseMove={onSidePanelResize} onMouseUp={onEndResize}>

            <div className={"sidePanel h-full flex relative dark:border-inherit"} style={{
                width : sidePanelWidth,
                minWidth: ".5rem",
                maxWidth: "50%"
            }}>
                <div className={"sidePanel__left w-full h-full overflow-hidden"}>
                    <div className={"w-full h-full  flex flex-col pl-3 pr-4"}>
                        {panelChildren}
                    </div>

                </div>

                <div className={"sidePanel__resize h-full border-grey border-r-2  dark:border-dark_secondary w-px cursor-col-resize absolute right-0"}
                     onMouseDown={onBeginResize}/>
            </div>


            <div className={"  h-full grow"}>
                {children}
            </div>

        </div>

    )
}