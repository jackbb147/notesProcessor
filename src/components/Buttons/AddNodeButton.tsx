import { GraphActionType } from "../../reducers/GraphReducer";
import { v4 as uuid } from "uuid";
import { Button } from "../ui/Button";
import React, { useContext, useEffect } from "react";
import {
  GraphContext,
  GraphDispatchContext,
} from "../../reducers/GraphContext";
import {
  AppStateContext,
  AppStateDispatchContext,
} from "../../reducers/AppStateContext";
import { AppActionType, Collections } from "../../reducers/AppStateReducer";
import {
  useAppState,
  useAppDispatch,
} from "../../hooks/AppStateAndGraphAndUserhooks";
import { useAddNoteMutation } from "../../api/apiSlice";

export function AddNodeButton({
  rootClassName = "",
}: {
  rootClassName?: string;
}) {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const graph = useContext(GraphContext);
  const graphDispatch = useContext(GraphDispatchContext);

  const [addNote, { isLoading: isAddingNote, isSuccess, data }] =
    useAddNoteMutation();
  if (graph === null || graphDispatch === null)
    throw Error("graph or graphDispatch is null. ");

  async function handleClick() {
    // alert("hey clicked");
    if (graphDispatch === null || state === null)
      throw Error("graphDispatch or state is null");
    let tags = [];
    if (state.activeCollection === Collections.Label && state.activeLabel) {
      tags.push(state.activeLabel);
    }

    let newID = uuid();

    addNote({
      //
      Id: newID,
      Title: "New Note",
      Content: "",
      // DateCreated: new Date().toJSON(),
    });

    // graphDispatch({
    //   type: GraphActionType.addNode,
    //   node: {
    //     id: newID,
    //     title: "New Note",
    //     content: "",
    //     labels: tags,
    //     dateCreated: new Date().toJSON(),
    //   },
    // });
  }

  useEffect(() => {
    if (isSuccess) {
      let id = data as string;
      // debugger;
      dispatch({
        type: AppActionType.setActiveNodeID,
        id: id,
      });
    }
  }, [isAddingNote]);

  return (
    <Button
      rootClassName={rootClassName}
      onClick={handleClick}
      icon={<span className="material-symbols-outlined">edit_square</span>}
    ></Button>
  );
}
