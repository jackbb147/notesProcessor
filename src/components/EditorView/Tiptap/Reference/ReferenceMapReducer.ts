export enum ReferenceMapActionType {
  addReference,
  removeReference,
  setReferenceMap,
}

export interface Reference {
  sourceID: string;
  targetID: string;
}

export type ReferenceMapAction =
  | { type: ReferenceMapActionType.addReference; reference: Reference }
  | { type: ReferenceMapActionType.removeReference; reference: Reference }
  | {
      type: ReferenceMapActionType.setReferenceMap;
      referenceMap: ReferenceMap;
    };

/**
 * A map from node ID to the number of references to that node.
 * Note that the source node is not included in the map.
 * It is the responsibility of the caller to keep track of the source node.
 */
export type ReferenceMap = Map<string, number>;

export function ReferenceMapReducer(
  draft: ReferenceMap,
  action: ReferenceMapAction,
) {
  switch (action.type) {
    case ReferenceMapActionType.addReference: {
      //   TODO add reference to map

      draft.set(
        action.reference.targetID,
        1 + (draft.get(action.reference.targetID) ?? 0),
      );
      break;
    }
    case ReferenceMapActionType.removeReference: {
      //   TODO remove reference from map
      if (!draft.has(action.reference.targetID)) return;
      draft.set(
        action.reference.targetID,
        draft.get(action.reference.targetID)! - 1,
      );
      break;
    }

    case ReferenceMapActionType.setReferenceMap: {
      //   TODO set reference map
      draft.clear();
      action.referenceMap.forEach((value, key) => {
        draft.set(key, value);
      });
    }
  }
}
