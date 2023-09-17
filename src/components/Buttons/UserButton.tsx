import { ListItem } from "./ListItem";
import { useAppState, useUser } from "../../hooks/AppStateAndGraphAndUserhooks";
import { useLogInStatus } from "../../hooks/useLogInStatus";

export function UserButton() {
  // const activeUser = useUser();
  const [loginStatus, userName] = useLogInStatus();
  const AppState = useAppState();
  if (!userName) return null;

  return (
    <ListItem
      text={userName}
      icon={<span className="material-symbols-outlined">account_circle</span>}
      iconOnly={AppState.LabelPanelClosed}
    />
  );
}
