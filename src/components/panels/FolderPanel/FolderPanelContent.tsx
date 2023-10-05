import { Button } from "../../ui/Button";
import { ListItem } from "../../Buttons/ListItem";
import {
  useAppDispatch,
  useGraph,
  useGraphDispatch,
  useAppState,
  useUser,
} from "../../../hooks/AppStateAndGraphAndUserhooks";
import { AppActionType, Collections } from "../../../reducers/AppStateReducer";
import React, { useContext, useRef } from "react";
import {
  GraphContext,
  GraphDispatchContext,
} from "../../../reducers/GraphContext";
import { EditLabelsButton } from "../../Buttons/EditLabelsButton";
import { SettingsButton } from "../../Buttons/SettingsButton";
import { AccountButton } from "../../Buttons/AccountButton";
import { SettingsPanel } from "../SettingsPanel/panel/SettingsPanel";
import OutsideAlerter from "../../ui/OutsideAlerter";
import { ToggleLabelPanelButton } from "../../Buttons/ToggleLabelPanelButton";
import { useMediaQuery } from "react-responsive";
import { Desktop, Mobile, Tablet } from "../../../hooks/useMediaQuery";
import { All } from "../../Buttons/All";
import { RecentlyDeleted } from "../../Buttons/RecentlyDeleted";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useLogInStatus } from "../../../hooks/useLogInStatus";
import {
  labelsWithTimeStampsSchemaType,
  useGetLabelsQuery,
  useGetLabelsWithTimeStampsQuery,
} from "../../../api/apiSlice";
import { UserButton } from "../../Buttons/UserButton";
import { SettingsPanelContent } from "../SettingsPanel/content/SettingsPanelContent";
import { UserSettingsPanelContent } from "../SettingsPanel/content/UserSettingsPanelContent";

function SettingsPanelWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Desktop>
        <div
          className={`
                absolute
                left-full
                bottom-0
                z-10
            `}
        >
          {children}
        </div>
      </Desktop>

      <Tablet>
        <div
          className={`
                absolute
                left-full
                bottom-0
                z-10
            `}
        >
          {children}
        </div>
      </Tablet>

      <Mobile>{children}</Mobile>
    </>
  );
}

export function FolderPanelContent() {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const graph = useGraph();
  const graphDispatch = useGraphDispatch();

  const settingsButtonRef = useRef<any>(null);
  const userSettingsButtonRef = useRef<any>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  // const isLoggedIn = useLogInStatus();
  // const activeUser = useUser();
  const [loginStatus, activeUser] = useLogInStatus();
  const { data: labels, error } = useGetLabelsQuery();
  const { data: labelsWithTimeStamps, error: error2 } =
    useGetLabelsWithTimeStampsQuery();
  function handleSettingPanelOutsideClick() {
    if (!isMobile) {
      dispatch({
        type: AppActionType.setShowSettingsPanel,
        show: false,
      });
    }
  }

  function handleUserSettingPanelOutsideClick() {
    if (!isMobile) {
      dispatch({
        type: AppActionType.setShowUserSettingsPanel,
        show: false,
      });
    }
  }

  function SettingPanelOutsideClickCondition(
    me: Element,
    target: EventTarget | null,
  ) {
    if (target === null) return;
    let settingsButton = settingsButtonRef.current;

    if (settingsButton !== null && settingsButton.contains(target))
      return false;
    return true;
  }

  function UserSettingPanelOutsideClickCondition(
    me: Element,
    target: EventTarget | null,
  ) {
    if (target === null) return;
    let settingsButton = userSettingsButtonRef.current;

    if (settingsButton !== null && settingsButton.contains(target))
      return false;
    return true;
  }

  function handleLabelClick(label: string) {
    dispatch({
      type: AppActionType.setActiveLabel,
      label: label,
    });

    dispatch({
      type: AppActionType.setActiveNodeID,
      id: undefined,
    });

    if (isMobile) {
      dispatch({
        type: AppActionType.closeLabelPanel,
      });
    }
  }

  // const a = activeUser;
  // debugger;
  return (
    <>
      <div className={"top-bar h-12 flex items-center"}>
        {/*TODO */}
        <ToggleLabelPanelButton />
      </div>
      <All />

      {/*https://www.npmjs.com/package/react-custom-scrollbars-2*/}
      <Scrollbars autoHide>
        {labelsWithTimeStamps?.map((s, i) => (
          <ListItem
            key={i}
            text={s.labelName}
            iconOnly={state.LabelPanelClosed}
            active={
              state.activeCollection === Collections.Label &&
              state.activeLabel === s.labelName
            }
            onClick={() => handleLabelClick(s.labelName)}
            icon={<span className="material-symbols-outlined">label</span>}
            style={{
              marginBottom: "0.5rem",
              cursor: "pointer",
            }}
            rootClassName={`hover:bg-selectedItem-2 dark:hover:bg-dark_selectedItem_2 dark:hover:text-dark_primary`}
          />
        ))}
      </Scrollbars>
      <RecentlyDeleted />

      <div className={"mt-auto"}>
        <EditLabelsButton />
        {activeUser ? (
          <>
            <UserButton ref={userSettingsButtonRef} />
            <OutsideAlerter
              condition={UserSettingPanelOutsideClickCondition}
              callback={handleUserSettingPanelOutsideClick}
            >
              <SettingsPanelWrapper>
                <SettingsPanel show={state.showUserSettingsPanel}>
                  <UserSettingsPanelContent />
                </SettingsPanel>
              </SettingsPanelWrapper>
            </OutsideAlerter>
          </>
        ) : (
          <AccountButton />
        )}
        <SettingsButton ref={settingsButtonRef} />
        <OutsideAlerter
          condition={SettingPanelOutsideClickCondition}
          callback={handleSettingPanelOutsideClick}
        >
          <SettingsPanelWrapper>
            <SettingsPanel show={state.showSettingsPanel}>
              <SettingsPanelContent />
            </SettingsPanel>
          </SettingsPanelWrapper>
        </OutsideAlerter>
      </div>
    </>
  );
}
