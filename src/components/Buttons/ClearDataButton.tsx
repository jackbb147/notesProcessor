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
    // await clearData();
    clearData()
      .unwrap()
      .then((payload) => {
        console.log("fulfilled", payload);
        refreshPage();
      })
      .catch((error) => {
        console.error("rejected", error.data);
        alert("Failed to clear data. An unknown error occurred.");
        console.error("clearData error", clearDataError);
      });
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
