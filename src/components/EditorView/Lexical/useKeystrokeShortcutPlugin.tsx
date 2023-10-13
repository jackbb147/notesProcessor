import { useEffect } from "react";
import { SAVE_COMMAND } from "./HandleSaveNotePlugin";
import {
  $getSelection,
  $isTextNode,
  EditorState,
  LexicalEditor,
  RangeSelection,
  TextNode,
} from "lexical";
import {
  INSERT_DOUBLE_DOLLAR_COMMAND,
  REMOVE_DOUBLE_DOLLAR_COMMAND,
} from "./HandleInsertDoubleDollarSignShortcutPlugin";
import { $isRangeSelection } from "lexical";

export function useKeystrokeShortcutPlugin({
  editor,
}: {
  editor: LexicalEditor;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // "Ctrl" or "Cmd" + "s"

      // "Ctrl" or "Cmd" + "s"
      if ((event.ctrlKey || event.metaKey) && event.which === 83) {
        editor.dispatchCommand(SAVE_COMMAND, "");
        event.preventDefault();
      }

      if (event.shiftKey && event.code === "Digit4") {
        // alert("Shift + 4 pressed!");
        editor.dispatchCommand(INSERT_DOUBLE_DOLLAR_COMMAND, "");
        // event.preventDefault();
      }

      if (event.key === "Backspace") {
        // alert("backspace pressed!");
        // debugger;
        // event.preventDefault();
        editor.dispatchCommand(REMOVE_DOUBLE_DOLLAR_COMMAND, "");
      }
    };

    const removeRootListener = editor.registerRootListener(
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

    const removeUpdateListener = editor.registerUpdateListener(
      ({ editorState, prevEditorState }) => {
        function getChar(state: EditorState): string[] | undefined {
          const selection = state._selection;

          if (selection && "anchor" in selection) {
            var s = selection as RangeSelection;
            var offset = s.anchor.offset;
            let key = s.anchor.key;
            let node = state._nodeMap.get(key);
            if ($isTextNode(node)) {
              let textNode = node as TextNode;
              let textContent = textNode.__text;
              let res = [textContent[offset]];
              if (offset > 0) res.push(textContent[offset - 1]);
              return res;
            } else {
              return undefined;
            }
          }
          return undefined;
        }

        /**
         * Returns true if the user presses backspace in between two dollar signs.
         * @param state
         * @param prevState
         */
        function isDeletingDoubleDollarSign(
          state: EditorState,
          prevState: EditorState,
        ): boolean {
          const prevChar = getChar(prevEditorState);
          var char = getChar(state);
          const isRangeSelection = (
            selection: any,
          ): RangeSelection | undefined => {
            return $isRangeSelection(selection)
              ? (selection as RangeSelection)
              : undefined;
          };
          const selection = isRangeSelection(state._selection);
          const prevSelection = isRangeSelection(prevState._selection);

          // debugger;
          if (
            char &&
            char[0] === "$" &&
            char[1] !== "$" &&
            prevChar &&
            prevChar[0] === "$" &&
            selection &&
            prevSelection
          ) {
            //   TODO
            return true;
          }

          return false;
        }

        editor.update(() => {
          let s = $getSelection();

          if (!$isRangeSelection(s)) return;
          s = s as RangeSelection;
          if (isDeletingDoubleDollarSign(editorState, prevEditorState)) {
            //   TODO
            // debugger;
            let node = editorState._nodeMap.get(s.anchor.key);
            if (!$isTextNode(node)) return;
            // debugger;
            node.spliceText(s.anchor.offset, 1, "");
          }
        });
        // debugger;
      },
    );

    return () => {
      removeRootListener();
      removeUpdateListener();
    };
  }, [editor]);
}
