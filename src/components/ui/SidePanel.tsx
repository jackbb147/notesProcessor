import React, {useEffect, useRef, useState} from 'react';
import '../../App.css';
import {ListItem} from "../panels/ListItem";
import {AppActionType, Collections} from "../../reducers/AppStateReducer";


function SideBar({width, children, handleResize}:{
    width: string,
    children: React.ReactNode,
    handleResize: (e:React.MouseEvent)=>any
})
{
    return (
        <div className={`sidePanel 
            h-full 
            flex 
            relative 
            dark:border-inherit
            w-full
            `} style={{
            // width: width,
            minWidth: "fit-content",
            // maxWidth: "50%",
        }}>
            <div className={"sidePanel__left w-full h-full"}>
                <div className={"w-full h-full  flex flex-col pl-3 pr-4 relative"}>
                    {children}
                    {/*{panelChildren}*/}
                </div>

            </div>

            <div className={"sidePanel__resize h-full border-grey border-r-2  dark:border-dark_secondary w-px cursor-col-resize absolute right-0"}
                 // onMouseDown={onBeginResize}
                onMouseDown={handleResize}
            />
        </div>
    )
}


function Main({width, children}:{width: string, children: React.ReactNode})
{
    return (
        <div className={"  h-full grow"} style={{
            width: "0px"
            // width: `calc(100% - ${sidePanelWidth})`
        }}>
            {children}
        </div>
    )
}

export function SidePanel(
    {
        panelChildren,
        children,
        sideBarMinimized=false,
        sideBarClosed=false,
        defaultSideBarWidth=`25%`
    }:{
        panelChildren?: React.ReactNode,
        children?: React.ReactNode,
        sideBarMinimized?:boolean,
        sideBarClosed?:boolean,
        defaultSideBarWidth?: string
    }
){
    const containerRef = useRef<any>(null)
    const [dragging, setDragging] = useState(false)

    const [sidePanelWidth, setSidePanelWidth] = useState(sideBarClosed ? "0px" : (sideBarMinimized ? "fit-content" : defaultSideBarWidth));



    useEffect(()=>{
        if(sideBarClosed)
        {
            setSidePanelWidth("0px");
        }
        else if(sideBarMinimized)
        {
            setSidePanelWidth("fit-content")
        }else{
            setSidePanelWidth("25%")
        }
    }, [sideBarMinimized, sideBarClosed])
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

            <SideBar width={sidePanelWidth} handleResize={onBeginResize}>
                {panelChildren}
            </SideBar>


            <Main width={`calc(100% - ${sidePanelWidth})`}>
                {children}
            </Main>

        </div>

    )
}