import React from "react";
import { ListItem } from "./ListItem";
import {
  useAppState,
  useAppDispatch,
} from "../../hooks/AppStateAndGraphAndUserhooks";
import { AppActionType } from "../../reducers/AppStateReducer";
import { useLogoutMutation } from "../../api/apiSlice";
import { refreshPage } from "../../hooks/Refreshpage";

export function LogOutButton() {
  const [
    logout,
    { isLoading: logoutIsLoading, isError: logoutIsError, error: logoutError },
  ] = useLogoutMutation();
  const AppState = useAppState();
  const dispatch = useAppDispatch();

  async function handleClick() {
    //   TODO
    await logout();
    if (logoutIsError) {
      console.error("logout error", logoutError);
    } else {
      //   success
      refreshPage();
    }
  }

  return (
    <ListItem
      text={"Log Out"} //todo show the username here if logged in ...
      onClick={handleClick}
      iconOnly={AppState.LabelPanelClosed}
      icon={<span className="material-symbols-outlined">logout</span>}
    />
  );
}
