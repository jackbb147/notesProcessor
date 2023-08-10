import React, {useContext, useEffect} from 'react';
import '../App.css';
import {GraphAction, GraphActionType, graphReducer, GraphState, Node} from "../reducers/GraphReducer";
import {AppAction, AppActionType, AppState, AppStateReducer, Collections} from "../reducers/AppStateReducer";
import {useImmerReducer} from "use-immer";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {v4 as uuid} from 'uuid';
import {NoteEditor} from "./EditorView/NoteEditor";
import {RecoverNodePopup} from "./RecoverNodePopup";
import {AppStateContext, AppStateDispatchContext, AppStateProvider} from "../reducers/AppStateContext";
import {FolderPanelContent} from "./panels/FolderPanel/FolderPanelContent";
import {NotesPanelContent} from "./panels/NotesPanel/NotesPanelContent";
import {GraphContext, GraphDispatchContext, GraphProvider} from "../reducers/GraphContext";
import {EditorSwitch} from "./EditorView/EditorSwitch";
import {AddNodeButton} from "./Buttons/AddNodeButton";
import {FolderPanel} from "./panels/FolderPanel/FolderPanel";
import {NotesPanel} from "./panels/NotesPanel/NotesPanel";
import {TopBar} from "./ui/TopBar";
import {LabelSelectorPopUp} from "./LabelSelectorPopUp";
import {EditorPage} from "./EditorView/EditorPage";
import {Register} from "./Authentication/Register/Register";
import {useAppState} from "../hooks/AppStateAndGraphhooks";

export function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
    if (argument === undefined || argument === null) {
        throw new TypeError(message);
    }

    return argument;
}

function Container({children}: {children: React.ReactNode})
{

    const AppState = useAppState();
    useEffect(()=>{

        const html = document.querySelector("html")
        if(html == null) return;
        if(AppState.darkModeOn)
        {
            if(!(html.classList.contains("dark")))
                html.classList.add("dark");
        }else
        {
            html.classList.remove("dark");
        }

    }, [AppState.darkModeOn])

    const state = useContext(AppStateContext);
    const dispatch = useContext(AppStateDispatchContext);
    if(dispatch === null || state === null) throw Error("state or dispatch is null. ")

    return (
        <div className={`App w-full h-full` }>
            {children}
        </div>
    )
}

function App() {



    return <>
        <AppStateProvider>
            <GraphProvider>
                <Container>
                    <div className="bg-grey dark:bg-dark_secondary w-full h-full flex flex-row overflow-hidden dark:text-white">
                        <RecoverNodePopup/>
                        <LabelSelectorPopUp/>
                        <Register/>
                        <FolderPanel>
                            <div className={"App__main bg-white h-full grow w-full"}>
                                <NotesPanel>
                                    <EditorPage/>
                                </NotesPanel>
                            </div>
                        </FolderPanel>
                    </div>
                </Container>
            </GraphProvider>
        </AppStateProvider>
    </>
}

export default App;
