import { Button } from "../ui/Button";
import React from "react";
import {
  useAppDispatch,
  useAppState,
} from "../../hooks/AppStateAndGraphAndUserhooks";
import { AppActionType } from "../../reducers/AppStateReducer";

export function ToggleNotesPanelButton() {
  const appDispatch = useAppDispatch();
  const appState = useAppState();
  function handleClick() {
    appDispatch({
      type: AppActionType.setShowNotesPanel,
      show: !appState.showNotesPanel,
    });
  }
  return (
    <Button
      onClick={handleClick}
      icon={<span className="material-symbols-outlined">list</span>}
    ></Button>
  );
}
