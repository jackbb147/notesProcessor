import "./MathEditor/styles.css";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { forwardRef, useEffect } from "react";

import ReactComponent from "./MathEditor/Extension.js";
import { Mention } from "@tiptap/extension-mention";
import suggestion from "./Reference/suggestion";

import { useGraph } from "../../../hooks/AppStateAndGraphhooks";
import { GraphNode } from "../../../reducers/GraphReducer";
import { Editor } from "@tiptap/core";
export default forwardRef(
  (
    {
      note,
      handleBlur,
      updateReferences,
    }: {
      note: GraphNode;
      handleBlur?: (content: string) => any;
      updateReferences: (referenceMap: Map<string, number>) => any;
    },
    ref,
  ) => {
    const Graph = useGraph();

    useEffect(() => {
      if (!editor) return;
      // https://tiptap.dev/guide/custom-extensions#storage
      editor.storage.mention.note = note;
      editor.storage.mention.graph = Graph;
    }, [note, Graph]);
    const editor = useEditor(
      {
        onBlur: (props) => {
          console.log("onblur");
          const content = props.editor.getHTML();
          // debugger;
          handleBlur?.(content);
        },
        extensions: [
          StarterKit,
          ReactComponent,
          Mention.extend({
            addStorage() {
              return {
                note: note,
                graph: Graph,
                references: new Map(),
              };
            },

            addKeyboardShortcuts() {
              return {
                Backspace: () => {
                  const editor = this.editor;
                  const storage = this.storage;
                  return editor.commands.command(({ tr, state }) => {
                    let isMention = false;
                    const { selection } = state;
                    const { empty, anchor } = selection;

                    if (!empty) {
                      return false;
                    }

                    state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
                      if (node.type.name === this.name) {
                        // TODO update the reference map
                        const st = storage;
                        // debugger;

                        isMention = true;
                        tr.insertText(
                          this.options.suggestion.char || "",
                          pos,
                          pos + node.nodeSize,
                        );

                        return false;
                      }
                    });

                    return isMention;
                  });
                },
              };
            },
          }).configure({
            HTMLAttributes: {
              class: "mention",
            },
            renderLabel({ options, node }) {
              const parsedNode: GraphNode = JSON.parse(node.attrs.id); //TODO this is a hack. It works but it's not the right way to do it
              // const Node: GraphNode = JSON.parse(node);
              return `${parsedNode.title}`;
              // return `hello world ...`;
            },

            suggestion: {
              ...suggestion,
              char: "[[",

              items: ({ query, editor }) => {
                const note = editor.storage.mention.note;
                const graph = editor.storage.mention.graph;
                return (
                  [
                    // "Lea Thompson",
                    // "Oliver Feng",
                    ...graph.nodes,
                  ]
                    .filter((item) => {
                      // debugger;
                      return (
                        item.title.toLowerCase() !== note.title.toLowerCase() &&
                        item.title.toLowerCase().startsWith(query.toLowerCase())
                      );
                    })
                    // .map((item) => "hello world");
                    .map((node) => JSON.stringify(node))
                );
              },
            },

            // suggestion,
          }),
        ],
        content: note.content,
      },
      [note.id],
    );

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
  },
);
