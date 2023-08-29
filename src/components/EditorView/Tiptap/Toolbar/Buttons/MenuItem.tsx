import React from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
export function MenuItem({
  children,
  value,
  ariaLabel,
  styles = {},
}: {
  children: React.ReactNode;
  value: string;
  ariaLabel: string;
  styles?: React.CSSProperties;
}) {
  return (
    <Toolbar.ToggleItem
      className="flex-shrink-0 flex-grow-0 basis-auto h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center  ml-0.5 outline-none hover:bg-grey hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
      value={value}
      aria-label={ariaLabel}
    >
      {children}
    </Toolbar.ToggleItem>
  );
}
