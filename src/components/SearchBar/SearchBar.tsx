import { Flex, Text, Button, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";

export function SearchBar({ RootStyle }: { RootStyle?: React.CSSProperties }) {
  return (
    <TextField.Root
      style={{
        // border: "1px solid",
        width: "80%",
        ...RootStyle,
      }}
    >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
      <TextField.Input placeholder="Search..." />
    </TextField.Root>
  );
}
