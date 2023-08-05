import {TopBar} from "../ui/TopBar";
import {AddNodeButton} from "../panels/Buttons/AddNodeButton";
import {EditorSwitch} from "./EditorSwitch";
import React from "react";

export function EditorPage()
{
    return (
        <div className={" p-1 pt-0 flex flex-col  grow h-full pb-1"}>
            <TopBar>
                <AddNodeButton/>
                <div id={"editorButtonGroup"} className={"w-1/2  "}/>
            </TopBar>

            <div className={"flex-grow"} style={{}}>
                <EditorSwitch/>
            </div>
        </div>
    )
}