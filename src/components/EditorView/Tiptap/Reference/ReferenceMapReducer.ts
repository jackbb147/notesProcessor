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

      debugger;
      draft.set(
        action.reference.targetID,
        1 + (draft.get(action.reference.targetID) ?? 0),
      );
      break;
    }
    case ReferenceMapActionType.removeReference: {
      //   TODO remove reference from map
      debugger;
      if (!draft.has(action.reference.targetID)) return;
      draft.set(
        action.reference.targetID,
        draft.get(action.reference.targetID)! - 1,
      );
      break;
    }
  }
}
