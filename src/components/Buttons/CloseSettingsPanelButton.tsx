import { Button } from "../ui/Button";
import React from "react";
import { useAppDispatch } from "../../hooks/AppStateAndGraphAndUserhooks";
import { AppActionType } from "../../reducers/AppStateReducer";

export function CloseSettingsPanelButton() {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch({
      type: AppActionType.setShowSettingsPanel,
      show: false,
    });
  }
  return (
    <Button
      onClick={handleClick}
      icon={<span className="material-symbols-outlined">close</span>}
    />
  );
}
