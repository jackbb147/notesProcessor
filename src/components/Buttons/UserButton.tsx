import { ListItem } from "./ListItem";
import {
  useAppDispatch,
  useAppState,
} from "../../hooks/AppStateAndGraphAndUserhooks";
import { useLogInStatus } from "../../hooks/useLogInStatus";
import { AppActionType } from "../../reducers/AppStateReducer";

export function UserButton() {
  // const activeUser = useUser();
  const AppDispatch = useAppDispatch();
  const [loginStatus, userName] = useLogInStatus();
  const AppState = useAppState();
  if (!userName) return null;

  function handleClick() {
    // alert("clicked");
    AppDispatch({
      type: AppActionType.setShowUserSettingsPanel,
      show: !AppState.showUserSettingsPanel,
    });
  }

  return (
    <ListItem
      text={userName}
      icon={<span className="material-symbols-outlined">account_circle</span>}
      iconOnly={AppState.LabelPanelClosed}
      onClick={handleClick}
    />
  );
}
