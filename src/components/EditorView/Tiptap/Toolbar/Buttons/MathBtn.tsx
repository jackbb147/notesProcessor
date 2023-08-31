import { Pi } from "lucide-react";
import { Editor } from "@tiptap/core";
import { MenuItem } from "./MenuItem";
import { IconSize } from "./IconSize";

export function MathBtn({ editor }: { editor: Editor | null }) {
  function handleClick() {
    if (!editor) return;
    // TODO - insert math
    editor
      .chain()
      .focus()
      .insertContent(`<react-component>\vec{F} = m\vec{a}</react-component>`)
      .run();
  }
  return (
    <MenuItem
      value={"math"}
      ariaLabel={"Math"}
      isActive={false}
      onClick={handleClick}
    >
      <Pi size={IconSize} />
    </MenuItem>
  );
}
