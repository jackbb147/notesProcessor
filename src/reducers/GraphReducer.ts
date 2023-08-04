import {ImmerReducer} from "use-immer";
export enum GraphActionType
{
    addNode,
    updateNode,
    removeNode,
    recoverNode,
    addLabel,
    removeLabel,
    addLabelToNode,
    merge,
}

export type GraphAction =
    | {type: GraphActionType.addNode, node: Node}
    | {type: GraphActionType.removeNode, id: string}
    | {type: GraphActionType.updateNode,  node: Node}
    | {type: GraphActionType.recoverNode, id: string}
    | {type: GraphActionType.addLabel, label:string}
    | {type: GraphActionType.removeLabel, label:string}
    | {type: GraphActionType.addLabelToNode, label: string, id: string}
    | {type: GraphActionType.merge, other: GraphState}

export interface Node
{
    id: string,
    title: string,
    content: string,
    labels: string[],
    dateCreated?: Date,
    dateLastModified?:Date
}

export interface GraphState
{
    nodes: Node[],
    deletedNodes: Node[],
    labels:string[]
}

export function graphReducer(draft:GraphState, action:GraphAction):void
{

    // console.log(`dispatched: ${JSON.stringify(action)}`)
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
            draft.deletedNodes.push(draft.nodes[index]);
            draft.nodes.splice(index, 1);
            break;
        }


        case GraphActionType.updateNode:
        {
            let index = draft.nodes.findIndex((node)=>node.id === action.node.id);
            if(index < 0) return;
            console.log(`updateNode dispatched: ${JSON.stringify(action.node)}`)

            draft.nodes[index] = {
                ...draft.nodes[index],
                ...action.node
            }
            break;
        }

        case GraphActionType.recoverNode:
        {
            console.log(`trying to recover: ${action.id}`)
            let index = draft.deletedNodes.findIndex(node=>node.id === action.id);
            if(index < 0) return;
            draft.nodes.push(draft.deletedNodes[index]);
            draft.deletedNodes.splice(index, 1);
            break;
        }

        case GraphActionType.addLabel:
        {
            console.log(`addLabel fired with ${action.label}`)
            if(draft.labels.includes(action.label)) return;
            draft.labels.push(action.label);
            break;
        }

        case GraphActionType.removeLabel:
        {

            let index = draft.labels.indexOf(action.label);
            if(index < 0) return;

            draft.labels.splice(index,1);
            draft.nodes.forEach(node=>{
                let index = node.labels.indexOf(action.label);
                if(index < 0) return;
                node.labels.splice(index, 1);
            })
            break;
        }

        case GraphActionType.addLabelToNode:
        {
            // TODO
            let index = draft.nodes.findIndex(node=>node.id === action.id);
            if(index < 0) return;
            if(draft.nodes[index].labels.includes(action.label)) return;
            if(!draft.labels.includes(action.label)) return;
            draft.nodes[index].labels.push(action.label);
            break;
        }

        case GraphActionType.merge:
        {
            //     TODO
            console.log(`merge fired with: ${JSON.stringify(action.other, null, 4)}`);

        }
    }
}

