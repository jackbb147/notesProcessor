import React, {useContext} from 'react';
import {SidePanel} from "./SidePanel";
import './App.css';
import {ListItem} from "./ListItem";
import {Button} from "./Button";
import {GraphAction, GraphActionType, graphReducer, GraphState, Node} from "./GraphReducer";
import {AppAction, AppActionType, AppState, AppStateReducer, Collections} from "./AppStateReducer";
import {useImmerReducer} from "use-immer";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {v4 as uuid} from 'uuid';
import {NoteEditor} from "./NoteEditor";
import {RecoverNodePopup} from "./RecoverNodePopup";
import {AppStateContext, AppStateDispatchContext, AppStateProvider} from "./AppStateContext";
import {FolderPanelContent} from "./FolderPanelContent";
import {NotesPanelContent} from "./NotesPanelContent";
import {GraphContext, GraphDispatchContext, GraphProvider} from "./GraphContext";
import {EditorSwitch} from "./EditorSwitch";

export function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
    if (argument === undefined || argument === null) {
        throw new TypeError(message);
    }

    return argument;
}

function AppWithoutContext() {

    const graph = useContext(GraphContext);
    const graphDispatch = useContext(GraphDispatchContext);
    const state = useContext(AppStateContext);
    const dispatch = useContext(AppStateDispatchContext);
    if(state===null || dispatch === null) throw Error("state or dispatch is null. ");
    if(graph===null || graphDispatch === null) throw Error("graph or graphDispatch is null. ");






    return (
        <AppStateProvider>
            <div className="App bg-grey w-full h-full flex flex-row overflow-hidden">

                <RecoverNodePopup open={state.showRecoverNodePopup}
                                  cancelCB={() => {
                                      dispatch({type: AppActionType.setShowRecoverNodePopup, show: false})
                                  }}
                                  recoverCB={() => {
                                      dispatch({type: AppActionType.setShowRecoverNodePopup, show: false})
                                      if(!state.activeNodeID) throw Error("No active node id.");
                                      graphDispatch(({type: GraphActionType.recoverNode, id: state.activeNodeID}))
                                      dispatch({type: AppActionType.setActiveNodeID, id: undefined})
                                  }}/>
                <SidePanel panelChildren={
                    <FolderPanelContent/>
                }
                           isClosed={state.LabelPanelClosed}
                >
                    <div className={"App__main bg-white h-full grow w-full"}>

                        <SidePanel panelChildren={
                            <NotesPanelContent/>
                        }>
                            <div className={" p-1 flex flex-col  grow"}>
                                <div className={"top-bar h-12 flex items-center justify-between"}>
                                    <Button onClick={() => graphDispatch({ //TODO refactor this somewhere else
                                        type: GraphActionType.addNode,
                                        node: {
                                            id: uuid(),
                                            title: "hello world!",
                                            content: "no content",
                                            tags: []
                                        }
                                    })} icon={"../icons/edit_square_FILL0_wght400_GRAD0_opsz48.svg"}></Button>

                                    <div id={"editorButtonGroup"} className={"w-1/2  "}>
                                    </div>
                                </div>
                                <div className={"flex-grow"} style={{}}>
                                    <EditorSwitch/>
                                </div>
                            </div>
                        </SidePanel>
                    </div>
                </SidePanel>
            </div>
        </AppStateProvider>
    );
}

function App()
{
    return <AppStateProvider>
                <GraphProvider>
                    <AppWithoutContext/>
                </GraphProvider>
    </AppStateProvider>
}

export default App;
