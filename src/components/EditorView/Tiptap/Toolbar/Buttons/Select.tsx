import React from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

const SelectItem = React.forwardRef(
  (
    {
      children,
      className,
      value,
      ...props
    }: {
      children: React.ReactNode;
      value: string;
      className?: string;
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

const SelectDemo = () => (
  <Select.Root>
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
        className="overflow-hidden  bg-dark_primary rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
      >
        <Select.ScrollUpButton className="flex items-center justify-center h-[15px] bg-white cursor-default">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="">
          <Select.Group>
            <Select.Label className="px-[15px] text-xs leading-[25px] text-mauve11">
              Fruits
            </Select.Label>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </Select.Group>

          <Select.Separator />
        </Select.Viewport>
        <Select.ScrollDownButton />
        <Select.Arrow />
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

export default SelectDemo;
