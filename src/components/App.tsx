import React, {useContext} from 'react';
import {SidePanel} from "./ui/SidePanel";
import '../App.css';
import {GraphAction, GraphActionType, graphReducer, GraphState, Node} from "../reducers/GraphReducer";
import {AppAction, AppActionType, AppState, AppStateReducer, Collections} from "../reducers/AppStateReducer";
import {useImmerReducer} from "use-immer";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {v4 as uuid} from 'uuid';
import {NoteEditor} from "./editor/NoteEditor";
import {RecoverNodePopup} from "./RecoverNodePopup";
import {AppStateContext, AppStateDispatchContext, AppStateProvider} from "./AppStateContext";
import {FolderPanelContent} from "./panels/FolderPanelContent";
import {NotesPanelContent} from "./panels/NotesPanelContent";
import {GraphContext, GraphDispatchContext, GraphProvider} from "./GraphContext";
import {EditorSwitch} from "./editor/EditorSwitch";
import {AddNodeButton} from "./AddNodeButton";
import {FolderPanel} from "./panels/FolderPanel";
import {NotesPanel} from "./panels/NotesPanel";
import {TopBar} from "./ui/TopBar";

export function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
    if (argument === undefined || argument === null) {
        throw new TypeError(message);
    }

    return argument;
}

function Container({children}: {children: React.ReactNode})
{
    const state = useContext(AppStateContext);
    const dispatch = useContext(AppStateDispatchContext);
    if(dispatch === null || state === null) throw Error("state or dispatch is null. ")

    return (
        <div className={`App w-full h-full ${state.darkModeOn && "dark"}`}>
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
                        <FolderPanel>
                            <div className={"App__main bg-white h-full grow w-full"}>
                                <NotesPanel>
                                    <div className={" p-1 pt-0 flex flex-col  grow "}>
                                        <TopBar>
                                            <AddNodeButton/>
                                            <div id={"editorButtonGroup"} className={"w-1/2  "}/>
                                        </TopBar>

                                        <div className={"flex-grow"} style={{}}>
                                            <EditorSwitch/>
                                        </div>
                                    </div>
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