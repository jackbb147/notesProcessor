import { MenuItem } from "./MenuItem";
import { UnderlineIcon } from "@radix-ui/react-icons";
import { Editor } from "@tiptap/core";
import { useEffect, useState } from "react";
import { Underline } from "lucide-react";
import { IconSize } from "./IconSize";
import { FORMAT_TEXT_COMMAND, LexicalEditor } from "lexical";

export function UnderlineBtn({
  editor,
  isActive,
}: {
  editor: LexicalEditor | null;
  isActive: boolean;
}) {
  function handleClick() {
    if (!editor) return;
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
    // editor.chain().focus().toggleUnderline().run();
  }

  // useEffect(() => {
  //   editor?.on("selectionUpdate", ({ editor }) => {
  //     if (editor.isActive("underline")) {
  //       console.debug("[underline] is active");
  //       setIsActive(true);
  //     } else {
  //       setIsActive(false);
  //     }
  //   });
  // }, [editor]);
  return (
    <MenuItem
      value={"underline"}
      ariaLabel={"Underline"}
      isActive={isActive}
      onClick={handleClick}
    >
      <Underline size={IconSize} />
    </MenuItem>
  );
}
