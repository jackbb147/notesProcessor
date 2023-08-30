import { TextAlignLeftIcon } from "@radix-ui/react-icons";
import * as Toolbar from "@radix-ui/react-toolbar";
import React, { useEffect, useState } from "react";
import { Editor } from "@tiptap/core";
import { MenuItem } from "./MenuItem";

export function LeftAlign({ editor }: { editor: Editor | null }) {
  const [isActive, setIsActive] = useState(false);
  function handleClick() {
    if (!editor) return;
    editor.chain().focus().setTextAlign("left").run();
  }
  useEffect(() => {
    editor?.on("transaction", ({ editor }) => {
      if (editor.isActive({ textAlign: "left" })) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    });
  }, [editor]);
  return (
    <MenuItem
      value={"left"}
      ariaLabel={"Left aligned"}
      isActive={isActive}
      onClick={handleClick}
    >
      <TextAlignLeftIcon />
    </MenuItem>
  );
}
