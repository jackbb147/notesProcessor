// src/Tiptap.jsx
import "./tiptap.css";
import "./Mention/styles.css";
import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  EditorContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useRef, useState } from "react";
import { useAppState, useGraph } from "../../../hooks/AppStateAndGraphhooks";
import { TextAlign } from "@tiptap/extension-text-align";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Mention } from "@tiptap/extension-mention";
import suggestion from "./Mention/suggestion";
import { GraphNode } from "../../../reducers/GraphReducer";

// define your extension array
const extensions = [StarterKit];

const content = "<p>Hello World!</p>";

export const Tiptap = ({ note }: { note: GraphNode }) => {
  const Graph = useGraph();
  const AppState = useAppState();
  // @ts-ignore
  // @ts-ignore
  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        renderLabel({ options, node }) {
          // debugger;
          return `${node.attrs.id.title}`; //TODO this is a hack. It works but it's not the right way to do it
          // return `hello world ...`;
        },
        suggestion: {
          ...suggestion,
          char: "[[",

          items: ({ query }) => {
            return [
              // "Lea Thompson",
              // "Oliver Feng",
              ...Graph.nodes,
            ].filter(
              (item) =>
                item.title.toLowerCase() !== note.title.toLowerCase() &&
                item.title.toLowerCase().startsWith(query.toLowerCase()),
            );
            // .slice(0, 5);
          },
        },

        // suggestion,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: `
        <h2>Heading</h2>
        
        <p ></p>
        <p ></p>
        <p ></p>
        <p ></p>
        <p ></p>
        <p ></p>
        <p ></p>
        <p ></p>
        <p ></p>
        <p ></p>
      `,
  });

  if (!editor) {
    return null;
  }

  return (
    <div
      style={{
        textAlign: "initial",
      }}
    >
      <div
        style={{
          // border: "1px solid yellow",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/*<button*/}
        {/*  onClick={() => editor.chain().focus().setTextAlign("left").run()}*/}
        {/*  className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}*/}
        {/*>*/}
        {/*  left*/}
        {/*</button>*/}
        {/*<button*/}
        {/*  onClick={() => editor.chain().focus().setTextAlign("center").run()}*/}
        {/*  className={*/}
        {/*    editor.isActive({ textAlign: "center" }) ? "is-active" : ""*/}
        {/*  }*/}
        {/*>*/}
        {/*  center*/}
        {/*</button>*/}
        {/*<button*/}
        {/*  onClick={() => editor.chain().focus().setTextAlign("right").run()}*/}
        {/*  className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}*/}
        {/*>*/}
        {/*  right*/}
        {/*</button>*/}
        {/*<button*/}
        {/*  onClick={() => editor.chain().focus().setTextAlign("justify").run()}*/}
        {/*  className={*/}
        {/*    editor.isActive({ textAlign: "justify" }) ? "is-active" : ""*/}
        {/*  }*/}
        {/*>*/}
        {/*  justify*/}
        {/*</button>*/}
        {/*<button onClick={() => editor.chain().focus().unsetTextAlign().run()}>*/}
        {/*  unsetTextAlign*/}
        {/*</button>*/}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

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
      <Tiptap note={note} />
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
