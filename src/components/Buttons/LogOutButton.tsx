import React from "react";
import { ListItem } from "./ListItem";
import {
  useAppState,
  useAppDispatch,
} from "../../hooks/AppStateAndGraphAndUserhooks";
import { AppActionType } from "../../reducers/AppStateReducer";

export function LogOutButton() {
  const AppState = useAppState();
  const dispatch = useAppDispatch();

  function handleClick() {
    //   TODO
  }

  return (
    <ListItem
      text={"Log Out"} //todo show the username here if logged in ...
      onClick={handleClick}
      iconOnly={AppState.LabelPanelClosed}
      icon={<span className="material-symbols-outlined">account_circle</span>}
    />
  );
}
