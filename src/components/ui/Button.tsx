import React from "react";

export function Button({
  icon,
  rootClassName,
  onClick,
  rootStyles,
}: {
  icon?: React.ReactNode;
  rootClassName?: string;
  onClick?: (e: React.MouseEvent) => any;
  rootStyles?: React.CSSProperties;
}) {
  return (
    <div
      onClick={onClick}
      className={
        " overflow-hidden flex items-center  ml-1 cursor-default " +
        rootClassName
      }
      style={rootStyles ?? {}}
    >
      {icon}
    </div>
  );
}
