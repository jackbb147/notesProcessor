import "./MathEditor/styles.css";
import "./placeholder.css";

import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { forwardRef, useContext, useEffect } from "react";

import ReactComponent from "./MathEditor/Extension.js";
import { Mention } from "@tiptap/extension-mention";
import suggestion from "./Reference/suggestion";
import Placeholder from "@tiptap/extension-placeholder";

import {
  useAppState,
  useAppDispatch,
  useGraph,
} from "../../../hooks/AppStateAndGraphAndUserhooks";
import { GraphNode } from "../../../reducers/GraphReducer";
import { ReferenceStateDispatchContext } from "./Reference/ReferenceStateContext";
import { ReferenceStateActionType } from "./Reference/ReferenceStateReducer";
import { TextAlign } from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

import MyToolbar from "./Toolbar/Toolbar";
import { AppActionType, Collections } from "../../../reducers/AppStateReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useLogInStatus } from "../../../hooks/useLogInStatus";
import { SignalrConnectionContext } from "../../../reducers/SignalrConnectionContext";
import { HubConnection } from "@microsoft/signalr";
import { useGetNotesQuery } from "../../../api/apiSlice";

function getFirstLine(json: JSONContent): string {
  // debugger;
  let res: string = "";
  var q: JSONContent[] = [json];
  while (q.length > 0) {
    var node: JSONContent | undefined = q.shift();
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
      handleUpdate,
      focusRequested,
    }: {
      note: GraphNode;
      handleBlur?: (title: string, content: string) => any;
      handleUpdate?: (title: string, content: string) => any;
      focusRequested?: number;
    },
    ref,
  ) => {
    const {
      data: notes,
      isError: notesFetchError,
      isLoading: notesFetchLoading,
      isSuccess: notesFetchSuccess,
    } = useGetNotesQuery();
    const Graph = useGraph();
    const appState = useAppState();
    const dispatch = useAppDispatch();
    const updateNeeded = useSelector(
      (state: RootState) => state.signalr.updateNeeded,
    );
    const activeNoteContent = useSelector(
      (state: RootState) => state.signalr.activeNoteContent,
    );

    const connection: HubConnection | null = useContext(
      SignalrConnectionContext,
    );

    const [isLoggedIn, loggedInUser] = useLogInStatus();

    const referenceMapDispatch = useContext(ReferenceStateDispatchContext);
    useEffect(() => {
      // alert("hey focus requested");
      // console.debug("[tiptapEditor] focus requested");
      if (appState.activeCollection === Collections.RecentlyDeleted) {
        //   TODO
        //
        if (focusRequested && focusRequested > 0) {
          dispatch({
            type: AppActionType.setShowRecoverNodePopup,
            show: true,
          });
        }
      } else {
        editor?.commands.focus();
      }
    }, [focusRequested]);
    //
    // useEffect(() => {
    //   if (!connection) return;
    //
    // }, [connection]);

    useEffect(() => {
      if (!editor) return;
      // https://tiptap.dev/guide/custom-extensions#storage
      editor.storage.mention.note = note;
      editor.storage.mention.graph = Graph;
      let n = notes;
      // debugger;

      if (notesFetchSuccess) {
        console.debug("[useEffect] notes fetched: " + notes.length);
        editor.storage.mention.notes = notes.filter(
          (note) => note.Deleted == false,
        );
        console.debug(
          "[tiptapEditor] editor.storage.mention.notes length: " +
            editor.storage.mention.notes.length,
        );
      }

      // debugger;
    }, [note, Graph, notesFetchLoading, notes]);

    function itemsQuery({ query, editor }: { query: string; editor: any }) {
      console.debug("[itemsQuery] " + notes?.length);
      const note = editor.storage.mention.note;
      if (!notes)
        if (!notes) {
          console.warn("NO NOTES!");
          return [];
        }

      const res: GraphNode[] = notes.filter(
        (item: GraphNode) =>
          !item.Deleted &&
          item.Id !== note.Id &&
          item.Title.toLowerCase().startsWith(query.toLowerCase()),
      );
      console.debug("[itemsQuery] " + JSON.stringify(res, null, 2));
      return res.map((node) => JSON.stringify(node));
    }

    // useEffect(() => {
    //   if (!editor) return;
    //   let { from, to } = editor.state.selection;
    //   editor.commands.setContent(activeNoteContent, false, {
    //     preserveWhitespace: "full",
    //   });
    //   editor.commands.setTextSelection({ from, to });
    // }, [activeNoteContent]);
    const editor = useEditor(
      {
        // onUpdate: (props) => {
        //   console.log("onupdate");
        //   if (!isLoggedIn) return;
        //   const content = props.editor.getHTML();
        //   if (!connection) alert("no connection");
        //   connection?.invoke(
        //     "BroadcastText",
        //     {
        //       User: loggedInUser,
        //       Room: loggedInUser,
        //     },
        //     content,
        //   );
        // },
        onBlur: (props) => {
          console.log("onblur");
          const content = props.editor.getHTML();
          let firstLine: string = getFirstLine(props.editor.getJSON());
          //
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
                        const id = parsedNote.Id;
                        //

                        referenceMapDispatch({
                          type: ReferenceStateActionType.removeReference,
                          reference: {
                            sourceID: note.Id,
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
              return `${parsedNode.Title}`;
              // return `hello world ...`;
            },

            suggestion: {
              ...suggestion,
              char: "[[",

              items: itemsQuery,
            },

            // suggestion,
          }),
        ],
        content: note.Content,
      },
      [note.Id, note.Content, notesFetchLoading, notes],
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

        <EditorContent
          editor={editor}
          style={{
            // border: "1px solid red",
            minHeight: "95vh",
            cursor: "text",
          }}
        />
      </div>
    );
  },
);
