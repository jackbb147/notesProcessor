import React from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
} from "@radix-ui/react-icons";

import { MenuItem } from "./Buttons/MenuItem";
import { Editor } from "@tiptap/core";
import { Bold } from "./Buttons/Bold";
import { Italic } from "./Buttons/Italic";
import { Underline } from "./Buttons/Underline";

export const MyToolbar = ({ editor }: { editor: Editor | null }) => (
  <Toolbar.Root
    className="flex w-full  p-[5px] min-w-max  border-b "
    aria-label="Formatting options"
  >
    <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
      <Bold editor={editor} />
      <Italic editor={editor} />
      <Underline editor={editor} />
    </Toolbar.ToggleGroup>
    <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />
    <Toolbar.ToggleGroup type="single" aria-label="Text alignment">
      <Toolbar.ToggleItem
        className="flex-shrink-0 flex-grow-0 basis-auto  h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center  ml-0.5 outline-none hover:bg-grey hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
        value="left"
        aria-label="Left aligned"
      >
        <TextAlignLeftIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="flex-shrink-0 flex-grow-0 basis-auto  h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center  ml-0.5 outline-none hover:bg-grey hover:text-violet11  focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
        value="center"
        aria-label="Right aligned"
      >
        <TextAlignRightIcon />
      </Toolbar.ToggleItem>
      {/*<Toolbar.ToggleItem*/}
      {/*  className="flex-shrink-0 flex-grow-0 basis-auto  h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center  ml-0.5 outline-none hover:bg-grey hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"*/}
      {/*  value="center"*/}
      {/*  aria-label="Center aligned"*/}
      {/*>*/}
      {/*  <TextAlignCenterIcon />*/}
      {/*</Toolbar.ToggleItem>*/}
      <Toolbar.ToggleItem
        className="flex-shrink-0 flex-grow-0 basis-auto  h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center  ml-0.5 outline-none hover:bg-grey hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
        value="right"
        aria-label="Right aligned"
      >
        <TextAlignRightIcon />
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
  </Toolbar.Root>
);

export default MyToolbar;
