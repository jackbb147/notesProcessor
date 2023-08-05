import {TopBar} from "../ui/TopBar";
import {AddNodeButton} from "../Buttons/AddNodeButton";
import {EditorSwitch} from "./EditorSwitch";
import React from "react";
import {Desktop} from "../../useMediaQuery";
import {DesktopEditorPage} from "./DesktopEditorPage";
import {BackButton} from "../Buttons/BackButton";

export function Mobile_EditorPage()
{
    return (
        <div className={" p-1 pt-0 flex flex-col  grow h-full pb-1"}>
            <TopBar>
                <BackButton/>
            </TopBar>

            <div className={"flex-grow"} style={{}}>
                <EditorSwitch/>
            </div>
        </div>
    )
}