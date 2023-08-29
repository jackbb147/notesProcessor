import { MenuItem } from "./MenuItem";
import { FontBoldIcon } from "@radix-ui/react-icons";
import { Editor } from "@tiptap/core";

export function Bold({ editor }: { editor: Editor }) {
  return (
    <MenuItem value={"bold"} ariaLabel={"Bold"}>
      <FontBoldIcon />
    </MenuItem>
  );
}
