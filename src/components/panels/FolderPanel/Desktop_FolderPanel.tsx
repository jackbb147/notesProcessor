
import React, {useContext} from "react";
import {FolderPanelContent} from "./FolderPanelContent";
import {NotesPanelContent} from "../NotesPanel/NotesPanelContent";
import {AddNodeButton} from "../Buttons/AddNodeButton";
import {EditorSwitch} from "../../EditorView/EditorSwitch";
import {GraphContext, GraphDispatchContext} from "../../../reducers/GraphContext";
import {AppStateContext, AppStateDispatchContext} from "../../../reducers/AppStateContext";
import {Desktop_SidePanel} from "../../ui/SidePanel/Desktop/Desktop_SidePanel";

export function Desktop_FolderPanel({children}:{children: React.ReactNode})
{
    const graph = useContext(GraphContext);
    const graphDispatch = useContext(GraphDispatchContext);
    const state = useContext(AppStateContext);
    const dispatch = useContext(AppStateDispatchContext);
    if(state===null || dispatch === null) throw Error("state or dispatch is null. ");
    if(graph===null || graphDispatch === null) throw Error("graph or graphDispatch is null. ");




    return <div className={"dark:bg-dark_secondary  dark:border-dark_secondary w-full h-full "}>

        <Desktop_SidePanel panelChildren={<FolderPanelContent/>}
                           sideBarMinimized={state.LabelPanelClosed}>{children}
        </Desktop_SidePanel>
    </div>
}