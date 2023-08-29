import { TextAlignLeftIcon, TextAlignRightIcon } from "@radix-ui/react-icons";
import * as Toolbar from "@radix-ui/react-toolbar";
import React from "react";
import { Editor } from "@tiptap/core";
import { MenuItem } from "./MenuItem";

export function RightAlign({ editor }: { editor: Editor | null }) {
  function handleClick() {
    if (!editor) return;
    editor.chain().focus().setTextAlign("right").run();
  }
  return (
    <MenuItem
      value={"right"}
      ariaLabel={"Right aligned"}
      isActive={false}
      onClick={handleClick}
    >
      <TextAlignRightIcon />
    </MenuItem>
  );
}
