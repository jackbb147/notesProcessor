import { ListItem } from "./ListItem";
import React from "react";
import { useAppState } from "../../hooks/AppStateAndGraphAndUserhooks";
import { refreshPage } from "../../hooks/Refreshpage";
import { useClearDataMutation } from "../../api/apiSlice";

export function ClearDataButton() {
  const AppState = useAppState();
  const [
    clearData,
    {
      isLoading: clearDataIsLoading,
      isError: clearDataIsError,
      error: clearDataError,
    },
  ] = useClearDataMutation();
  async function handleClick() {
    //   TODO
    await clearData();
    // await logout();
    // if (logoutIsError) {
    //   console.error("logout error", logoutError);
    // } else {
    //   //   success
    //   refreshPage();
    // }
  }
  return (
    <ListItem
      text={"Delete All My Data"} //todo show the username here if logged in ...
      onClick={handleClick}
      iconOnly={AppState.LabelPanelClosed}
      icon={<span className="material-symbols-outlined">dangerous</span>}
    />
  );
}
