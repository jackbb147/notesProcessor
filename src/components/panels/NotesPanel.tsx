import {NotesPanelContent} from "./NotesPanelContent";
import {AddNodeButton} from "../AddNodeButton";
import {EditorSwitch} from "../editor/EditorSwitch";
import {SidePanel} from "../ui/SidePanel";
import React from "react";

export function NotesPanel({children}:{children: React.ReactNode})
{
    return <>
        <div className={"dark:bg-dark_primary  dark:border-dark_primary w-full h-full "}>
            <SidePanel panelChildren={<NotesPanelContent/>}>
                {children}
            </SidePanel>
        </div>

    </>
}