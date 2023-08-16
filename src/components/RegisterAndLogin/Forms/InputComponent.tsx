import React, { HTMLInputTypeAttribute } from "react";

export function InputComponent({ type }: { type: HTMLInputTypeAttribute }) {
  return (
    <input
      className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  border-white border text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
      type={type}
      required
    />
  );
}
