import { MenuItem } from "./MenuItem";
import { FontBoldIcon } from "@radix-ui/react-icons";
import { Editor } from "@tiptap/core";

export function Bold({ editor }: { editor: Editor | null }) {
  function handleClick() {
    if (!editor) return;
    editor.chain().focus().toggleBold().run();
  }
  return (
    <MenuItem value={"bold"} ariaLabel={"Bold"}>
      <FontBoldIcon onClick={handleClick} />
    </MenuItem>
  );
}
