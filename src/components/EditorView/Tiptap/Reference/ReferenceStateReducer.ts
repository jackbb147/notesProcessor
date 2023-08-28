export enum ReferenceStateActionType {
  addReference,
  removeReference,
  setReferenceState,
}

export interface Reference {
  sourceID: string;
  targetID: string;
}

export type ReferenceStateAction =
  | { type: ReferenceStateActionType.addReference; reference: Reference }
  | { type: ReferenceStateActionType.removeReference; reference: Reference }
  | {
      type: ReferenceStateActionType.setReferenceState;
      referenceState: ReferenceState;
    };

/**
 * A map from node ID to the number of references to that node.
 * Note that the source node is not included in the map.
 * It is the responsibility of the caller to keep track of the source node.
 */
export type ReferenceMap = Map<string, number>;

export interface ReferenceState {
  sourceID: string;
  referenceMap: ReferenceMap;
}

export function ReferenceStateReducer(
  draft: ReferenceState,
  action: ReferenceStateAction,
) {
  switch (action.type) {
    case ReferenceStateActionType.addReference: {
      //   TODO add reference to map
      if (action.reference.sourceID !== draft.sourceID) return;
      draft.referenceMap.set(
        action.reference.targetID,
        1 + (draft.referenceMap.get(action.reference.targetID) ?? 0),
      );
      break;
    }
    case ReferenceStateActionType.removeReference: {
      //   TODO remove reference from map
      if (action.reference.sourceID !== draft.sourceID) return;
      if (!draft.referenceMap.has(action.reference.targetID)) return;
      // if (draft.referenceMap.get(action.reference.targetID) === 1) {
      //   draft.referenceMap.delete(action.reference.targetID);
      //   return;
      // }
      draft.referenceMap.set(
        action.reference.targetID,
        draft.referenceMap.get(action.reference.targetID)! - 1,
      );
      break;
    }

    case ReferenceStateActionType.setReferenceState: {
      //   TODO set reference map

      draft.sourceID = action.referenceState.sourceID;
      draft.referenceMap.clear();
      action.referenceState.referenceMap.forEach((value, key) => {
        draft.referenceMap.set(key, value);
      });
    }
  }
}
