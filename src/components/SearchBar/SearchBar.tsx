import { Flex, Text, Button, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import {
  useAppDispatch,
  useAppState,
} from "../../hooks/AppStateAndGraphAndUserhooks";

export function SearchBar({ RootStyle }: { RootStyle?: React.CSSProperties }) {
  const appState = useAppState();
  const appDispatch = useAppDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = React.useState<string | null>(null);
  function handleInput(x: any) {
    //     TODO
    const ref = inputRef;
    setSearchQuery(ref.current?.value ?? null);
    // debugger;
    //   TODO
  }

  useEffect(() => {
    // debugger;
    console.log("inputRef.current?.value: ", inputRef.current?.value);
    async function doSearch(): Promise<string[]> {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(searchQuery?.split("") ?? []);
        }, 2000);
      });
    }
    doSearch().then((x) => {
      // debugger;
      alert("x: " + JSON.stringify(x));
    });
  }, [searchQuery]);
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
