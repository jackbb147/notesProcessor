import { TopBar } from "../ui/TopBar";
import { AddNodeButton } from "../Buttons/AddNodeButton";
import { EditorSwitch } from "./EditorSwitch";
import React from "react";
import style from "../ScrollableButHiddenScrollBar.module.css";

export function DesktopEditorPage() {
  return (
    <div className={" p-1 pt-0 flex flex-col  grow h-full pb-1"}>
      <TopBar>
        <AddNodeButton />
        <div id={"editorButtonGroup"} className={"w-1/2  "} />
      </TopBar>

      <div
        className={`flex-grow overflow-scroll ${style.ScrollableButHiddenScrollBar} h-full`}
        style={{}}
      >
        <EditorSwitch />
      </div>
    </div>
  );
}
