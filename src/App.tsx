import React from 'react';
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

function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
    if (argument === undefined || argument === null) {
        throw new TypeError(message);
    }

    return argument;
}

function App() {

    const [graph, graphDispatch] = useImmerReducer<GraphState, GraphAction>(graphReducer, {
        nodes: [],
        deletedNodes: []
    });
    const [state, dispatch] = useImmerReducer<AppState, AppAction>(AppStateReducer, {
        activeNodeID: undefined,
        activeCollection: Collections.All,
        LabelPanelClosed: false,
        showRecoverNodePopup: false
    });


    function activeCollection() {
        var collection: Node[];
        switch (state.activeCollection) {
            case Collections.All: {
                collection = graph.nodes
                break;
            }
            case Collections.RecentlyDeleted: {
                collection = graph.deletedNodes
                break;
            }
            case Collections.Tag: {
                collection = [] // TODO
                break;
            }
        }

        return collection;
    }

    /**
     * call back for when user attempts to make edit on a locked node
     * @constructor
     */
    function EditAttemptOnLocked() {
        dispatch({type: AppActionType.setShowRecoverNodePopup, show: true})
    }

    function EditorSwitch() {
        // state.activeCollection === Collections.RecentlyDeleted ?
        var note: Node;
        if (state.activeNodeID === undefined) return <></>;


        switch (state.activeCollection) {
            case Collections.RecentlyDeleted: {
                note = ensure(graph.deletedNodes.find(node => node.id === state.activeNodeID));
                break;
            }
            default: {
                note = ensure(graph.nodes.find(node => node.id === state.activeNodeID))
                break;
            }
        }

        return <NoteEditor
            note={note} //https://stackoverflow.com/a/54738437/21646295
            onBlur={(note: Node) => {
                graphDispatch({
                    type: GraphActionType.updateNode,
                    node: note
                })
            }}
            onEditAttempt={state.activeCollection === Collections.RecentlyDeleted ? EditAttemptOnLocked : () => {
            }}
            locked={state.activeCollection === Collections.RecentlyDeleted}
        />
    }


    return (
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
                <>
                    <div className={"top-bar h-12 flex items-center"}>
                        {/*TODO */}
                        <Button icon={"../icons/thumbnail_bar_FILL0_wght400_GRAD0_opsz48.svg"} onClick={()=>{

                            // dispatch({type: AppActionType.toggleLabelPanel}) //TODO
                        }}></Button>
                    </div>
                    <ListItem text={"All"}
                              icon={"../icons/folder_FILL0_wght400_GRAD0_opsz48.svg"}
                              active={state.activeCollection === Collections.All}
                              rootClassName={"mb-2"}
                              onClick={() => {
                                  dispatch({
                                      type: AppActionType.setActiveCollection,
                                      activeCollection: Collections.All
                                  })

                                  if (state.activeCollection !== Collections.All) {
                                      dispatch({
                                          type: AppActionType.setActiveNodeID,
                                          id: undefined
                                      })
                                  }
                              }}
                    ></ListItem>
                    <ListItem text={"Recently Deleted"}
                              active={state.activeCollection === Collections.RecentlyDeleted}
                              icon={"../icons/delete_FILL0_wght400_GRAD0_opsz48 (1).svg"}
                              onClick={() => {
                                  dispatch({
                                      type: AppActionType.setActiveCollection,
                                      activeCollection: Collections.RecentlyDeleted
                                  })
                                  if (state.activeCollection !== Collections.RecentlyDeleted) {
                                      dispatch({
                                          type: AppActionType.setActiveNodeID,
                                          id: undefined
                                      })
                                  }
                              }}
                    ></ListItem>
                    <ListItem text={"Create/Edit Labels"}
                              icon={"../icons/edit_FILL0_wght400_GRAD0_opsz48.svg"}
                              rootClassName={"mt-auto"}
                    ></ListItem>
                </>
            }
                       isClosed={state.LabelPanelClosed}
            >
                <div className={"App__main bg-white h-full grow w-full"}>

                    <SidePanel panelChildren={
                        <div className={"w-full h-full flex flex-col pl-4 pr-4"}>
                            <div className={"top-bar h-12 flex items-center"}>
                                <Button icon={"../icons/list_FILL0_wght400_GRAD0_opsz48.svg"}></Button>
                                <Button icon={"../icons/grid_view_FILL0_wght400_GRAD0_opsz48.svg"}></Button>
                                <Button
                                    icon={"../icons/delete_FILL0_wght400_GRAD0_opsz48 (1).svg"}
                                    rootClassName={"ml-auto"}
                                    onClick={() => {
                                        if (state.activeNodeID !== undefined) {
                                            graphDispatch({type: GraphActionType.removeNode, id: state.activeNodeID})
                                            dispatch({type: AppActionType.setActiveNodeID, id: undefined})
                                            console.log(graph.nodes)

                                        }
                                    }}
                                ></Button>
                            </div>

                            <div>
                                <TransitionGroup>
                                    {activeCollection().map((node) => <CSSTransition
                                        timeout={1000}
                                        classNames="fade"
                                        key={node.id}
                                    >
                                        <ListItem active={node.id === state.activeNodeID} text={node.title}
                                                  onClick={() => dispatch({
                                                      type: AppActionType.setActiveNodeID,
                                                      id: node.id
                                                  })}/>
                                    </CSSTransition>)}
                                </TransitionGroup>
                            </div>

                        </div>
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
                                {EditorSwitch()}
                            </div>
                        </div>
                    </SidePanel>
                </div>
            </SidePanel>
        </div>
    );
}

export default App;
