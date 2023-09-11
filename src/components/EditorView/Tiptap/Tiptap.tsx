import "./tiptap.css";
import "./Reference/styles.css";
// import "./Reference/styles.css";
import React, { useContext, useEffect, useRef } from "react";
// import {
//   useAppState,
//   useGraphDispatch,
// } from "../../../hooks/AppStateAndGraphAndUserhooks";
import {
  useAppState,
  useGraphDispatch,
} from "../../../hooks/AppStateAndGraphAndUserhooks";
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
import { useUpdateNoteMutation } from "../../../api/apiSlice";

export function TiptapBoxComponent({
  note,
  width,
  focusRequested,
}: {
  note: GraphNode;
  width?: string;
  focusRequested?: number;
}) {
  const [
    updateNote,
    { isLoading: isUpdating, isError: isUpdateError, error: updateError },
  ] = useUpdateNoteMutation();
  const setReferenceMap = useContext(ReferenceStateDispatchContext);
  const AppState = useAppState();
  const GraphDispatch = useGraphDispatch();

  async function handleUpdateNode(title: string, content: string) {
    //   TODO
    // debugger;
    if (note.Content.length !== 0) {
      // graphDispatch({
      //   type: GraphActionType.updateNode,
      //   node: note,
      // });
      // debugger;
      await updateNote({
        ...note,
        Title: title,
        Content: content,
        DateLastModified: new Date().toJSON(),
      });
      if (isUpdateError) throw new Error(JSON.stringify(updateError, null, 2));
      // else alert("Note updated!");
    } else {
      // dispatch({
      //   type: AppActionType.setActiveNodeID,
      //   id: undefined,
      // });
      // graphDispatch({
      //   type: GraphActionType.removeNode,
      //   id: note.Id,
      // });
    }
  }

  // function handleBlur(title: string, content: string) {
  //   GraphDispatch({
  //     type: GraphActionType.updateNode,

  //   });
  // }
  return (
    <Scrollbars
      style={{
        width: width ?? "100%",

        flexGrow: "1",
        height: "100%",
        // overflowX: "hidden",
        // overflowY: "scroll",
      }}
      autoHide
    >
      <TiptapEditor
        note={note}
        handleBlur={handleUpdateNode}
        focusRequested={focusRequested}
      />
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
