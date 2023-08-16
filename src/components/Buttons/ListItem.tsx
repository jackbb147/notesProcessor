import React, { forwardRef, useEffect, useState } from "react";
import { CSSObjectWithLabel } from "react-select";

export const ListItem = forwardRef(
  (
    {
      text,
      icon,
      rootClassName,
      active,
      onClick,
      optionalText,
      style,
      iconOnly = false,
    }: {
      text: string;
      icon?: React.ReactNode;
      rootClassName?: string;
      active?: boolean;
      onClick?: (e: React.MouseEvent) => any;
      optionalText?: string;
      style?: Object;
      iconOnly?: boolean;
    },
    ref: React.ForwardedRef<any>,
  ) => {
    useEffect(() => {
      return () => {
        console.log("unmount");
      };
    }, []);
    return (
      <div
        ref={ref}
        onClick={onClick}
        style={style}
        className={`flex flex-row ${
          active && "bg-selectedItem-2 dark:bg-dark_selectedItem_2"
        } p-1 rounded items-center cursor-default  ${rootClassName} overflow-hidden`}
      >
        <div className={"w-5 mr-2 min-w-[1.25rem] flex items-center "}>
          {" "}
          {icon}{" "}
        </div>
        {!iconOnly && (
          <div
            className={` flex flex-col text-left  whitespace-nowrap ${
              active && "font-bold text-dark_primary"
            }`}
          >
            <span>{text}</span>
            <span>{optionalText}</span>
          </div>
        )}
      </div>
    );
  },
);
