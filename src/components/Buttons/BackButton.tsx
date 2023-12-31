import { Button } from "../ui/Button";
import React from "react";
import {
  useAppState,
  useAppDispatch,
} from "../../hooks/AppStateAndGraphAndUserhooks";
import { AppActionType } from "../../reducers/AppStateReducer";

export function BackButton() {
  const state = useAppState();
  const dispatch = useAppDispatch();

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
