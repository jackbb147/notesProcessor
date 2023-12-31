import { ImmerReducer } from "use-immer";
import { z } from "zod";
const _ = require("lodash");

export enum GraphActionType {
  addNode,
  updateNode,
  removeNode,
  recoverNode,
  addLink,
  removeLink,
  recoverLink,
  addLabel,
  removeLabel,
  addLabelToNode,
  merge,
  permanentRemoveNode,
  set,
}

export type GraphAction =
  | { type: GraphActionType.addNode; node: GraphNode }
  | { type: GraphActionType.removeNode; id: string }
  | { type: GraphActionType.updateNode; node: GraphNode }
  | { type: GraphActionType.recoverNode; id: string }
  | { type: GraphActionType.addLabel; label: string }
  | { type: GraphActionType.removeLabel; label: string }
  | { type: GraphActionType.addLabelToNode; label: string; id: string }
  | { type: GraphActionType.merge; other: GraphState }
  | { type: GraphActionType.permanentRemoveNode; id: string }
  | { type: GraphActionType.addLink; link: GraphLink }
  | { type: GraphActionType.removeLink; link: GraphLink }
  | { type: GraphActionType.recoverLink; link: GraphLink }
  | { type: GraphActionType.set; state: GraphState };

// export interface GraphNode {
//   id: string;
//   title: string;
//   content: string;
//   labels: string[];
//   dateCreated?: string;
//   dateLastModified?: string;
// }

const GraphNode = z.object({
  Id: z.string(),
  Title: z.string(),
  Content: z.string(),
  DateCreated: z.string().optional(),
  DateLastModified: z.string().optional(),
  Deleted: z.boolean().optional(),
  DeletionDate: z.string().optional(),
});

export type GraphNode = z.infer<typeof GraphNode>;

const GraphLink = z.object({
  Id: z.string(),
  SourceId: z.string(),
  TargetId: z.string(),
  Deleted: z.boolean().optional(),
  DeletionDate: z.string().optional(),
  Undirected: z.boolean().optional(),
});

export type GraphLink = z.infer<typeof GraphLink>;

export const GraphState = z.object({
  version: z.string(),
  nodes: z.array(GraphNode),
  links: z.array(GraphLink),
  deletedNodes: z.array(GraphNode),
  deletedLinks: z.array(GraphLink),
  labels: z.array(z.string()),
});

export type GraphState = z.infer<typeof GraphState>;

// export interface GraphState {
//   version: string;
//   nodes: GraphNode[];
//   links: GraphLink[];
//   deletedNodes: GraphNode[];
//   deletedLinks: GraphLink[];
//   labels: string[];
// }

