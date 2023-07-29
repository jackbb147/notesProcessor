import {ImmerReducer} from "use-immer";
export enum ActionType
{
    addNode,
    updateNode,
    removeNode,
}

export type Action =
    | {type: ActionType.addNode, node: Node}
    | {type: ActionType.removeNode, id: string}
    | {type: ActionType.updateNode,  node: Node};

interface Node
{
    id: string,
    title: string,
    content: string,
    tags: string[]
}

export interface State
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



export function reducer(draft:State, action:Action):void
{

    switch (action.type)
    {
        case ActionType.addNode:
        {
            let newNode = action.node;
            if(draft.nodes.some((node) => node.id === newNode.id)) return;
            draft.nodes.push(newNode);
            break;
        }


        case ActionType.removeNode:
        {
            let index = draft.nodes.findIndex((node)=>node.id === action.id);
            if(index < 0) return;
            draft.nodes.splice(index, 1);
            break;
        }


        case ActionType.updateNode:
        {
            let index = draft.nodes.findIndex((node)=>node.id === action.node.id);
            if(index < 0) return;
            draft.nodes.splice(index, 1, action.node)
            break;
        }
    }
}

