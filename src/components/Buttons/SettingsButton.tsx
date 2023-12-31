import {
  useAppDispatch,
  useAppState,
} from "../../hooks/AppStateAndGraphAndUserhooks";
import { ListItem } from "./ListItem";
import React, { forwardRef } from "react";
import { AppActionType } from "../../reducers/AppStateReducer";

export const SettingsButton = forwardRef((props, ref) => {
  const state = useAppState();
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch({
      type: AppActionType.setShowSettingsPanel,
      show: !state.showSettingsPanel,
    });
  }
  return (
    <ListItem
      ref={ref}
      text={`Settings`}
      onClick={handleClick}
      iconOnly={state.LabelPanelClosed}
      icon={<span className="material-symbols-outlined">settings</span>}
    />
  );
});
