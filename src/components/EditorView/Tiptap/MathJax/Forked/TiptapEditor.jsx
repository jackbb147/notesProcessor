import "./styles.css";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

import ReactComponent from "./Extension.js";

export default () => {
  const editor = useEditor({
    extensions: [StarterKit, ReactComponent],
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
