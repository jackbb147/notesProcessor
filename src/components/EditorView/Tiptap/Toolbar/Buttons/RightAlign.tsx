import { TextAlignLeftIcon, TextAlignRightIcon } from "@radix-ui/react-icons";
import * as Toolbar from "@radix-ui/react-toolbar";
import React, { useEffect, useState } from "react";
import { Editor } from "@tiptap/core";
import { MenuItem } from "./MenuItem";
import { AlignRight } from "lucide-react";
import { IconSize } from "./IconSize";

export function RightAlign({ editor }: { editor: Editor | null }) {
  const [isActive, setIsActive] = useState(false);
  function handleClick() {
    if (!editor) return;
    editor.chain().focus().setTextAlign("right").run();
  }

  useEffect(() => {
    editor?.on("selectionUpdate", ({ editor }) => {
      if (editor.isActive({ textAlign: "right" })) {
        console.debug("[right] is active");
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    });
  }, [editor]);
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
