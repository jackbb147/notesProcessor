import React, {useContext} from "react";
import {AppStateContext, AppStateDispatchContext} from "../../../reducers/AppStateContext";
import {Button} from "../../ui/Button";
import {GraphActionType, Node} from "../../../reducers/GraphReducer";
import {AppActionType, Collections} from "../../../reducers/AppStateReducer";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {ListItem} from "../ListItem";
import {GraphContext, GraphDispatchContext} from "../../../reducers/GraphContext";
import { animated ,useTransition} from '@react-spring/web'
import {AnimatedListItem} from "../AnimatedListItem";
import {useSpring, Transition} from "@react-spring/web";
import {useDispatch, useAppState} from "../../../reducers/hooks";
import {DeleteButton} from "../Buttons/DeleteButton";

const NoNotesDisplayID = "none"
const MyComponent = (styles:any) => <div style={styles}>hello</div>


interface ReactNodeWithID
{
    node: React.ReactNode,
    id: string
}

function AnimatedList({data}:{data:ReactNodeWithID[] }) {

    const state =useAppState()
    const dispatch = useDispatch();


    const transitions = useTransition(data, {
        from: item => ({ opacity: 0, transform: "scale(0)", }),
        enter: item=>  item.id === NoNotesDisplayID ? ({opacity: 1, transform:"scale(1)", position: "absolute", top: "0", maxHeight: "100%", height: "100%", width: "100%"}) :({ opacity: 1, transform: "scale(1)", maxHeight: "500px"  }),
        leave: item => ({ opacity: 0, transform: "scale(0)", maxHeight: "0" }),
        keys: item => item.id
    })


    return  (

        transitions((style, node) => (
                <animated.div style={style}>{
                    node.node
                }</animated.div>
        )))


}



export function NotesPanelContent(
    {   collection,
        topBarButtons
    }:{
        collection:Node[],
        topBarButtons?: React.ReactNode[]
    }
)
{
    const state = useContext(AppStateContext);
    const dispatch = useContext(AppStateDispatchContext);
    const graph = useContext(GraphContext);
    const graphDispatch = useContext(GraphDispatchContext);
    if(state===null || dispatch === null) throw Error("state or dispatch is null. ");
    if(graph===null || graphDispatch === null) throw Error("graph or graphDispatch is null. ");




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
        if(!node.dateLastModified || !node.dateLastModified.getHours || !node.dateLastModified.getMinutes)
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
                {topBarButtons || <>
                    <Button icon={<span className="material-symbols-outlined">
                        list
                        </span>}></Button>
                    <Button icon={<span className="material-symbols-outlined">
                        grid_view
                        </span>}></Button>
                    <DeleteButton/>
                </>}
            </div>





            <div className={"w-full h-full overflow-scroll relative "  }  tabIndex={0} onKeyDown={handleKeyDown}>

                <AnimatedList

                    data={collection.length > 0 ? (
                        collection.map(node=>{
                            return (
                                {
                                    node: <ListItem
                                        text={node.title}
                                        active={node.id === state.activeNodeID}
                                        optionalText={buildOptionalText(node)}
                                        onClick={() => dispatch({
                                            type: AppActionType.setActiveNodeID,
                                            id: node.id
                                        })}
                                    />,
                                    id: node.id
                                }
                            )
                        })
                    ) : (
                        [{
                            node: <div className={"flex flex-col items-center justify-center w-full h-full"}>
                                                 No Notes
                                    </div>,
                            id: NoNotesDisplayID
                        }]
                    )} />




            </div>


        </div>
    </>
}