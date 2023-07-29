import {ImmerReducer} from "use-immer";
enum ActionType
{
    addNode,
    updateNode,
    removeNode,
}

export type Action =
    | {type: ActionType.addNode, node: Node}
    | {type: ActionType.removeNode, id: string}
    | {type: ActionType.updateNode, id: string, node: Node};

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



export function reducer(state:State, action:Action):State
{

    // let f:(state:object,action:{type:string})=>object = actions[action.type];
    // if(f === undefined) f = actions.default;
    // return f(state, action);
    switch (action.type)
    {
        case ActionType.addNode:
            let newNode = action.node;

            if(state.nodes.some((node) => node.id === newNode.id)) return state;

            return {
                ...state,
                nodes: [...state.nodes, ]
            }


        case ActionType.removeNode:

            return state;

        case ActionType.updateNode:
            return state;
    }
}

