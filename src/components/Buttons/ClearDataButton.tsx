import { ListItem } from "./ListItem";
import React from "react";
import {
  useAppDispatch,
  useAppState,
} from "../../hooks/AppStateAndGraphAndUserhooks";
import { useClearDataMutation } from "../../api/apiSlice";
import { AppActionType } from "../../reducers/AppStateReducer";

export function ClearDataButton() {
  const AppState = useAppState();
  const dispatch = useAppDispatch();
  const [
    clearData,
    {
      isLoading: clearDataIsLoading,
      isError: clearDataIsError,
      error: clearDataError,
    },
  ] = useClearDataMutation();

  async function handleClick() {
    dispatch({ type: AppActionType.setShowClearDataPopup, show: true });
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
