import { ListItem } from "./ListItem";
import React from "react";
import {
  useAppState,
  useAppDispatch,
} from "../../hooks/AppStateAndGraphAndUserhooks";
import { AppActionType } from "../../reducers/AppStateReducer";

export function EditLabelsButton() {
  const state = useAppState();
  const dispatch = useAppDispatch();

  function handleCreateEditLabelClick() {
    dispatch({
      type: AppActionType.setShowLabelSelectorPopup,
      show: true,
    });
  }

  return (
    <ListItem
      text={"Create/Edit Labels"}
      iconOnly={state.LabelPanelClosed}
      onClick={handleCreateEditLabelClick}
      icon={<span className="material-symbols-outlined">add_circle</span>}
    ></ListItem>
  );
}
