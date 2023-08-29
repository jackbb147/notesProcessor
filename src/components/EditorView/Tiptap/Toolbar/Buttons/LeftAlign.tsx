import { TextAlignLeftIcon } from "@radix-ui/react-icons";
import * as Toolbar from "@radix-ui/react-toolbar";
import React from "react";
import { Editor } from "@tiptap/core";
import { MenuItem } from "./MenuItem";

export function LeftAlign({ editor }: { editor: Editor | null }) {
  function handleClick() {
    if (!editor) return;
    editor.chain().focus().setTextAlign("left").run();
  }
  return (
    <MenuItem
      value={"left"}
      ariaLabel={"Left aligned"}
      isActive={false}
      onClick={handleClick}
    >
      <TextAlignLeftIcon />
    </MenuItem>
  );
}
