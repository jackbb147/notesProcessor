import { MenuItem } from "./MenuItem";
import { FontItalicIcon } from "@radix-ui/react-icons";
import { Editor } from "@tiptap/core";
import { useEffect, useState } from "react";
import { Italic } from "lucide-react";
import { IconSize } from "./IconSize";
import { FORMAT_TEXT_COMMAND, LexicalEditor } from "lexical";

export function ItalicBtn({ editor }: { editor: LexicalEditor | null }) {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    if (!editor) return;
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  }

  return (
    <MenuItem
      value={"italic"}
      ariaLabel={"Italic"}
      isActive={isActive}
      onClick={handleClick}
    >
      <Italic size={IconSize} />
    </MenuItem>
  );
}
