import "./tiptap.css";
import "./Reference/styles.css";
// import "./Reference/styles.css";
import React, { useContext, useEffect, useRef } from "react";
import {
  useAppState,
  useGraphDispatch,
} from "../../../hooks/AppStateAndGraphhooks";
import { Scrollbars } from "react-custom-scrollbars-2";
import { GraphActionType, GraphNode } from "../../../reducers/GraphReducer";
import TiptapEditor from "./TiptapEditor";
import { countReferences } from "./Reference/countReferences";
import { generateJSON } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import MathExtension from "./MathEditor/Extension";
import { Mention } from "@tiptap/extension-mention";
import { ReferenceStateDispatchContext } from "./Reference/ReferenceStateContext";

export function TiptapBoxComponent({
  note,
  width,
}: {
  note: GraphNode;
  width?: string;
}) {
  const setReferenceMap = useContext(ReferenceStateDispatchContext);
  const AppState = useAppState();
  const GraphDispatch = useGraphDispatch();

  function handleBlur(title: string, content: string) {
    GraphDispatch({
      type: GraphActionType.updateNode,
      node: {
        ...note,
        title: title,
        content: content,
        dateLastModified: new Date().toJSON(),
      },
    });
  }
  return (
    <Scrollbars
      style={{
        width: width ?? "100%",
        // border: "1px solid red",
        flexGrow: "1",
        height: "100%",
        // overflowX: "hidden",
        // overflowY: "scroll",
      }}
      autoHide
    >
      <TiptapEditor note={note} handleBlur={handleBlur} />
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
