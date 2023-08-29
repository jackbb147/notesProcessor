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
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Select from "@radix-ui/react-select";

import { MenuItem } from "./Buttons/MenuItem";
import { Editor } from "@tiptap/core";
import { Bold } from "./Buttons/Bold";
import { Italic } from "./Buttons/Italic";
import { Underline } from "./Buttons/Underline";
import { Undo } from "./Buttons/Undo";
import { Redo } from "./Buttons/Redo";
import { LeftAlign } from "./Buttons/LeftAlign";
import { Center } from "./Buttons/Center";
import { RightAlign } from "./Buttons/RightAlign";
import SelectDemo from "./Buttons/Select";

export const MyToolbar = ({ editor }: { editor: Editor | null }) => (
  <Toolbar.Root
    className="flex w-full  p-[5px] min-w-max  border-b "
    aria-label="Formatting options"
  >
    <Toolbar.ToggleGroup type="multiple" aria-label="History">
      <Undo editor={editor} />
      <Redo editor={editor} />
    </Toolbar.ToggleGroup>
    <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />
    <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
      <Bold editor={editor} />
      <Italic editor={editor} />
      <Underline editor={editor} />
    </Toolbar.ToggleGroup>
    <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />
    <SelectDemo />
    <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />
    <Toolbar.ToggleGroup type="single" aria-label="Text alignment">
      <LeftAlign editor={editor} />
      <Center editor={editor} />
      <RightAlign editor={editor} />
    </Toolbar.ToggleGroup>
    <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />
  </Toolbar.Root>
);

export default MyToolbar;
