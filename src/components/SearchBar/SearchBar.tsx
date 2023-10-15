import { Flex, Text, Button, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";
import {
  useAppDispatch,
  useAppState,
} from "../../hooks/AppStateAndGraphAndUserhooks";

export function SearchBar({ RootStyle }: { RootStyle?: React.CSSProperties }) {
  const appState = useAppState();
  const appDispatch = useAppDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);
  function handleInput(x: any) {
    //     TODO
    const ref = inputRef;
    debugger;
  }
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
      <TextField.Input
        placeholder="Search..."
        onInput={handleInput}
        ref={inputRef}
      />
    </TextField.Root>
  );
}
