import "./MathEditor/styles.css";
import "./placeholder.css";

import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { forwardRef, useContext, useEffect } from "react";

import ReactComponent from "./MathEditor/Extension.js";
import { Mention } from "@tiptap/extension-mention";
import suggestion from "./Reference/suggestion";
import Placeholder from "@tiptap/extension-placeholder";

import { useGraph } from "../../../hooks/AppStateAndGraphhooks";
import { GraphNode } from "../../../reducers/GraphReducer";
import { ReferenceStateDispatchContext } from "./Reference/ReferenceStateContext";
import { ReferenceStateActionType } from "./Reference/ReferenceStateReducer";
import { Editor } from "@tiptap/core";
import { TextAlign } from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { History } from "@tiptap/extension-history";
import { Heading } from "@tiptap/extension-heading";

import MyToolbar from "./Toolbar/Toolbar";

function getFirstLine(json: JSONContent): string {
  let res: string = "";
  var q = [json];
  while (q.length > 0) {
    var node = q.shift();
    if (!node) continue;
    if (node.type === "text") {
      res = node.text ?? "";
      break;
    }
    if (node.content) {
      q.push(...node.content);
    }
  }
  if (res.length < 1) res = "New Note";
  return res;
}

export default forwardRef(
  (
    {
      note,
      handleBlur,
    }: {
      note: GraphNode;
      handleBlur?: (title: string, content: string) => any;
    },
    ref,
  ) => {
    const Graph = useGraph();

    const referenceMapDispatch = useContext(ReferenceStateDispatchContext);

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
          let firstLine: string = getFirstLine(props.editor.getJSON());
          // debugger;
          handleBlur?.(firstLine, content);
        },
        extensions: [
          StarterKit,
          TextAlign.configure({
            alignments: ["left", "right", "center", "justify"],
            types: ["heading", "paragraph"],
          }),
          Placeholder.configure({
            // Use a placeholder:
            placeholder: "Write something …",
            // Use different placeholders depending on the node type:
            // placeholder: ({ node }) => {
            //   if (node.type.name === 'heading') {
            //     return 'What’s the title?'
            //   }

            //   return 'Can you add some further context?'
            // },
          }),
          ReactComponent,
          Underline,
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

                        const parsedNote = JSON.parse(node.attrs.id);
                        const id = parsedNote.id;
                        // debugger;

                        referenceMapDispatch({
                          type: ReferenceStateActionType.removeReference,
                          reference: {
                            sourceID: note.id,
                            targetID: id,
                          },
                        });

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
        <MyToolbar editor={editor} />
        {/*<div>*/}
        {/*  <button*/}
        {/*    onClick={() => {*/}
        {/*      alert("hey");*/}
        {/*      editor?.chain().focus().setTextAlign("left").run();*/}
        {/*    }}*/}
        {/*    className={*/}
        {/*      editor?.isActive({ textAlign: "left" }) ? "is-active" : ""*/}
        {/*    }*/}
        {/*  >*/}
        {/*    left*/}
        {/*  </button>*/}

        {/*  <button*/}
        {/*    onClick={() => {*/}
        {/*      editor?.chain().focus().toggleBold().run();*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    Bold*/}
        {/*  </button>*/}
        {/*  <button*/}
        {/*    onClick={() => editor?.chain().focus().setTextAlign("center").run()}*/}
        {/*    className={*/}
        {/*      editor?.isActive({ textAlign: "center" }) ? "is-active" : ""*/}
        {/*    }*/}
        {/*  >*/}
        {/*    center*/}
        {/*  </button>*/}
        {/*  /!*<button*!/*/}
        {/*  /!*  onClick={() => editor.chain().focus().setTextAlign("right").run()}*!/*/}
        {/*  /!*  className={*!/*/}
        {/*  /!*    editor.isActive({ textAlign: "right" }) ? "is-active" : ""*!/*/}
        {/*  /!*  }*!/*/}
        {/*  /!*>*!/*/}
        {/*  /!*  right*!/*/}
        {/*  /!*</button>*!/*/}
        {/*  /!*<button*!/*/}
        {/*  /!*  onClick={() =>*!/*/}
        {/*  /!*    editor.chain().focus().setTextAlign("justify").run()*!/*/}
        {/*  /!*  }*!/*/}
        {/*  /!*  className={*!/*/}
        {/*  /!*    editor.isActive({ textAlign: "justify" }) ? "is-active" : ""*!/*/}
        {/*  /!*  }*!/*/}
        {/*  /!*>*!/*/}
        {/*  /!*  justify*!/*/}
        {/*  /!*</button>*!/*/}
        {/*  /!*<button*!/*/}
        {/*  /!*  onClick={() => editor.chain().focus().unsetTextAlign().run()}*!/*/}
        {/*  /!*>*!/*/}
        {/*  /!*  unsetTextAlign*!/*/}
        {/*  /!*</button>*!/*/}
        {/*</div>*/}

        <EditorContent editor={editor} />
      </div>
    );
  },
);
