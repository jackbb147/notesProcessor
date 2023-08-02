import React, {useContext} from "react";
import {AppStateContext, AppStateDispatchContext} from "../../reducers/AppStateContext";
import {Button} from "../ui/Button";
import {GraphActionType, Node} from "../../reducers/GraphReducer";
import {AppActionType, Collections} from "../../reducers/AppStateReducer";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {ListItem} from "./ListItem";
import {GraphContext, GraphDispatchContext} from "../../reducers/GraphContext";


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
                console.log("collection: ", JSON.stringify(collection))
                break;
            }
            case Collections.RecentlyDeleted: {
                collection = graph.deletedNodes
                break;
            }
            case Collections.Label: {
                collection = graph.nodes.filter(node => state.activeLabel && node.tags.includes(state.activeLabel))
                break;
            }
        }

        return collection;
    }

    function handleKeyDown(e:React.KeyboardEvent)
    {
        if(graph === null) return;
        if(dispatch === null) return;
        if(state === null) return;
        if(graph.nodes.length < 2) return;

        if(e.key !== "ArrowDown" && e.key !== "ArrowUp") return;


        let index = graph.nodes.findIndex(node=>node.id === state.activeNodeID);

        let nextID ;
        if(e.key === "ArrowDown") nextID = graph.nodes[(index+1) % graph.nodes.length].id;
        else nextID = index-1>=0?
            graph.nodes[(index-1) % graph.nodes.length].id :
            graph.nodes[graph.nodes.length-1].id;

        dispatch({
            type:AppActionType.setActiveNodeID,
            id: nextID
        })
    }

    function buildOptionalText(node:Node):string
    {
        if(!node.dateLastModified)
        {
            return ""
        }
        let hour = node.dateLastModified.getHours();
        let minute = node.dateLastModified.getMinutes();
        let PM = false;
        var res = '';


        if(hour >= 12){
            PM = true;
            hour %= 12;
        }

        res += hour.toString();
        res += ":";
        if(minute < 10) res += "0";
        res += minute.toString();
        if(PM) res += "PM";
        return res;
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

            <div className={"w-full h-full"}  tabIndex={0} onKeyDown={handleKeyDown}>
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
                                <ListItem active={node.id === state.activeNodeID}
                                          text={node.title}
                                          optionalText={buildOptionalText(node)}
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