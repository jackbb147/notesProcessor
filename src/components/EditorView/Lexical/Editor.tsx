import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useEffect } from "react";
import { $getRoot, $insertNodes, EditorState } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { UpdateHandlerPlugin } from "./UpdateHandlerPlugin";
import { GraphNode } from "../../../reducers/GraphReducer";
import { $generateNodesFromDOM } from "@lexical/html";

function HTMLToLexicalPlugin({ html }: { html: string }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      // Select the root
      const root = $getRoot();
      root.clear();
      root.select();

      // Insert them at a selection.
      $insertNodes(nodes);
    });
  }, [html]);
  return null;
}

export function Editor({ note }: { note: GraphNode }) {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "editor",
        onError: (error) => {
          console.log("error: ", error);
        },
      }}
    >
      <div className="editor-container">
        <PlainTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        {/*<OnChangePlugin onChange={onChange} ignoreSelectionChange />*/}
        <UpdateHandlerPlugin />
        <HTMLToLexicalPlugin html={note.Content} />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some plain text...</div>;
}
