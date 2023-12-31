import { Redo2, Undo2 } from "lucide-react";
import { MenuItem } from "./MenuItem";
import { Editor } from "@tiptap/core";
import { IconSize } from "./IconSize";
import { LexicalEditor } from "lexical";
import { REDO_COMMAND } from "lexical";

export function Redo({ editor }: { editor: LexicalEditor | null }) {
  function handleClick() {
    if (!editor) return;
    editor.dispatchCommand(REDO_COMMAND, undefined);
    // editor.chain().focus().redo().run();
  }
  return (
    <MenuItem
      value={"redo"}
      ariaLabel={"Redo"}
      isActive={false}
      onClick={handleClick}
    >
      <Redo2 size={IconSize} />
    </MenuItem>
  );
}
