import React, { useEffect, useState } from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { Editor } from "@tiptap/core";
import { Level } from "@tiptap/extension-heading";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  DEPRECATED_$isGridSelection,
  LexicalEditor,
} from "lexical";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text";
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
  $setBlocksType,
} from "@lexical/selection";
import { blockTypeToBlockName } from "../ToolbarPlugin";

const SelectItem = React.forwardRef(
  (
    {
      children,
      className,
      value,
      onClick,
      ...props
    }: {
      children: React.ReactNode;
      value: string;
      className?: string;
      onClick?: () => void;
    },
    forwardedRef: any,
  ) => {
    return (
      <Select.Item
        value={value}
        className={classnames(
          "text-[13px]  text-white leading-none  rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-white data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-white",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  },
);

const enum Formats {
  normal = "normal",
  heading1 = "heading1",
  heading2 = "heading2",
  heading3 = "heading3",
}

// https://github.com/facebook/lexical/blob/9a679ecb2fa3ca999772e2a170f4ad15d19d4635/packages/lexical-playground/src/plugins/ToolbarPlugin/index.tsx#L101
const HeadingSelector = ({
  editor,
  defaultValue,
}: {
  editor: LexicalEditor | null;
  defaultValue: keyof typeof blockTypeToBlockName;
}) => {
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    // console.warn("defaultValue", defaultValue);
    switch (defaultValue) {
      case "paragraph":
        setValue(Formats.normal);
        break;
      case "h1":
        setValue(Formats.heading1);
        break;
      case "h2":
        setValue(Formats.heading2);
        break;
    }
  }, [defaultValue]);
  const formatHeading = (headingSize: HeadingTagType) => {
    // if (blockType !== headingSize) {
    editor?.update(() => {
      const selection = $getSelection();
      if (
        $isRangeSelection(selection) ||
        DEPRECATED_$isGridSelection(selection)
      ) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
    // }
  };

  const formatParagraph = () => {
    editor?.update(() => {
      const selection = $getSelection();
      if (
        $isRangeSelection(selection) ||
        DEPRECATED_$isGridSelection(selection)
      ) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };
  function handleValueChange(newValue: string) {
    if (!editor) return;
    switch (newValue) {
      case Formats.heading1:
        // editor?.chain().focus().toggleHeading({ level: 1 }).run();
        formatHeading("h1");
        break;
      case Formats.heading2:
        formatHeading("h2");
        // editor?.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case Formats.normal:
        formatParagraph();
        break;
    }
    setValue(newValue);
  }

  return (
    <Select.Root
      value={value}
      onValueChange={(val) => {
        handleValueChange(val);
      }}
    >
      <Select.Trigger
        className="inline-flex items-center justify-center rounded px-[5px] text-[13px] leading-none  hover:bg-grey hover:text-violet11 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none"
        aria-label="Food"
      >
        <Select.Value placeholder="Select a fruit…" />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position={"popper"}
          side={"bottom"}
          className="overflow-hidden  bg-dark_secondary rounded-md"
        >
          <Select.ScrollUpButton className="flex items-center justify-center h-[15px] bg-white cursor-default">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="">
            <Select.Group className={"heading-selector"}>
              <Select.Label className="px-[15px] text-xs leading-[25px] text-mauve11">
                Fruits
              </Select.Label>
              <SelectItem value={Formats.normal}>Normal</SelectItem>
              <SelectItem value={Formats.heading1}>Heading 1</SelectItem>
              <SelectItem value={Formats.heading2}>Heading 2</SelectItem>
              {/*<SelectItem value="banana">Banana</SelectItem>*/}
              {/*<SelectItem value="blueberry">Blueberry</SelectItem>*/}
              {/*<SelectItem value="grapes">Grapes</SelectItem>*/}
              {/*<SelectItem value="pineapple">Pineapple</SelectItem>*/}
            </Select.Group>

            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default HeadingSelector;
