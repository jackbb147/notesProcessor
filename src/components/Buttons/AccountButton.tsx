import React from "react";
import { ListItem } from "./ListItem";
import { useAppState, useDispatch } from "../../hooks/AppStateAndGraphhooks";
import { AppActionType } from "../../reducers/AppStateReducer";

export function AccountButton() {
  const AppState = useAppState();
  const dispatch = useDispatch();

  function handleClick() {
    if (AppState.isLoggedIn) {
      //     TODO
    } else {
      dispatch({
        type: AppActionType.setShowLoginPage,
        show: true,
      });
    }
  }

  return (
    <ListItem
      text={AppState.isLoggedIn ? "Logged In" : "Sign in"} //todo show the username here if logged in ...
      onClick={handleClick}
      iconOnly={AppState.LabelPanelClosed}
      icon={<span className="material-symbols-outlined">account_circle</span>}
    />
  );
}
