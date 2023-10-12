import { COMMAND_PRIORITY_HIGH, createCommand, LexicalCommand } from "lexical";
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export const INSERT_DOUBLE_DOLLAR_COMMAND: LexicalCommand<string> =
  createCommand();

export function HandleInsertDoubleDollarSignShortcutPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerCommand(
      INSERT_DOUBLE_DOLLAR_COMMAND,
      (payload, editor): boolean => {
        // save();
        // TODO
        debugger;

        return true;
      },
      COMMAND_PRIORITY_HIGH,
    );
  }, [editor]);

  return null;
}
