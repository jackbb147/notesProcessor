import { ListItem } from "./ListItem";
import { useAppState, useUser } from "../../hooks/AppStateAndGraphAndUserhooks";

export function UserButton() {
  const activeUser = useUser();
  const AppState = useAppState();
  if (!activeUser) return null;
  return (
    <ListItem
      text={activeUser}
      icon={<span className="material-symbols-outlined">account_circle</span>}
      iconOnly={AppState.LabelPanelClosed}
    />
  );
}
