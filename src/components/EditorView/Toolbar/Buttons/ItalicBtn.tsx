import { MenuItem } from "./MenuItem";
import { FontItalicIcon } from "@radix-ui/react-icons";
import { Editor } from "@tiptap/core";
import { useEffect, useState } from "react";
import { Italic } from "lucide-react";
import { IconSize } from "./IconSize";
import { LexicalEditor } from "lexical";

export function ItalicBtn({ editor }: { editor: LexicalEditor | null }) {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    if (!editor) return;
    // editor.chain().focus().toggleItalic().run();
  }

  // useEffect(() => {
  //   editor?.on("selectionUpdate", ({ editor }) => {
  //     if (editor.isActive("italic")) {
  //       console.debug("[italic] is active");
  //       setIsActive(true);
  //     } else {
  //       setIsActive(false);
  //     }
  //   });
  // }, [editor]);
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
