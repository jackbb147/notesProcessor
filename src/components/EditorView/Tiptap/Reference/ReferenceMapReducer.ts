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
