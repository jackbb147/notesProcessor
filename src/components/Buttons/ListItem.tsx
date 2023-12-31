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
      boldText = false,
      hoverStyle,
    }: {
      text: string;
      icon?: React.ReactNode;
      rootClassName?: string;
      active?: boolean;
      onClick?: (e: React.MouseEvent) => any;
      optionalText?: string;
      style?: React.CSSProperties;
      hoverStyle?: React.CSSProperties;
      iconOnly?: boolean;
      boldText?: boolean;
    },
    ref: React.ForwardedRef<any>,
  ) => {
    //
    const [hovered, setHovered] = useState(false);
    useEffect(() => {
      return () => {
        console.log("unmount");
      };
    }, []);
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        ref={ref}
        onClick={onClick}
        style={{
          ...(style ?? {}),
          ...(hovered && hoverStyle ? hoverStyle : {}),
          cursor: "pointer",
        }}
        className={`flex flex-row ${
          active && "bg-selectedItem-2 dark:bg-dark_selectedItem_2"
        } p-1 rounded items-center cursor-default  ${rootClassName} overflow-hidden `}
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
            {/*<span>hello</span>*/}
            <span
              style={{
                overflowWrap: "break-word",
                fontWeight: boldText ? "bold" : "normal",
              }}
            >
              {text.length > 30 ? text.slice(0, 30) + "..." : text}
              {/*{text.slice(0, 30)}*/}
            </span>
            <span>{optionalText}</span>
          </div>
        )}
      </div>
    );
  },
);
