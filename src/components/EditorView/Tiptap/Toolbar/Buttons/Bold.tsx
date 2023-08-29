import { MenuItem } from "./MenuItem";
import { FontBoldIcon } from "@radix-ui/react-icons";
import { Editor } from "@tiptap/core";
import { useEffect, useState } from "react";

export function Bold({ editor }: { editor: Editor | null }) {
  const [isActive, setIsActive] = useState(false);
  function handleClick() {
    if (!editor) return;
    editor.chain().focus().toggleBold().run();
  }

  useEffect(() => {
    editor?.on("selectionUpdate", ({ editor }) => {
      if (editor.isActive("bold")) {
        console.debug("[bold] is active");
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    });
  }, [editor]);

  return (
    <MenuItem
      value={"bold"}
      ariaLabel={"Bold"}
      isActive={isActive}
      onClick={handleClick}
    >
      <FontBoldIcon />
    </MenuItem>
  );
}
