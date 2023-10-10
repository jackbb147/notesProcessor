import React, { useContext } from "react";
import { FolderPanelContent } from "./FolderPanelContent";
import { Mobile_SidePanel } from "../../ui/SidePanel/Mobile/Mobile_SidePanel";
import {
  GraphContext,
  GraphDispatchContext,
} from "../../../reducers/GraphContext";
import {
  AppStateContext,
  AppStateDispatchContext,
} from "../../../reducers/AppStateContext";
import { AppActionType } from "../../../reducers/AppStateReducer";

export function Mobile_FolderPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const graph = useContext(GraphContext);
  const graphDispatch = useContext(GraphDispatchContext);
  const state = useContext(AppStateContext);
  const dispatch = useContext(AppStateDispatchContext);
  if (state === null || dispatch === null)
    throw Error("state or dispatch is null. ");
  if (graph === null || graphDispatch === null)
    throw Error("graph or graphDispatch is null. ");

  return (
    <div
      className={
        "dark:bg-dark_secondary  dark:border-dark_secondary w-full h-full "
      }
    >
      <Mobile_SidePanel
        panelChildren={<FolderPanelContent />}
        sideBarClosed={state.LabelPanelClosed}
        maxWidth={"70%"}
        requestSideBarClose={() => {
          dispatch({
            type: AppActionType.closeLabelPanel,
          });
        }}
      >
        {children}
      </Mobile_SidePanel>
    </div>
  );
}
