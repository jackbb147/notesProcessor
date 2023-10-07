import { MenuItem } from "./MenuItem";
import { FontBoldIcon } from "@radix-ui/react-icons";

import { Bold } from "lucide-react";
import { Editor } from "@tiptap/core";
import { useEffect, useState } from "react";
import { IconSize } from "./IconSize";
import { LexicalEditor } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";

export function BoldBtn({ editor }: { editor: LexicalEditor | null }) {
  const [isActive, setIsActive] = useState(false);
  function handleClick() {
    if (!editor) return;
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
    // editor.chain().focus().toggleBold().run();
  }

  // useEffect(() => {
  //   editor?.on("selectionUpdate", ({ editor }) => {
  //     if (editor.isActive("bold")) {
  //       console.debug("[bold] is active");
  //       setIsActive(true);
  //     } else {
  //       setIsActive(false);
  //     }
  //   });
  // }, [editor]);

  return (
    <MenuItem
      value={"bold"}
      ariaLabel={"Bold"}
      isActive={isActive}
      onClick={handleClick}
    >
      <Bold size={IconSize} />
    </MenuItem>
  );
}
