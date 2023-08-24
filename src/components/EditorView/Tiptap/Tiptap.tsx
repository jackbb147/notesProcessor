import "./tiptap.css";
import "./Reference/styles.css";
// import "./Reference/styles.css";
import StarterKit from "@jackhou147/tiptap/packages/starter-kit"; //from "@tiptap/starter-kit"; //from "@jackhou147/tiptap/packages/starter-kit";

import React, { useEffect, useRef, useState } from "react";
import { useAppState, useGraph } from "../../../hooks/AppStateAndGraphhooks";
import { TextAlign } from "@tiptap/extension-text-align";
import { Scrollbars } from "react-custom-scrollbars-2";
import { GraphNode } from "../../../reducers/GraphReducer";
import TiptapEditor from "./TiptapEditor";
export function TiptapBoxComponent({
  note,
  width,
}: {
  note: GraphNode;
  width?: string;
}) {
  const AppState = useAppState();
  return (
    <Scrollbars
      style={{
        width: width ?? "100%",
        // border: "1px solid red",
        flexGrow: "1",
        height: "100%",
        // overflowX: "hidden",
        // overflowY: "scroll",
        borderRight: AppState.darkModeOn ? "1px solid white" : "1px solid #ccc",
      }}
      autoHide
    >
      <TiptapEditor note={note} />
      {/*<Tiptap note={note} />*/}
    </Scrollbars>
    // <div
    //   tabIndex={0}
    //   className={"scrollbar"}
    //   id="style-1" //1 3
    //   style={{
    //     width: width ?? "100%",
    //     // border: "1px solid red",
    //     flexGrow: "1",
    //     height: "100%",
    //     // overflow: "hidden",
    //     // overflowY: "scroll",
    //     borderRight: AppState.darkModeOn ? "1px solid white" : "1px solid #ccc",
    //   }}
    // >
    //   <Tiptap />
    // </div>
  );
}
