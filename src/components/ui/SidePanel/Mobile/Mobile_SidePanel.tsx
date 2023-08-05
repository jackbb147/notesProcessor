import React, {useEffect, useRef, useState} from 'react';
import {SideBar} from "../SideBar";
import "../../../../App.css"




function Main({width, children}:{width: string, children: React.ReactNode})
{
    return (
        <div className={"  h-full grow"} style={{
            width
        }}>
            {children}
        </div>
    )
}

export function Mobile_SidePanel(
    {
        panelChildren,
        children,

        sideBarClosed=false,
        defaultSideBarWidth=`100%`
    }:{
        panelChildren?: React.ReactNode,
        children?: React.ReactNode,
        sideBarClosed?:boolean,
        defaultSideBarWidth?: string
    }
){
    const containerRef = useRef<any>(null)
    const [sideBarWidth, setSideBarWidth] = useState(defaultSideBarWidth);


    return (
        <div ref={containerRef} className={"sidePanelWrapper flex flex-row w-full h-full dark:border-inherit"} >

            <SideBar
                width={sideBarClosed ? "0px" : "100%"}
                minWidth={"0px"}
                rootClassNames={`overflow-hidden`}
            >
                {panelChildren}
            </SideBar>


            <Main width={`calc(100% - ${sideBarWidth})`}>
                {children}
            </Main>

        </div>
    )
}