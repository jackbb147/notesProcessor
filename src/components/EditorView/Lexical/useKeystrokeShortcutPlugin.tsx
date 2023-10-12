import { useEffect } from "react";
import { SAVE_COMMAND } from "./HandleSaveNotePlugin";
import { LexicalEditor } from "lexical";

export function useKeystrokeShortcutPlugin({
  editor,
}: {
  editor: LexicalEditor;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // "Ctrl" or "Cmd" + "s"
      if ((event.ctrlKey || event.metaKey) && event.which === 83) {
        editor.dispatchCommand(SAVE_COMMAND, "");
        event.preventDefault();
      }
    };

    return editor.registerRootListener(
      (
        rootElement: HTMLElement | null,
        prevRootElement: HTMLElement | null,
      ) => {
        if (prevRootElement !== null) {
          prevRootElement.removeEventListener("keydown", onKeyDown);
        }
        if (rootElement !== null) {
          rootElement.addEventListener("keydown", onKeyDown);
        }
      },
    );
  }, [editor]);
}
