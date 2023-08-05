import React from "react";

export function SideBar({width, minWidth="fit-content", children, handleResize, rootClassNames}:{
    width: string,
    minWidth? :  string,
    children: React.ReactNode,
    handleResize?: (e:React.MouseEvent)=>any,
    rootClassNames?:string


})
{
    return (
        <div className={`sidePanel 
            h-full 
            flex 
            relative 
            dark:border-inherit
            ${rootClassNames}
            `} style={{
            width: width,
            minWidth: minWidth,
            // maxWidth: "50%",
        }}>
            <div className={"sidePanel__left w-full h-full"}>
                <div className={"w-full h-full  flex flex-col pl-3 pr-4 relative"}>
                    {children}
                    {/*{panelChildren}*/}
                </div>

            </div>

            <div className={"sidePanel__resize h-full border-grey border-r-2  dark:border-dark_secondary w-px cursor-col-resize absolute right-0"}

                 onMouseDown={handleResize? handleResize : ()=>{} }
            />
        </div>
    )
}
