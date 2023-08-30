import { Undo2 } from "lucide-react";
import { FontBoldIcon } from "@radix-ui/react-icons";
import { MenuItem } from "./MenuItem";
import { Editor } from "@tiptap/core";
import { IconSize } from "./IconSize";

export function Undo({ editor }: { editor: Editor | null }) {
  function handleClick() {
    if (!editor) {
      return;
    }
    editor.chain().focus().undo().run();
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
