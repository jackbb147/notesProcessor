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


function App()
{

    const [graph, graphDispatch] = useImmerReducer<GraphState, GraphAction>(graphReducer, {
        nodes: [],
        deletedNodes: []
    });
    const [state, dispatch] = useImmerReducer<AppState, AppAction>(AppStateReducer, {
        activeNodeID:undefined,
        activeCollection: Collections.All,
        LabelPanelClosed: false
    });


    function activeCollection()
    {
        var collection:Node[];
        switch (state.activeCollection)
        {
            case Collections.All:
            {
                collection = graph.nodes
                break;
            }
            case Collections.RecentlyDeleted:
            {
                collection = graph.deletedNodes
                break;
            }
            case Collections.Tag:
            {
                collection = [] // TODO
                break;
            }
        }

        return collection;
    }





    return (
        <div className="App bg-grey w-full h-full flex flex-row">
            <SidePanel panelChildren={
                <div className={"w-full h-full  flex flex-col pl-4 pr-4"}>
                    <div className={"top-bar h-12 flex items-center"}>
                        {/*TODO */}
                        {/*<Button icon={"../icons/thumbnail_bar_FILL0_wght400_GRAD0_opsz48.svg"} onClick={()=>{*/}

                        {/*    dispatch({type: AppActionType.toggleLabelPanel})*/}
                        {/*}}></Button>*/}
                    </div>
                    <div className={"foldersContainer grow flex flex-col"}>
                        <ListItem text={"All"}
                                  icon={"../icons/folder_FILL0_wght400_GRAD0_opsz48.svg"}
                                  active={state.activeCollection===Collections.All}
                                  rootClassName={"mb-2"}
                                  onClick={()=>dispatch({type: AppActionType.setActiveCollection, activeCollection: Collections.All})}
                        ></ListItem>
                        <ListItem text={"Recently Deleted"}
                                  active={state.activeCollection===Collections.RecentlyDeleted}
                                  icon={"../icons/delete_FILL0_wght400_GRAD0_opsz48 (1).svg"}
                                  onClick={()=>dispatch({type: AppActionType.setActiveCollection, activeCollection: Collections.RecentlyDeleted})}
                        ></ListItem>
                        <ListItem text={"Create/Edit Labels"}
                                  icon={"../icons/edit_FILL0_wght400_GRAD0_opsz48.svg"}
                                  rootClassName={"mt-auto"}
                        ></ListItem>
                    </div>
                </div>
            }
                       isClosed={state.LabelPanelClosed}
            >
                <div className={"App__main bg-white h-full grow"}>

                    <SidePanel panelChildren={
                        <div className={"w-full h-full flex flex-col pl-4 pr-4"}>
                            <div className={"top-bar h-12 flex items-center"}>
                                <Button icon={"../icons/list_FILL0_wght400_GRAD0_opsz48.svg"}></Button>
                                <Button icon={"../icons/grid_view_FILL0_wght400_GRAD0_opsz48.svg"}></Button>
                                <Button
                                    icon={"../icons/delete_FILL0_wght400_GRAD0_opsz48 (1).svg"}
                                    rootClassName={"ml-auto"}
                                    onClick={()=>{
                                        if(state.activeNodeID !== undefined) {
                                            graphDispatch({type: GraphActionType.removeNode, id: state.activeNodeID})
                                            dispatch({type: AppActionType.setActiveNodeID, id: undefined})
                                        }
                                    }}
                                ></Button>
                            </div>

                            <div>
                                <TransitionGroup>
                                    {activeCollection().map((node)=><CSSTransition
                                        timeout={1000}
                                        classNames="fade"
                                        key={node.id}
                                    >
                                        <ListItem active={node.id === state.activeNodeID} text={node.title} onClick={()=>dispatch({type: AppActionType.setActiveNodeID, id: node.id})}/>
                                    </CSSTransition>)}
                                </TransitionGroup>
                            </div>

                        </div>
                    }>
                        <div>
                            <div className={"top-bar h-12 flex items-center"}>
                                <Button onClick={()=>graphDispatch({ //TODO refactor this somewhere else
                                    type: GraphActionType.addNode,
                                    node: {
                                        id: uuid(),
                                        title: "hello world!",
                                        content:"no content",
                                        tags: []
                                    }
                                })} icon={"../icons/edit_square_FILL0_wght400_GRAD0_opsz48.svg"}></Button>

                            </div>
                            <NoteEditor></NoteEditor>


                        </div>
                    </SidePanel>
                </div>
            </SidePanel>
        </div>
    );
}

export default App;
