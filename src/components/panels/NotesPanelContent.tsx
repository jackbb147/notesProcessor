import React, {useContext} from "react";
import {AppStateContext, AppStateDispatchContext} from "../AppStateContext";
import {Button} from "../ui/Button";
import {GraphActionType, Node} from "../../reducers/GraphReducer";
import {AppActionType, Collections} from "../../reducers/AppStateReducer";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {ListItem} from "./ListItem";
import {GraphContext, GraphDispatchContext} from "../GraphContext";


export function NotesPanelContent()
{
    const state = useContext(AppStateContext);
    const dispatch = useContext(AppStateDispatchContext);
    const graph = useContext(GraphContext);
    const graphDispatch = useContext(GraphDispatchContext);
    if(state===null || dispatch === null) throw Error("state or dispatch is null. ");
    if(graph===null || graphDispatch === null) throw Error("graph or graphDispatch is null. ");


    function activeCollection() {
        if(graph===null || graphDispatch === null) throw Error("graph or graphDispatch is null. ");
        if(state === null) throw Error("state is null.")
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

    return <>
        <div className={"w-full h-full flex flex-col "}>
            <div className={"top-bar h-12 flex items-center"}>
                <Button icon={<span className="material-symbols-outlined">
list
</span>}></Button>
                <Button icon={<span className="material-symbols-outlined">
grid_view
</span>}></Button>
                <Button
                    icon={<span className="material-symbols-outlined">
delete
</span>}
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

            <div className={"w-full h-full"}>
                {
                    activeCollection().length === 0 ?
                    (
                        <div className={"flex flex-col items-center justify-center w-full h-full"}>
                            No Notes
                        </div>
                    ):
                    (
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
                    )

                }

            </div>

        </div>
    </>
}