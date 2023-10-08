import { Bold, RailSymbol } from "lucide-react";
import { useEffect, useState } from "react";
import { MenuItem } from "./MenuItem";
import { IconSize } from "./IconSize";
import { Editor } from "@tiptap/core";
import { LexicalEditor } from "lexical";

export function AddReferenceBtn({ editor }: { editor: LexicalEditor | null }) {
  const [isActive, setIsActive] = useState(false);
  // function handleClick() {
  //   if (!editor) return;
  //   const selection = editor.state.selection;
  //   const currentPos = selection.$anchor.pos; // this is the current position of the cursor
  //   console.log("selection", selection);
  //   // editor.chain().focus().insertContent("[[").run();
  //   // editor.chain().focus().toggleBold().run();
  // }

  // useEffect(() => {
  //     editor?.on("selectionUpdate", ({ editor }) => {
  //         if (editor.isActive("bold")) {
  //             console.debug("[bold] is active");
  //             setIsActive(true);
  //         } else {
  //             setIsActive(false);
  //         }
  //     });
  // }, [editor]);

  return (
    <MenuItem
      value={"bold"}
      ariaLabel={"Bold"}
      isActive={isActive}
      // onClick={handleClick}
    >
      <RailSymbol size={IconSize} />
    </MenuItem>
  );
}
