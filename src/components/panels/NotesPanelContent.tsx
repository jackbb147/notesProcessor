import React, {useContext} from "react";
import {AppStateContext, AppStateDispatchContext} from "../../reducers/AppStateContext";
import {Button} from "../ui/Button";
import {GraphActionType, Node} from "../../reducers/GraphReducer";
import {AppActionType, Collections} from "../../reducers/AppStateReducer";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {ListItem} from "./ListItem";
import {GraphContext, GraphDispatchContext} from "../../reducers/GraphContext";
import { animated ,useTransition} from '@react-spring/web'
import {AnimatedListItem} from "./AnimatedListItem";
import {useSpring} from "@react-spring/web";
import {useDispatch, useState} from "../../reducers/hooks";

function AnimatedList({ data}:{data:Node[]}) {

    const state =useState()
    const dispatch = useDispatch();
    const transitions = useTransition(data, {
        from: { opacity: 0 },
        enter: { opacity: 1,  },
        leave: { opacity: 0, },
        keys: item => item.id
    })

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

    return transitions((style, node) => (
        <animated.div style={style}>{
            <ListItem
                text={node.title}
                active={node.id === state.activeNodeID}
                optionalText={buildOptionalText(node)}
                onClick={() => dispatch({
                    type: AppActionType.setActiveNodeID,
                    id: node.id
                })}
            />
        }</animated.div>
    ))
}



export function NotesPanelContent({collection}:{collection:Node[]})
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



    const [transitions, api] = useTransition([1,2,3], () => ({
        from: { color: "white"},
        enter: { color:"yellow" },
        leave: { color: "blue" },
    }))

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

                <AnimatedList data={collection}/>

                {/*{*/}
                {/*    collection.length === 0 ?*/}
                {/*        (*/}
                {/*            // <div className={"flex flex-col items-center justify-center w-full h-full"}>*/}
                {/*            //     No Notes*/}
                {/*            // </div>*/}
                {/*            <animated.div style={{*/}
                {/*                display: "flex",*/}
                {/*                flexDirection: "column",*/}
                {/*                alignItems: "center",*/}
                {/*                justifyContent: "center",*/}
                {/*                width: "100%",*/}
                {/*                height: "100%"*/}
                {/*            }}>*/}
                {/*                No Notes*/}
                {/*            </animated.div>*/}
                {/*        ):*/}
                {/*        (*/}
                {/*            */}
                {/*            // collection.map((node) => <animated.div style={{*/}
                {/*            //     width: "100%",*/}
                {/*            //     height:"50px",*/}
                {/*            //     backgroundColor: "black",*/}
                {/*            //     marginBottom: "10px",*/}
                {/*            //     ...styles*/}
                {/*            // }}></animated.div>)*/}
                {/*        )*/}
                {/*                // <AnimatedListItem*/}
                {/*                    style={styles}*/}
                {/*                    */}
                {/*                />)*/}


                {/*}*/}

            </div>


        </div>
    </>
}