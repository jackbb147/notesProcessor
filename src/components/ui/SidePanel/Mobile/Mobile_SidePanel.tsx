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
        sideBarMinimized=false,
        sideBarClosed=false,
        defaultSideBarWidth=`100%`
    }:{
        panelChildren?: React.ReactNode,
        children?: React.ReactNode,
        sideBarMinimized?:boolean,
        sideBarClosed?:boolean,
        defaultSideBarWidth?: string
    }
){
    const containerRef = useRef<any>(null)
    const [sideBarWidth, setSideBarWidth] = useState(defaultSideBarWidth);


    return (
        <div ref={containerRef} className={"sidePanelWrapper flex flex-row w-full h-full dark:border-inherit"} >

            <SideBar
                width={defaultSideBarWidth}
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