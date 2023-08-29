import { MenuItem } from "./MenuItem";
import { UnderlineIcon } from "@radix-ui/react-icons";
import { Editor } from "@tiptap/core";
import { useEffect, useState } from "react";

export function Underline({ editor }: { editor: Editor | null }) {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    if (!editor) return;
    editor.chain().focus().toggleUnderline().run();
  }

  useEffect(() => {
    editor?.on("selectionUpdate", ({ editor }) => {
      if (editor.isActive("underline")) {
        console.debug("[underline] is active");
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    });
  }, [editor]);
  return (
    <MenuItem
      value={"underline"}
      ariaLabel={"Underline"}
      isActive={isActive}
      onClick={handleClick}
    >
      <UnderlineIcon />
    </MenuItem>
  );
}
