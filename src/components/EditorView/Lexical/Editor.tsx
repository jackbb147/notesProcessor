import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useEffect } from "react";
import { EditorState } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { UpdateHandlerPlugin } from "./UpdateHandlerPlugin";

export function Editor() {
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
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some plain text...</div>;
}
