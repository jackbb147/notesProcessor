import {NotesPanelContent} from "./NotesPanelContent";
import {AddNodeButton} from "./AddNodeButton";
import {EditorSwitch} from "./EditorSwitch";
import {SidePanel} from "./SidePanel";
import React from "react";

export function NotesPanel({children}:{children: React.ReactNode})
{
    return <>
        <SidePanel panelChildren={<NotesPanelContent/>}>
            {children}
        </SidePanel>
    </>
}