import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes } from "@lexical/html";
export function UpdateHandlerPlugin() {
  const [editor] = useLexicalComposerContext();

  function onUpdate(editorState: EditorState) {
    // debugger;

    // const raw = $generateHtmlFromNodes(editor, null);
    editorState.read(() => {
      const rawHTML = $generateHtmlFromNodes(editor, null);
      console.log("[onChange] fired. rawHTML: " + rawHTML);
    });
  }

  return <OnChangePlugin onChange={onUpdate} ignoreSelectionChange />;
}
