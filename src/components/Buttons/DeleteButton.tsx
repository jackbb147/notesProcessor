import { AppActionType, Collections } from "../../reducers/AppStateReducer";
import React from "react";
import {
  useAppState,
  useAppDispatch,
  useGraph,
  useGraphDispatch,
} from "../../hooks/AppStateAndGraphAndUserhooks";
import { useDispatch } from "react-redux";
import { Button } from "../ui/Button";
import { GraphActionType } from "../../reducers/GraphReducer";
import { RootState } from "../../store";
import { SignalRActionTypes } from "../../reducers/SignalR";
import { useDeleteNoteMutation } from "../../api/apiSlice";

export function DeleteButton() {
  const state = useAppState();
  const appDispatch = useAppDispatch();
  const dispatch = useDispatch();
  const graph = useGraph();
  const graphDispatch = useGraphDispatch();
  const [deleteNote] = useDeleteNoteMutation();
  if (state.activeCollection === Collections.RecentlyDeleted) {
    return <></>;
  } else {
    return (
      <Button
        icon={<span className="material-symbols-outlined">delete</span>}
        rootClassName={"ml-auto"}
        onClick={() => {
          if (state.activeNodeID !== undefined) {
            deleteNote({
              id: state.activeNodeID,
            });
            appDispatch({
              type: AppActionType.setActiveNodeID,
              id: undefined,
            });
          }
          // alert("Delete button clicked");
          // if (state.activeNodeID !== undefined) {
          //   graphDispatch({
          //     type: GraphActionType.removeNode,
          //     id: state.activeNodeID,
          //   });
          //   dispatch({ type: AppActionType.setActiveNodeID, id: undefined });
          //   console.log(graph.nodes);
          // }
        }}
      ></Button>
    );
  }
}
