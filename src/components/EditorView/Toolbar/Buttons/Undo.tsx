import { Undo2 } from "lucide-react";
import { FontBoldIcon } from "@radix-ui/react-icons";
import { MenuItem } from "./MenuItem";
// import { Editor } from "@tiptap/core";
import { LexicalEditor } from "lexical";
import { IconSize } from "./IconSize";
import { UNDO_COMMAND } from "lexical";

export function Undo({ editor }: { editor: LexicalEditor | null }) {
  function handleClick() {
    if (!editor) {
      return;
    }
    // TODO
    editor.dispatchCommand(UNDO_COMMAND, undefined);
    // editor.chain().focus().undo().run();
  }
  return (
    <MenuItem
      value={"undo"}
      ariaLabel={"Undo"}
      isActive={false}
      onClick={handleClick}
    >
      <Undo2 size={IconSize} />
    </MenuItem>
  );
}
