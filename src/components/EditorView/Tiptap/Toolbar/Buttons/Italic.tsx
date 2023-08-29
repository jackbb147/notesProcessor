import { MenuItem } from "./MenuItem";
import { FontItalicIcon } from "@radix-ui/react-icons";
import { Editor } from "@tiptap/core";

export function Italic({ editor }: { editor: Editor | null }) {
  return (
    <MenuItem value={"italic"} ariaLabel={"Italic"}>
      <FontItalicIcon />
    </MenuItem>
  );
}
