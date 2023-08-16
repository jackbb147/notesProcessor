import React from "react";
import { ListItem } from "./ListItem";
import { useAppState, useDispatch } from "../../hooks/AppStateAndGraphhooks";
import { AppActionType } from "../../reducers/AppStateReducer";

export function LightModeButton() {
  const state = useAppState();
  const dispatch = useDispatch();

  function handleDarkModeTogglerClick() {
    dispatch({ type: AppActionType.toggleDarkMode });

    // { // @ts-ignore
    //     document.querySelector('meta[name="theme-color"]').setAttribute('content', 'transparent');
    // }
  }

  return (
    <ListItem
      text={`${state.darkModeOn ? "Light" : "Dark"} Mode`}
      onClick={handleDarkModeTogglerClick}
      iconOnly={state.LabelPanelClosed}
      icon={
        state.darkModeOn ? (
          <span className="material-symbols-outlined">light_mode</span>
        ) : (
          <span className="material-symbols-outlined">dark_mode</span>
        )
      }
    />
  );
}
