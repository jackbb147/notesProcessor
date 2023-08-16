import { Button } from "../ui/Button";
import React from "react";
import { useAppState, useDispatch } from "../../hooks/AppStateAndGraphhooks";
import { AppActionType } from "../../reducers/AppStateReducer";

export function BackButton() {
  const state = useAppState();
  const dispatch = useDispatch();

  function handleClick() {
    dispatch({
      type: AppActionType.setActiveNodeID,
      id: undefined,
    });
  }

  return (
    <Button
      onClick={handleClick}
      icon={<span className="material-symbols-outlined">arrow_back</span>}
    ></Button>
  );
}
