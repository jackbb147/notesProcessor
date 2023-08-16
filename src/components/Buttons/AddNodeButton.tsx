import { GraphActionType } from "../../reducers/GraphReducer";
import { v4 as uuid } from "uuid";
import { Button } from "../ui/Button";
import React, { useContext } from "react";
import {
  GraphContext,
  GraphDispatchContext,
} from "../../reducers/GraphContext";
import {
  AppStateContext,
  AppStateDispatchContext,
} from "../../reducers/AppStateContext";
import { AppActionType, Collections } from "../../reducers/AppStateReducer";
import { useAppState, useDispatch } from "../../hooks/AppStateAndGraphhooks";

export function AddNodeButton({
  rootClassName = "",
}: {
  rootClassName?: string;
}) {
  const state = useAppState();
  const dispatch = useDispatch();

  const graph = useContext(GraphContext);
  const graphDispatch = useContext(GraphDispatchContext);
  if (graph === null || graphDispatch === null)
    throw Error("graph or graphDispatch is null. ");

  function handleClick() {
    if (graphDispatch === null || state === null)
      throw Error("graphDispatch or state is null");
    let tags = [];
    if (state.activeCollection === Collections.Label && state.activeLabel) {
      tags.push(state.activeLabel);
    }

    let newID = uuid();

    graphDispatch({
      type: GraphActionType.addNode,
      node: {
        id: newID,
        title: "New Note",
        content: "",
        labels: tags,
        dateCreated: new Date(),
      },
    });

    dispatch({
      type: AppActionType.setActiveNodeID,
      id: newID,
    });
  }

  return (
    <Button
      rootClassName={rootClassName}
      onClick={handleClick}
      icon={<span className="material-symbols-outlined">edit_square</span>}
    ></Button>
  );
}
