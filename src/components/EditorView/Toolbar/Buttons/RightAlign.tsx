import { TextAlignLeftIcon, TextAlignRightIcon } from "@radix-ui/react-icons";
import * as Toolbar from "@radix-ui/react-toolbar";
import React, { useEffect, useState } from "react";
import { Editor } from "@tiptap/core";
import { MenuItem } from "./MenuItem";
import { AlignRight } from "lucide-react";
import { IconSize } from "./IconSize";
import { FORMAT_ELEMENT_COMMAND, LexicalEditor } from "lexical";

export function RightAlign({
  editor,
  isActive,
}: {
  editor: LexicalEditor | null;
  isActive: boolean;
}) {
  function handleClick() {
    if (!editor) return;
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
  }

  // useEffect(() => {
  //   editor?.on("transaction", ({ editor }) => {
  //     if (editor.isActive({ textAlign: "right" })) {
  //       console.debug("[right] is active");
  //       setIsActive(true);
  //     } else {
  //       setIsActive(false);
  //     }
  //   });
  // }, [editor]);
  return (
    <MenuItem
      value={"right"}
      ariaLabel={"Right aligned"}
      isActive={isActive}
      onClick={handleClick}
    >
      <AlignRight size={IconSize} />
    </MenuItem>
  );
}
