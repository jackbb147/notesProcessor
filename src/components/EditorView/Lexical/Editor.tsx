import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useEffect } from "react";
import {
  $getRoot,
  $insertNodes,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  EditorState,
  LexicalCommand,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { UpdateHandlerPlugin } from "./UpdateHandlerPlugin";
import { GraphNode } from "../../../reducers/GraphReducer";

import { $createInlineMathNode, InlineMathNode } from "./Math/InlineMathNode";
import { HTMLToLexicalPlugin } from "./HTMLToLexicalPlugin";
import { $insertNodeToNearestRoot } from "@lexical/utils";
export const INSERT_INLINE_MATH_COMMAND: LexicalCommand<string> =
  createCommand();

export function InlineMathPlugin() {
  const [editor] = useLexicalComposerContext();
  function handleButtonPress() {
    // alert("Button Pressed!");
    editor.dispatchCommand(INSERT_INLINE_MATH_COMMAND, "test");
  }
  useEffect(() => {
    if (!editor.hasNodes([InlineMathNode])) {
      throw new Error(
        "[InlineMathPlugin]: InlineMathNode not registered on editor (initialConfig.nodes)",
      );
    }

    return editor.registerCommand<string>(
      INSERT_INLINE_MATH_COMMAND,
      (payload) => {
        const inlineMathNode = $createInlineMathNode(payload);
        $insertNodeToNearestRoot(inlineMathNode);

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);
  return <button onClick={handleButtonPress}>Press Me</button>;
}

export function Editor({ note }: { note: GraphNode }) {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "editor",
        nodes: [InlineMathNode],
        onError: (error) => {
          console.log("error: ", error);
        },
      }}
    >
      <div className="editor-container">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        {/*<OnChangePlugin onChange={onChange} ignoreSelectionChange />*/}
        <UpdateHandlerPlugin />
        <HTMLToLexicalPlugin html={note.Content} />
        <HistoryPlugin />
        <InlineMathPlugin />
      </div>
    </LexicalComposer>
  );
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some plain text...</div>;
}
