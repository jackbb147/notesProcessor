import {TopBar} from "../ui/TopBar";
import {AddNodeButton} from "../Buttons/AddNodeButton";
import {EditorSwitch} from "./EditorSwitch";
import React from "react";
import {Desktop, Mobile, Tablet} from "../../hooks/useMediaQuery";
import {DesktopEditorPage} from "./DesktopEditorPage";
import {Tablet_EditorPage} from "./Tablet_EditorPage";
import {Mobile_EditorPage} from "./Mobile_EditorPage";

export function EditorPage()
{
    return (
        <>
            <Desktop>
                <DesktopEditorPage/>
            </Desktop>

            <Tablet>
                <Tablet_EditorPage/>
            </Tablet>

            <Mobile>
                <Mobile_EditorPage/>
            </Mobile>
        </>
    )
}