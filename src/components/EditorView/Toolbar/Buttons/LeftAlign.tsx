import { TextAlignLeftIcon } from "@radix-ui/react-icons";
import * as Toolbar from "@radix-ui/react-toolbar";
import React, { useEffect, useState } from "react";
import { Editor } from "@tiptap/core";
import { MenuItem } from "./MenuItem";
import { AlignLeft } from "lucide-react";
import { IconSize } from "./IconSize";
import { FORMAT_ELEMENT_COMMAND, LexicalEditor } from "lexical";

export function LeftAlign({ editor }: { editor: LexicalEditor | null }) {
  const [isActive, setIsActive] = useState(false);
  function handleClick() {
    if (!editor) return;
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
    // editor.chain().focus().setTextAlign("left").run();
  }
  // useEffect(() => {
  //   editor?.on("transaction", ({ editor }) => {
  //     if (editor.isActive({ textAlign: "left" })) {
  //       setIsActive(true);
  //     } else {
  //       setIsActive(false);
  //     }
  //   });
  // }, [editor]);
  return (
    <MenuItem
      value={"left"}
      ariaLabel={"Left aligned"}
      isActive={isActive}
      onClick={handleClick}
    >
      <AlignLeft size={IconSize} />
    </MenuItem>
  );
}
