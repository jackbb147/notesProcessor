import { GraphNode } from "../../../reducers/GraphReducer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useEffect, useRef, useState } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";
import {
  COMMAND_PRIORITY_HIGH,
  createCommand,
  EditorState,
  LexicalCommand,
  SerializedEditorState,
  SerializedLexicalNode,
  SerializedTextNode,
} from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useKeystrokeShortcutPlugin } from "./useKeystrokeShortcutPlugin";
export const SAVE_COMMAND: LexicalCommand<string> = createCommand();
function getFirstLine(
  json: SerializedEditorState<SerializedLexicalNode>,
): string {
  // debugger;
  let res: string = "";
  // TODO
  var q: SerializedLexicalNode[] = [json.root];

  while (q.length > 0) {
    // debugger;
    var node: SerializedLexicalNode | undefined = q.shift();
    if (!node) continue;

    if (node.type === "text") {
      const textNode: SerializedTextNode = node as SerializedTextNode;
      res = textNode.text ?? "";
      break;
    }

    if ("children" in node) {
      var children = node.children as SerializedLexicalNode[];
      q.push(...children);
    }

    // if (node.content) {
    //   q.push(...node.content);
    // }
  }
  if (res.length < 1) res = "New Note";

  return res;
}

/**
 * When the editor loses focus, we want to update the note in the graph by calling the handleBlur function.
 * @constructor
 */
export function HandleSaveNotePlugin({
  clickedOutside,
  handleSaveNote,
  note,
}: {
  clickedOutside: number;
  handleSaveNote: Function;
  note: GraphNode;
}) {
  const [editor] = useLexicalComposerContext();
  const [clickedInside, setClickedInside] = useState(0);
  const editorUpdated = useRef(0);
  const editorStateRef = useRef<EditorState>();

  useKeystrokeShortcutPlugin({
    editor,
  });
  // useEffect(() => {
  //   return editor.registerTextContentListener((editorState) => {
  //     debugger;
  //     console.warn("editor updated");
  //     setEditorUpdated((prev) => prev + 1);
  //     // setCanUndo(editorState.canUndo());
  //   });
  // }, [editor]);
  // useEffect(() => {
  //   setClickedInside(0);
  //   editor.getEditorState().read(() => {
  //     // TODO get the content of the editor and update the note
  //     // debugger;
  //   });
  //   // debugger;
  // }, [note.Id]);

  // function clickHandler(event: Event) {
  //   console.warn("clicked");
  //   setClickedInside((prev) => prev + 1);
  // }

  function save() {
    // debugger;
    console.info("save command fired");
    // TODO save the note
    // debugger;
    // console.warn("editor updated: " + editorUpdated);
    if (editorUpdated.current < 2) return;
    // debugger;
    const editorState = editor.getEditorState();
    const json = editorState.toJSON();
    editor.update(() => {
      // debugger;
      const content = $generateHtmlFromNodes(editor, null);
      let firstLine: string = getFirstLine(json);
      console.log("firstLine: " + firstLine);
      console.log("content: " + content);
      // TODO somehow await this
      handleSaveNote(firstLine, content);
      //   TODO after saving, do not lose focus!
      console.log("focusing");
      editor.focus();
    });
  }

  useEffect(() => {
    return editor.registerCommand(
      SAVE_COMMAND,
      (payload, editor): boolean => {
        save();
        return true;
      },
      COMMAND_PRIORITY_HIGH,
    );
  }, [editor]);

  useEffect(() => {
    return () => {
      // debugger;
      save();
      // editor.dispatchCommand(SAVE_COMMAND, "");
    };
  }, []);

  // return editor.registerRootListener((rootElement, prevRootElement) => {
  //   //add listeners to the new root element
  //   // debugger;
  //   rootElement?.addEventListener("click", clickHandler);
  //   //remove listeners from the old root element
  // });
  // }, [editorUpdated]);

  // useEffect(() => {
  //   return () => {
  //     // debugger;
  //     // TODO The editor is unmounting. Save the note.
  //     // debugger;
  //     console.warn("unmounting, clickedInside: " + clickedInside);
  //     if (clickedInside === 0) return;
  //     // debugger;
  //     const editorState = editor.getEditorState();
  //     const json = editorState.toJSON();
  //     editorState.read(() => {
  //       // debugger;
  //       const content = $generateHtmlFromNodes(editor, null);
  //       let firstLine: string = getFirstLine(json);
  //       console.log("firstLine: " + firstLine);
  //       console.log("content: " + content);
  //       handleBlur(firstLine, content);
  //     });
  //     // debugger;
  //   };
  // }, [clickedInside]);

  // useEffect(() => {
  //   // alert("hey");
  //   if (!editor || !handleBlur || clickedInside === 0) return;
  //   console.warn("clicked outside");
  //
  //   debugger;
  //   // TODO
  //   const editorState = editor.getEditorState();
  //   const json = editorState.toJSON();
  //   editorState.read(() => {
  //     const content = $generateHtmlFromNodes(editor, null);
  //     let firstLine: string = getFirstLine(json);
  //     console.log("firstLine: " + firstLine);
  //     console.log("content: " + content);
  //     handleBlur(firstLine, content);
  //   });
  //
  //   // handleBlur(firstLine, content);
  // }, [clickedOutside]);
  // useEffect(() => {
  //   return editor.registerRootListener((rootElement, prevRootElement) => {
  //     // debugger;
  //     // add the listener to the current root element
  //     rootElement?.addEventListener("blur", clickHandler);
  //     // remove the listener from the old root element - make sure the ref to myListener
  //     // is stable so the removal works and you avoid a memory leak.
  //     prevRootElement?.removeEventListener("blur", clickHandler);
  //   });
  // }, [editor]);
  return (
    <OnChangePlugin
      ignoreSelectionChange={true}
      onChange={(editorState) => {
        // setEditorUpdated((prev) => prev + 1);
        editorUpdated.current += 1;
        editorStateRef.current = editorState;
      }}
    />
  );
}
