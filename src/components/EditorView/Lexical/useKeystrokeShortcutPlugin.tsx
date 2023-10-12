import { useEffect } from "react";
import { SAVE_COMMAND } from "./HandleSaveNotePlugin";
import { LexicalEditor } from "lexical";
import { INSERT_DOUBLE_DOLLAR_COMMAND } from "./HandleInsertDoubleDollarSignShortcutPlugin";

export function useKeystrokeShortcutPlugin({
  editor,
}: {
  editor: LexicalEditor;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // "Ctrl" or "Cmd" + "s"

      if (event.shiftKey && event.code === "Digit4") {
        // alert("Shift + 4 pressed!");
        editor.dispatchCommand(INSERT_DOUBLE_DOLLAR_COMMAND, "");
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
