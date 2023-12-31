import { AppActionType } from "../../reducers/AppStateReducer";
import { Button } from "../ui/Button";
import React from "react";
import { useAppDispatch } from "../../hooks/AppStateAndGraphAndUserhooks";

export function ToggleLabelPanelButton() {
  const dispatch = useAppDispatch();
  console.log("toggle label panel clicked");
  return (
    <Button
      icon={<span className="material-symbols-outlined">thumbnail_bar</span>}
      onClick={() => {
        dispatch({ type: AppActionType.toggleLabelPanel }); //TODO
      }}
    ></Button>
  );
}
