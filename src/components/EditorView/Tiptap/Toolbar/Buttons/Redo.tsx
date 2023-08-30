import { Redo2, Undo2 } from "lucide-react";
import { MenuItem } from "./MenuItem";
import { Editor } from "@tiptap/core";
import { IconSize } from "./IconSize";

export function Redo({ editor }: { editor: Editor | null }) {
  function handleClick() {
    if (!editor) return;
    editor.chain().focus().redo().run();
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
