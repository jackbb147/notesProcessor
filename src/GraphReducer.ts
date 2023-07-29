import {ImmerReducer} from "use-immer";
export enum GraphActionType
{
    addNode,
    updateNode,
    removeNode,
}

export type GraphAction =
    | {type: GraphActionType.addNode, node: Node}
    | {type: GraphActionType.removeNode, id: string}
    | {type: GraphActionType.updateNode,  node: Node};

interface Node
{
    id: string,
    title: string,
    content: string,
    tags: string[]
}

export interface GraphState
{
    nodes: Node[]
}

// const actions:{} = {
//     "addNode": (state:object, action)=>{
//
//     },
//
//     "updateNode": (state, action)=>{
//
//     },
//
//     "removeNode": (state, action)=>{
//
//     },
//
//     "addLink": (state, action)=>{
//
//     },
//
//     "removeLink": (state, action)=>{
//
//     },
//
//     "hideNode": (state, action)=>{
//
//     },
//
//     "addKey": (state, action)=>{
//
//     },
//
//     "removeKey": (state, action)=>{
//
//     },
//
//     "renameKey": (state, action)=>{
//
//     },
//
//     default: ()=>{
//
//     }
// }



export function graphReducer(draft:GraphState, action:GraphAction):void
{

    switch (action.type)
    {
        case GraphActionType.addNode:
        {
            let newNode = action.node;
            if(draft.nodes.some((node) => node.id === newNode.id)) return;
            draft.nodes.push(newNode);
            break;
        }


        case GraphActionType.removeNode:
        {
            let index = draft.nodes.findIndex((node)=>node.id === action.id);
            if(index < 0) return;
            draft.nodes.splice(index, 1);
            break;
        }


        case GraphActionType.updateNode:
        {
            let index = draft.nodes.findIndex((node)=>node.id === action.node.id);
            if(index < 0) return;
            draft.nodes.splice(index, 1, action.node)
            break;
        }
    }
}

