import { useContext, useEffect } from "react";
import { ReferenceStateContext } from "./ReferenceStateContext";
import { useGraphDispatch } from "../../../../hooks/AppStateAndGraphAndUserhooks";
import { GraphActionType } from "../../../../reducers/GraphReducer";

/**
 * This hook is used to keep the Graph links in sync with the reference map.
 * @param sourceID
 */
export function useSyncGraphLinks({ sourceID }: { sourceID: string }) {
  const referenceState = useContext(ReferenceStateContext);
  const graphDispatch = useGraphDispatch();
  useEffect(() => {
    const entriesArray = Array.from(referenceState.referenceMap.entries());

    //
    const additions = entriesArray.filter((pair) => pair[1] >= 1);
    const deletions = entriesArray.filter((pair) => pair[1] < 1);

    //
    additions.forEach((pair) => {
      // graphDispatch({
      //   type: GraphActionType.addLink,
      //   link: {
      //     SourceId: sourceID,
      //     TargetId: pair[0],
      //   },
      // });
    });

    deletions.forEach((pair) => {
      // graphDispatch({
      //   type: GraphActionType.removeLink,
      //   link: {
      //     SourceId: sourceID,
      //     TargetId: pair[0],
      //   },
      // });
    });
  }, [referenceState]);
}
