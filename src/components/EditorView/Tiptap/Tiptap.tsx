import "./tiptap.css";
import "./Reference/styles.css";
// import "./Reference/styles.css";
import React from "react";
import {
  useAppState,
  useGraphDispatch,
} from "../../../hooks/AppStateAndGraphhooks";
import { Scrollbars } from "react-custom-scrollbars-2";
import { GraphActionType, GraphNode } from "../../../reducers/GraphReducer";
import TiptapEditor from "./TiptapEditor";

export function TiptapBoxComponent({
  note,
  width,
}: {
  note: GraphNode;
  width?: string;
}) {
  const AppState = useAppState();
  const GraphDispatch = useGraphDispatch();

  function handleBlur(content: string) {
    GraphDispatch({
      type: GraphActionType.updateNode,
      node: {
        ...note,
        content: content,
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
        borderRight: AppState.darkModeOn ? "1px solid white" : "1px solid #ccc",
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
