import React, { useContext } from "react";
import {
  GraphContext,
  GraphDispatchContext,
} from "../../reducers/GraphContext";
import {
  AppStateContext,
  AppStateDispatchContext,
} from "../../reducers/AppStateContext";
import { GraphActionType, GraphNode } from "../../reducers/GraphReducer";
import { AppActionType, Collections } from "../../reducers/AppStateReducer";
import { NoteEditor } from "./NoteEditor";
import { ensure } from "../App";
import { useGetNotesQuery, useUpdateNoteMutation } from "../../api/apiSlice";

export function EditorSwitch() {
  const graph = useContext(GraphContext);
  const graphDispatch = useContext(GraphDispatchContext);
  const state = useContext(AppStateContext);
  const dispatch = useContext(AppStateDispatchContext);
  const { data: notes, error, isLoading } = useGetNotesQuery();
  if (state === null || dispatch === null)
    throw Error("state or dispatch is null. ");
  if (graph === null || graphDispatch === null)
    throw Error("graph or graphDispatch is null. ");

  if (state.activeNodeID === undefined) return <></>;

  // switch (state.activeCollection) {
  //   case Collections.RecentlyDeleted: {
  //     note = graph.deletedNodes.find((node) => node.Id === state.activeNodeID);
  //     break;
  //   }
  //   default: {
  //     note = graph.nodes.find((node) => node.Id === state.activeNodeID);
  //     break;
  //   }
  // }
  const note: GraphNode | undefined = notes?.find(
    (note) => note.Id === state.activeNodeID,
  );
  if (note === undefined) return <></>;

  return (
    <NoteEditor
      key={note.Id}
      darkModeOn={state.darkModeOn}
      note={note} //https://stackoverflow.com/a/54738437/21646295
      onEditAttempt={
        state.activeCollection === Collections.RecentlyDeleted
          ? () => {
              // alert("hey! locked!")
              dispatch({
                type: AppActionType.setShowRecoverNodePopup,
                show: true,
              });
            }
          : () => {}
      }
      locked={state.activeCollection === Collections.RecentlyDeleted}
    />
  );
}
