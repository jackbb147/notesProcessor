import "./Tiptap/tiptap.css";
import "./Tiptap/Reference/styles.css";
// import "./Reference/styles.css";
import React, { useContext, useEffect, useRef } from "react";
// import {
//   useAppState,
//   useGraphDispatch,
// } from "../../../hooks/AppStateAndGraphAndUserhooks";
import {
  useAppState,
  useGraphDispatch,
} from "../../hooks/AppStateAndGraphAndUserhooks";
import { useAppDispatch } from "../../hooks/AppStateAndGraphAndUserhooks";
import { AppActionType } from "../../reducers/AppStateReducer";
import { Scrollbars } from "react-custom-scrollbars-2";
import { GraphActionType, GraphNode } from "../../reducers/GraphReducer";
import TiptapEditor from "./Tiptap/TiptapEditor";
import { Editor } from "./Lexical/Editor";
import { countReferences } from "./Tiptap/Reference/countReferences";
import { generateJSON } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import MathExtension from "./Tiptap/MathEditor/Extension";
import { Mention } from "@tiptap/extension-mention";
import { ReferenceStateDispatchContext } from "./Tiptap/Reference/ReferenceStateContext";
import {
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} from "../../api/apiSlice";

export function EditorBoxComponent({
  note,
  width,
  focusRequested,
}: {
  note: GraphNode;
  width?: string;
  focusRequested?: number;
}) {
  const appDispatch = useAppDispatch();
  const [
    updateNote,
    { isLoading: isUpdating, isError: isUpdateError, error: updateError },
  ] = useUpdateNoteMutation();

  const [
    deleteNote,
    { isLoading: isDeleting, isError: isDeleteError, error: deleteError },
  ] = useDeleteNoteMutation();
  const setReferenceMap = useContext(ReferenceStateDispatchContext);
  const AppState = useAppState();
  const GraphDispatch = useGraphDispatch();

  async function handleUpdateNode(title: string, content: string) {
    //   TODO
    console.debug("[handleUpdateNode] title: " + title, " content: " + content);
    await updateNote({
      ...note,
      Title: title,
      Content: content,
      DateLastModified: new Date().toJSON(),
    });
    if (isUpdateError) throw new Error(JSON.stringify(updateError, null, 2));
  }

  // useEffect(() => {
  //   if (isDeleteError) throw new Error(JSON.stringify(deleteError, null, 2));
  //   appDispatch({
  //     type: AppActionType.setActiveNodeID,
  //     id: undefined,
  //   });
  // }, [isDeleting]);

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
      <Editor
        note={note}
        // handleBlur={handleUpdateNode}
        // focusRequested={focusRequested}
      />
      {/*<TiptapEditor*/}
      {/*  note={note}*/}
      {/*  handleBlur={handleUpdateNode}*/}
      {/*  focusRequested={focusRequested}*/}
      {/*/>*/}
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
