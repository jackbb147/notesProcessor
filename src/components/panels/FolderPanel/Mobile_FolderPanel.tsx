

import React, {useContext} from "react";
import {FolderPanelContent} from "./FolderPanelContent";
import {Mobile_SidePanel} from "../../ui/SidePanel/Mobile/Mobile_SidePanel";
import {NotesPanelContent} from "../NotesPanel/NotesPanelContent";
import {AddNodeButton} from "../../Buttons/AddNodeButton";
import {EditorSwitch} from "../../EditorView/EditorSwitch";
import {GraphContext, GraphDispatchContext} from "../../../reducers/GraphContext";
import {AppStateContext, AppStateDispatchContext} from "../../../reducers/AppStateContext";
import {Mobile} from "../../../hooks/useMediaQuery";

export function Mobile_FolderPanel({children}:{children: React.ReactNode})
{
    const graph = useContext(GraphContext);
    const graphDispatch = useContext(GraphDispatchContext);
    const state = useContext(AppStateContext);
    const dispatch = useContext(AppStateDispatchContext);
    if(state===null || dispatch === null) throw Error("state or dispatch is null. ");
    if(graph===null || graphDispatch === null) throw Error("graph or graphDispatch is null. ");




    return <div className={"dark:bg-dark_secondary  dark:border-dark_secondary w-full h-full "}>
        <Mobile_SidePanel
            panelChildren={<FolderPanelContent/>}
            sideBarClosed={state.LabelPanelClosed}
        >
            {children}
        </Mobile_SidePanel>
    </div>
}