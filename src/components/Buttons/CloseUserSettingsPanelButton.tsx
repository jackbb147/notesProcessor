import { useAppDispatch } from "../../hooks/AppStateAndGraphAndUserhooks";
import { AppActionType } from "../../reducers/AppStateReducer";
import { Button } from "../ui/Button";
import React from "react";

export function CloseUserSettingsPanelButton() {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch({
      type: AppActionType.setShowUserSettingsPanel,
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
