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
import { BoldBtn } from "./Buttons/BoldBtn";
import { ItalicBtn } from "./Buttons/ItalicBtn";
import { UnderlineBtn } from "./Buttons/UnderlineBtn";
import { Undo } from "./Buttons/Undo";
import { Redo } from "./Buttons/Redo";
import { LeftAlign } from "./Buttons/LeftAlign";
import { Center } from "./Buttons/Center";
import { RightAlign } from "./Buttons/RightAlign";
import SelectDemo from "./Buttons/Select";
import { ScrollAreaDemo } from "./ScrollArea";
import { styled } from "@stitches/react";
import { MathBtn } from "./Buttons/MathBtn";
import { AddReferenceBtn } from "./Buttons/AddReferenceBtn";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const ToggleGroup = styled(Toolbar.ToggleGroup, {
  display: "flex",
  paddingTop: "5px",
  paddingBottom: "5px",
});

const Separator = styled(Toolbar.Separator, {
  marginRight: "13px",
  marginLeft: "10px",
  backgroundColor: "hsl(0deg 0% 80%)",
  width: "1px",
  marginTop: "9px",
  marginBottom: "9px",
});

export const MyToolbar = () => {
  const [editor] = useLexicalComposerContext();
  return (
    <Toolbar.Root
      className="flex w-full  sticky overflow-hidden  top-0 bg-white z-40 dark:bg-dark_primary"
      aria-label="Formatting options"
      style={{
        paddingBottom: "2px",
      }}
      onClick={(e) => {
        e.stopPropagation(); // this is to allow the editor, excluding the toolbar,  to be clicked on in order to focus the editor
      }}
    >
      <ScrollAreaDemo>
        <ToggleGroup type="multiple" aria-label="History">
          <Undo editor={editor} />
          <Redo editor={editor} />
        </ToggleGroup>
        <Separator className="w-[1px] bg-mauve6 mx-[10px]" />

        <ToggleGroup type="multiple" aria-label="Text formatting">
          <BoldBtn editor={editor} />
          <ItalicBtn editor={editor} />
          <UnderlineBtn editor={editor} />
        </ToggleGroup>
        <Separator className="w-[1px] bg-mauve6 mx-[10px]" />
        <SelectDemo editor={editor} />
        <Separator className="w-[1px] bg-mauve6 mx-[10px]" />
        <ToggleGroup type="single" aria-label="Text alignment">
          <LeftAlign editor={editor} />
          <Center editor={editor} />
          <RightAlign editor={editor} />
        </ToggleGroup>
        <Separator className="w-[1px] bg-mauve6 mx-[10px]" />
        <ToggleGroup type="single" aria-label="Math">
          <MathBtn editor={editor} />
          <AddReferenceBtn editor={editor} />
        </ToggleGroup>
      </ScrollAreaDemo>
    </Toolbar.Root>
  );
};

export default MyToolbar;
