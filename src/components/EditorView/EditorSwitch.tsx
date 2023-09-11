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
  const [
    updateNote,
    { isLoading: isUpdating, isError: isUpdateError, error: updateError },
  ] = useUpdateNoteMutation();
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

  async function handleUpdateNode(note: GraphNode) {
    //   TODO
    if (note.Content.length !== 0) {
      // graphDispatch({
      //   type: GraphActionType.updateNode,
      //   node: note,
      // });
      debugger;
      await updateNote(note);
      if (isUpdateError) alert("Error updating note: " + updateError);
      else alert("Note updated!");
    } else {
      // dispatch({
      //   type: AppActionType.setActiveNodeID,
      //   id: undefined,
      // });
      // graphDispatch({
      //   type: GraphActionType.removeNode,
      //   id: note.Id,
      // });
    }
  }

  return (
    <NoteEditor
      darkModeOn={state.darkModeOn}
      note={note} //https://stackoverflow.com/a/54738437/21646295
      onBlur={handleUpdateNode}
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
