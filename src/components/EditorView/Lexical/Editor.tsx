import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useEffect } from "react";
import { EditorState } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";

function EmoticonPlugin() {
  return null;
}

function HTMLPlugin() {
  const [editor] = useLexicalComposerContext();

  function onUpdate(editorState: EditorState) {
    // debugger;

    // const raw = $generateHtmlFromNodes(editor, null);
    editorState.read(() => {
      const rawHTML = $generateHtmlFromNodes(editor, null);
      console.log("[onChange] fired. rawHTML: " + rawHTML);
    });
  }

  useEffect(() => {
    // most listeners return a teardown function that can be called to clean them up.
    return editor.registerUpdateListener(({ editorState }) => {
      // call onChange here to pass the latest state up to the parent.
      onUpdate(editorState);
    });
  }, [editor]);
  return null;
}

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
        <HTMLPlugin />
        <HistoryPlugin />
        <EmoticonPlugin />
      </div>
    </LexicalComposer>
  );
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some plain text...</div>;
}
