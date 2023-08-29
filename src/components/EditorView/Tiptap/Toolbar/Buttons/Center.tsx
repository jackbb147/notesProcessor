import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import * as Toolbar from "@radix-ui/react-toolbar";
import React from "react";
import { Editor } from "@tiptap/core";

export function Center({ editor }: { editor: Editor | null }) {
  function handleClick() {
    if (!editor) return;
    editor.chain().focus().setTextAlign("center").run();
  }
  return (
    <Toolbar.ToggleItem
      className="flex-shrink-0 flex-grow-0 basis-auto  h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center  ml-0.5 outline-none hover:bg-grey hover:text-violet11  focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
      value="center"
      aria-label="center aligned"
    >
      <TextAlignCenterIcon onClick={handleClick} />
    </Toolbar.ToggleItem>
  );
}
