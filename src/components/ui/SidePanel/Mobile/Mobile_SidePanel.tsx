import React, { useEffect, useRef, useState } from "react";
import { SideBar } from "../SideBar";
import "../../../../App.css";

function Main({
  width,
  children,
}: {
  width: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={"  h-full grow"}
      style={{
        width,
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}

export function Mobile_SidePanel({
  panelChildren,
  children,

  sideBarClosed = false,
  defaultSideBarWidth = `100%`,
  maxWidth = "100%",
  requestSideBarClose = () => {},
  sideBarStyle,
}: {
  panelChildren?: React.ReactNode;
  children?: React.ReactNode;
  sideBarClosed?: boolean;
  defaultSideBarWidth?: string;
  maxWidth?: string;
  requestSideBarClose?: (e: any) => any;
  sideBarStyle?: React.CSSProperties;
}) {
  const containerRef = useRef<any>(null);
  const [sideBarWidth, setSideBarWidth] = useState(defaultSideBarWidth);

  return (
    <div
      ref={containerRef}
      className={
        "sidePanelWrapper flex flex-row w-full h-full dark:border-inherit"
      }
    >
      <SideBar
        width={sideBarClosed ? "0px" : maxWidth}
        minWidth={"0px"}
        rootClassNames={`overflow-hidden`}
        style={sideBarStyle}
      >
        {panelChildren}
      </SideBar>

      <Main width={`calc(100% - ${sideBarWidth})`}>
        <>
          {/*{!sideBarClosed && (*/}
          {/*  <div*/}
          {/*    onClick={requestSideBarClose}*/}
          {/*    style={{*/}
          {/*      position: "absolute",*/}
          {/*      width: "100%",*/}
          {/*      height: "100%",*/}
          {/*      left: "0px",*/}
          {/*      top: "0px",*/}
          {/*      backgroundColor: "rgba(0,0,0,0.5)",*/}
          {/*      zIndex: 100,*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    /!*{!sideBarClosed ? " YOU SHOULD SEE ME" : "YOU SHOULD NOT SEE ME"}*!/*/}
          {/*  </div>*/}
          {/*)}*/}
          {children}
        </>
      </Main>
    </div>
  );
}
