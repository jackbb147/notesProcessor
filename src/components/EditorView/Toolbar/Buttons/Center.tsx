import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import * as Toolbar from "@radix-ui/react-toolbar";
import React, { useEffect, useState } from "react";
import { Editor } from "@tiptap/core";
import { MenuItem } from "./MenuItem";
import { AlignCenter } from "lucide-react";
import { IconSize } from "./IconSize";
import { FORMAT_ELEMENT_COMMAND, LexicalEditor } from "lexical";

export function Center({
  editor,
  isActive,
}: {
  editor: LexicalEditor | null;
  isActive: boolean;
}) {
  function handleClick() {
    if (!editor) return;
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
    // editor.chain().focus().setTextAlign("center").run();
  }
  // useEffect(() => {
  //   editor?.on("transaction", ({ editor }) => {
  //     if (editor.isActive({ textAlign: "center" })) {
  //       setIsActive(true);
  //     } else {
  //       setIsActive(false);
  //     }
  //   });
  // }, [editor]);
  return (
    <MenuItem
      value={"center"}
      ariaLabel={"center aligned"}
      isActive={isActive}
      onClick={handleClick}
    >
      <AlignCenter size={IconSize} />
    </MenuItem>
  );
}