export function graphReducer(draft: GraphState, action: GraphAction): void {
  // console.log(`dispatched: ${JSON.stringify(action)}`)
  switch (action.type) {
    case GraphActionType.addNode: {
      console.log(`Graph is adding a new node. `);
      let newNode = action.node;
      if (draft.nodes.some((node) => node.Id === newNode.Id)) return;
      draft.nodes.push(newNode);
      break;
    }

    case GraphActionType.removeNode: {
      let index = draft.nodes.findIndex((node) => node.Id === action.id);
      if (index < 0) return;
      draft.deletedNodes.push(draft.nodes[index]);
      draft.nodes.splice(index, 1);
      draft.links.forEach((link) => {
        if (link.SourceId === action.id || link.TargetId === action.id) {
          draft.deletedLinks.push(link);
        }
      });
      draft.links = draft.links.filter((link) => {
        return link.SourceId !== action.id && link.TargetId !== action.id;
      });
      break;
    }

    case GraphActionType.updateNode: {
      let index = draft.nodes.findIndex((node) => node.Id === action.node.Id);
      if (index < 0) return;
      console.log(`updateNode dispatched: ${JSON.stringify(action.node)}`);

      draft.nodes[index] = {
        ...draft.nodes[index],
        ...action.node,
      };
      break;
    }

    case GraphActionType.recoverNode: {
      console.log(`trying to recover: ${action.id}`);
      let index = draft.deletedNodes.findIndex((node) => node.Id === action.id);
      if (index < 0) return;
      if (draft.nodes.findIndex((node) => node.Id === action.id) < 0) {
        draft.nodes.push(draft.deletedNodes[index]);
        draft.deletedNodes.splice(index, 1);
        // recover links that are related to this node
        draft.deletedLinks.forEach((link) => {
          if (link.SourceId === action.id || link.TargetId === action.id) {
            draft.links.push(link);
          }
        });
        draft.deletedLinks = draft.deletedLinks.filter((link) => {
          return link.SourceId !== action.id && link.TargetId !== action.id;
        });
      } else {
        alert("GraphNode with specified ID already exists. ");
      }
      break;
    }

    case GraphActionType.addLink: {
      let newLink = action.link;
      if (
        draft.links.some(
          (link) =>
            link.SourceId === newLink.SourceId &&
            link.TargetId === newLink.TargetId &&
            link.Undirected === newLink.Undirected,
        )
      ) {
        return;
      }
      draft.links.push(newLink);
      break;
    }

    case GraphActionType.removeLink: {
      let link = action.link;
      let index = draft.links.findIndex(
        (l) => l.SourceId === link.SourceId && l.TargetId === link.TargetId,
      );
      if (index < 0) return;
      draft.deletedLinks.push(draft.links[index]);
      draft.links.splice(index, 1);
      break;
    }

    case GraphActionType.recoverLink: {
      let link = action.link;
      let index = draft.deletedLinks.findIndex(
        (l) => l.SourceId === link.SourceId && l.TargetId === link.TargetId,
      );
      if (index < 0) return;
      draft.links.push(draft.deletedLinks[index]);
      draft.deletedLinks.splice(index, 1);
      break;
    }

    case GraphActionType.addLabel: {
      console.log(`addLabel fired with ${action.label}`);
      if (draft.labels.includes(action.label)) return;
      draft.labels.push(action.label);
      break;
    }

    case GraphActionType.removeLabel: {
      let index = draft.labels.indexOf(action.label);
      if (index < 0) return;

      draft.labels.splice(index, 1);
      draft.nodes.forEach((node) => {
        // let index = node.labels.indexOf(action.label);
        if (index < 0) return;
        // node.labels.splice(index, 1);
      });
      break;
    }

    case GraphActionType.addLabelToNode: {
      // TODO
      let index = draft.nodes.findIndex((node) => node.Id === action.id);
      if (index < 0) return;
      // if (draft.nodes[index].labels.includes(action.label)) return;
      if (!draft.labels.includes(action.label)) return;
      // draft.nodes[index].labels.push(action.label);
      break;
    }

    case GraphActionType.permanentRemoveNode: {
      const index1 = draft.nodes.findIndex((node) => node.Id === action.id);
      const index2 = draft.deletedNodes.findIndex(
        (node) => node.Id === action.id,
      );
      if (index1 >= 0) {
        draft.nodes.splice(index1, 1);
      } else if (index2 >= 0) {
        draft.nodes.splice(index2, 1);
      }
      break;
    }

    case GraphActionType.merge: {
      //     TODO
      console.log(`merge fired with: ${JSON.stringify(action.other, null, 4)}`);
      let d = draft;
      const customizer = (oV: any, sV: any) => {};

      // let newDraft = _.mergeWith(draft, action.other, customizer)
      draft.nodes = _.unionBy(action.other.nodes, draft.nodes, "id");
      draft.labels = _.union(action.other.labels, draft.labels);
      draft.deletedNodes = _.unionBy(
        draft.deletedNodes,
        action.other.deletedNodes,
        "id",
      );

      break;
    }

    // case GraphActionType.set: {
    //   if (draft.version !== action.state.version) {
    //     throw new Error("Graph state version mismatch.");
    //     return;
    //   }
    //   _.assign(draft, action.state);
    // }
  }
}
