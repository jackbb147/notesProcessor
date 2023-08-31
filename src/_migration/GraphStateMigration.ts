import { Version1_0 } from "./GraphStates/V1_0";
import { V0 } from "./GraphStates/V0";

interface GraphStateMigration {
  from: string;
  to: string;
  up: (state: any) => any;
  down: (state: any) => any;
}

export const GraphStateMigrations: GraphStateMigration[] = [
  {
    from: "0",
    to: "1.0",
    up: (state: V0): Version1_0 => {
      const newState = {
        version: "1.0",
        labels: state.labels.slice(),
        nodes: state.nodes.slice(),
        links: [],
        deletedNodes: state.deletedNodes.slice(),
        deletedLinks: [],
      };
      return newState;
    },
    down: (state: Version1_0): V0 => {
      //     TODO
      const newState = {
        labels: state.labels.slice(),
        nodes: state.nodes.slice(),
        deletedNodes: state.deletedNodes.slice(),
      };
      return newState;
    },
  },
];
