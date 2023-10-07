import React, { useCallback, useEffect, useState } from "react";
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
import { $findMatchingParent } from "@lexical/utils";
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
import { $isAtNodeEnd } from "@lexical/selection";
import { AddReferenceBtn } from "./Buttons/AddReferenceBtn";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  ElementNode,
  RangeSelection,
  SELECTION_CHANGE_COMMAND,
  TextNode,
} from "lexical";
// import { $findMatchingParent } from "lexical/LexicalUtils";

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

export function getSelectedNode(
  selection: RangeSelection,
): TextNode | ElementNode {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
  }
}

export const ToolbarPlugin = () => {
  const [activeEditor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [elementFormat, setElementFormat] = useState("left");

  const $updateToolbar = useCallback(() => {
    console.warn("update toolbar");
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      console.warn(selection.hasFormat("bold"));
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      // setIsStrikethrough(selection.hasFormat("strikethrough"));
      // setIsSubscript(selection.hasFormat("subscript"));
      // setIsSuperscript(selection.hasFormat("superscript"));
      // setIsCode(selection.hasFormat("code"));
      // setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      // if ($isLinkNode(parent) || $isLinkNode(node)) {
      //   setIsLink(true);
      // } else {
      //   setIsLink(false);
      // }

      // const tableNode = $findMatchingParent(node, $isTableNode);
      // if ($isTableNode(tableNode)) {
      //   setRootType("table");
      // } else {
      //   setRootType("root");
      // }

      // if (elementDOM !== null) {
      //   setSelectedElementKey(elementKey);
      //   if ($isListNode(element)) {
      //     const parentList = $getNearestNodeOfType<ListNode>(
      //       anchorNode,
      //       ListNode,
      //     );
      //     const type = parentList
      //       ? parentList.getListType()
      //       : element.getListType();
      //     setBlockType(type);
      //   } else {
      //     const type = $isHeadingNode(element)
      //       ? element.getTag()
      //       : element.getType();
      //     if (type in blockTypeToBlockName) {
      //       setBlockType(type as keyof typeof blockTypeToBlockName);
      //     }
      //     if ($isCodeNode(element)) {
      //       const language =
      //         element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
      //       setCodeLanguage(
      //         language ? CODE_LANGUAGE_MAP[language] || language : "",
      //       );
      //       return;
      //     }
      //   }
      // }
      // Handle buttons
      // setFontSize(
      //   $getSelectionStyleValueForProperty(selection, "font-size", "15px"),
      // );
      // setFontColor(
      //   $getSelectionStyleValueForProperty(selection, "color", "#000"),
      // );
      // setBgColor(
      //   $getSelectionStyleValueForProperty(
      //     selection,
      //     "background-color",
      //     "#fff",
      //   ),
      // );
      // setFontFamily(
      //   $getSelectionStyleValueForProperty(selection, "font-family", "Arial"),
      // );
      setElementFormat(
        ($isElementNode(node)
          ? node.getFormatType()
          : parent?.getFormatType()) || "left",
      );
    }
  }, [activeEditor]);

  useEffect(() => {
    return activeEditor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $updateToolbar();
        // setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [activeEditor, $updateToolbar]);

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
          <Undo editor={activeEditor} />
          <Redo editor={activeEditor} />
        </ToggleGroup>
        <Separator className="w-[1px] bg-mauve6 mx-[10px]" />

        <ToggleGroup type="multiple" aria-label="Text formatting">
          <BoldBtn editor={activeEditor} isActive={isBold} />
          <ItalicBtn editor={activeEditor} isActive={isItalic} />
          <UnderlineBtn editor={activeEditor} isActive={isUnderline} />
        </ToggleGroup>
        <Separator className="w-[1px] bg-mauve6 mx-[10px]" />
        <SelectDemo editor={activeEditor} />
        <Separator className="w-[1px] bg-mauve6 mx-[10px]" />
        <ToggleGroup type="single" aria-label="Text alignment">
          <LeftAlign
            editor={activeEditor}
            isActive={elementFormat === "left"}
          />
          <Center editor={activeEditor} isActive={elementFormat === "center"} />
          <RightAlign
            editor={activeEditor}
            isActive={elementFormat === "right"}
          />
        </ToggleGroup>
        <Separator className="w-[1px] bg-mauve6 mx-[10px]" />
        <ToggleGroup type="single" aria-label="Math">
          <MathBtn editor={activeEditor} />
          <AddReferenceBtn editor={activeEditor} />
        </ToggleGroup>
      </ScrollAreaDemo>
    </Toolbar.Root>
  );
};

export default ToolbarPlugin;
