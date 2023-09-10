import { Version1_0 } from "./GraphStates/V1_0";
import { V0 } from "./GraphStates/V0";
import { GraphState } from "../reducers/GraphReducer";

type VERSIONS = V0 | Version1_0;

interface GraphStateMigration {
  from: string;
  to: string;
  up: (state: VERSIONS) => VERSIONS;
  down: (state: VERSIONS) => VERSIONS;
}

export const GraphStateMigrations: GraphStateMigration[] = [
  {
    from: "0",
    to: "1.0",
    up: (state: any): Version1_0 => {
      const parseResult = V0.safeParse(state);
      if (!parseResult.success) {
        throw new Error("Failed to parse V0");
      }
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
    down: (state: any): V0 => {
      //     TODO
      const parseResult = Version1_0.safeParse(state);
      if (!parseResult.success) {
        throw new Error("Failed to parse V1_0");
      }
      const newState = {
        labels: state.labels.slice(),
        nodes: state.nodes.slice(),
        deletedNodes: state.deletedNodes.slice(),
      };
      return newState;
    },
  },
];

const upOrDown = (fromVersion: string, toVersion: string) => {
  const fromNumbers = fromVersion.split(".").map((s) => Number(s));
  const toNumbers = toVersion.split(".").map((s) => Number(s));
  for (var i = 0; i < fromNumbers.length; i++) {
    if (fromNumbers[i] < toNumbers[i]) {
      return "up";
    }
    if (fromNumbers[i] > toNumbers[i]) {
      return "down";
    }
  }
  return "same";
};

export const migrate = (schema: any, toVersion: string): VERSIONS => {
  let fromVersion = schema.version;
  if (!fromVersion) {
    fromVersion = "0";
  }
  const direction = upOrDown(fromVersion, toVersion);
  if (direction === "same") {
    return schema;
  }
  const currentMigration = GraphStateMigrations.find(
    (m) => m[direction === "up" ? "from" : "to"] === fromVersion,
  );
  if (!currentMigration) {
    throw new Error(`No migration found for ${fromVersion} to ${toVersion}`);
  }
  const nextSchema = currentMigration[direction](schema);
  return migrate(nextSchema, toVersion);
};
