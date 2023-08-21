// src/Tiptap.jsx
import "./tiptap.css";
import "./MathJax/ReactComponent/styles.css";
import "./Reference/styles.css";
import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  EditorContent,
  useEditor,
} from "@jackhou147/tiptap/packages/react"; //from "@tiptap/react"; //// from "@tiptap/react";
import StarterKit from "@jackhou147/tiptap/packages/starter-kit"; //from "@tiptap/starter-kit"; //from "@jackhou147/tiptap/packages/starter-kit";

import ReactComponent from "../Tiptap/MathJax/Forked/Extension";
import React, { useEffect, useRef, useState } from "react";
import { useAppState, useGraph } from "../../../hooks/AppStateAndGraphhooks";
import { TextAlign } from "@tiptap/extension-text-align";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Mention } from "@tiptap/extension-mention";
import suggestion from "./Reference/suggestion";
import { GraphNode } from "../../../reducers/GraphReducer";
import { CustomNode } from "./MathJax/MathJax";
import { EditorView } from "@tiptap/pm/view";
import NodeView from "./MathJax/NodeView";
import TiptapEditor from "./MathJax/Forked/TiptapEditor";

// define your extension array
const extensions = [StarterKit];

const content = "<p>Hello World!</p>";

// export const Tiptap = ({ note }: { note: GraphNode }) => {
//   const Graph = useGraph();
//   const AppState = useAppState();
//   // @ts-ignore
//   // @ts-ignore
//   // const editor: Editor | undefined = useEditor({
//   //   content,
//   // });
//
//   return (
//     <div
//       style={{
//         textAlign: "initial",
//       }}
//     >
//       <div
//         style={{
//           // border: "1px solid yellow",
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       ></div>
//       <>
//         <EditorProvider
//           extensions={[StarterKit, ReactComponent]}
//           content={content}
//         >
//           <FloatingMenu>This is the floating menu</FloatingMenu>
//           <BubbleMenu>This is the bubble menu</BubbleMenu>
//         </EditorProvider>
//       </>
//     </div>
//   );
// };

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
      <TiptapEditor />
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
