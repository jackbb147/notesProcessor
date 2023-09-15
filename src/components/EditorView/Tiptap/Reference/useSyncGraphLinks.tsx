import { useContext, useEffect } from "react";
import { ReferenceStateContext } from "./ReferenceStateContext";
import { useGraphDispatch } from "../../../../hooks/AppStateAndGraphAndUserhooks";
import { GraphActionType } from "../../../../reducers/GraphReducer";
import {
  useGetLinksQuery,
  useAddLinkMutation,
  useDeleteLinkMutation,
} from "../../../../api/apiSlice";
// import { uuid } from "react-scrollbars-custom/dist/types/util";
import { v4 as uuid } from "uuid";
/**
 * This hook is used to keep the Graph links in sync with the reference map.
 * @param sourceID
 */
export function useSyncGraphLinks({ sourceID }: { sourceID: string }) {
  const referenceState = useContext(ReferenceStateContext);
  const graphDispatch = useGraphDispatch();
  const { data: links } = useGetLinksQuery();
  const [addLink] = useAddLinkMutation();
  const [deleteLink] = useDeleteLinkMutation();
  useEffect(() => {
    console.debug("[useSyncGraphLinks] sourceID: " + sourceID);
    if (!links) return;
    const entriesArray = Array.from(referenceState.referenceMap.entries());

    //
    const additions = entriesArray.filter((pair) => pair[1] >= 1);
    const deletions = entriesArray.filter((pair) => pair[1] < 1);

    //
    additions.forEach((pair) => {
      if (
        links.some(
          (link) => link.SourceId === sourceID && link.TargetId === pair[0],
        )
      ) {
        return;
      }
      addLink({
        Id: uuid(),
        SourceId: sourceID,
        TargetId: pair[0],
      });
      // graphDispatch({
      //   type: GraphActionType.addLink,
      //   link: {
      //     SourceId: sourceID,
      //     TargetId: pair[0],
      //   },
      // });
    });

    deletions.forEach((pair) => {
      if (
        !links.some(
          (link) => link.SourceId === sourceID && link.TargetId === pair[0],
        )
      ) {
        return;
      }

      deleteLink({
        sourceId: sourceID,
        targetId: pair[0],
      });
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
