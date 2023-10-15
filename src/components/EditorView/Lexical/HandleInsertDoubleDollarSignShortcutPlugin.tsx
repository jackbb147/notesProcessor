import {
  $createTextNode,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_HIGH,
  createCommand,
  EditorState,
  LexicalCommand,
} from "lexical";
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNearestBlockElementAncestorOrThrow } from "@lexical/utils";
export const INSERT_DOUBLE_DOLLAR_COMMAND: LexicalCommand<string> =
  createCommand();

export const REMOVE_DOUBLE_DOLLAR_COMMAND: LexicalCommand<string> =
  createCommand();

export function HandleInsertDoubleDollarSignShortcutPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerCommand(
      INSERT_DOUBLE_DOLLAR_COMMAND,
      (payload, editor): boolean => {
        // save();
        // TODO
        // debugger;
        editor.update(() => {
          //   TODO insert double dollar sign
          const selection = $getSelection();
          const node = selection?.getNodes()[0];
          if (!node) return false;

          const doubleDollarSign = $createTextNode("$$");
          const parent = $getNearestBlockElementAncestorOrThrow(node);
          console.log("parent: ");
          console.dir(parent);
          // debugger;
          if ($isTextNode(node) && $isRangeSelection(selection)) {
            //   TODO
            //1. split text node into two text nodes
            const offset = selection.anchor.offset;
            // debugger;
            const [first, second] = node.splitText(offset);
            //2. insert double dollar sign in between
            first.insertAfter(doubleDollarSign);
          } else {
            //   TODO
            debugger;
            parent.append(doubleDollarSign);
          }
          // node.insertAfter(doubleDollarSign);
          doubleDollarSign.select(1, 1);

          // debugger;
        });
        return true;
      },
      COMMAND_PRIORITY_HIGH,
    );
  }, [editor]);

  return null;
}
