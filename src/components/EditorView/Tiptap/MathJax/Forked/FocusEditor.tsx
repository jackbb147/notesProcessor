import { IAceEditor } from "react-ace/lib/types";

export function FocusEditor(editor: IAceEditor) {
  setTimeout(() => {
    editor.focus();
  }, 50);
}
