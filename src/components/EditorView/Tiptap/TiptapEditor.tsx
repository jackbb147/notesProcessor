import "./MathEditor/styles.css";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";

import ReactComponent from "./MathEditor/Extension.js";
import { Mention } from "@tiptap/extension-mention";
import suggestion from "./Reference/suggestion";

import { useGraph } from "../../../hooks/AppStateAndGraphhooks";
import { GraphNode } from "../../../reducers/GraphReducer";
import { Editor } from "@tiptap/core";
export default ({ note }: { note: GraphNode }) => {
  const Graph = useGraph();

  useEffect(() => {
    if (!editor) return;
    // https://tiptap.dev/guide/custom-extensions#storage
    editor.storage.mention.note = note;
  }, [note]);
  const editor = useEditor({
    extensions: [
      StarterKit,
      ReactComponent,
      Mention.extend({
        addStorage() {
          return {
            note: note,
          };
        },
      }).configure({
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

          items: ({ query, editor }) => {
            return [
              // "Lea Thompson",
              // "Oliver Feng",
              ...Graph.nodes,
            ].filter((item) => {
              const note = editor.storage.mention.note;
              // debugger;
              return (
                item.title.toLowerCase() !== note.title.toLowerCase() &&
                item.title.toLowerCase().startsWith(query.toLowerCase())
              );
            });
            // .slice(0, 5);
          },
        },

        // suggestion,
      }),
    ],
    content: `
    <p></p>
<!--    <react-component>hello!</react-component>-->
   
    `,
  });

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
