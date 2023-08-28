export enum ReferenceMapActionType {
  addReference,
  removeReference,
}

export interface Reference {
  sourceID: string;
  targetID: string;
}

export type ReferenceMapAction =
  | { type: ReferenceMapActionType.addReference; reference: Reference }
  | { type: ReferenceMapActionType.removeReference; reference: Reference };

export type ReferenceMap = Map<string, number>;

export function ReferenceMapReducer(
  draft: ReferenceMap,
  action: ReferenceMapAction,
) {
  switch (action.type) {
    case ReferenceMapActionType.addReference: {
      //   TODO add reference to map
      break;
    }
    case ReferenceMapActionType.removeReference: {
      //   TODO remove reference from map
      break;
    }
  }
}
