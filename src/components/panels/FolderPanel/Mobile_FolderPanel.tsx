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
import { useSwipeable } from "react-swipeable";

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
  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      console.log("User Swiped!", eventData);
      dispatch({ type: AppActionType.closeLabelPanel });
    },
    // ...config,
  });
  return (
    <div
      className={
        "dark:bg-dark_secondary  dark:border-dark_secondary w-full h-full "
      }
      {...handlers}
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
        sideBarRootClassNames={" bg-grey dark:bg-dark_secondary"}
        sideBarStyle={{
          border: "1px solid white",
          position: "absolute",
          width: "70%",
          height: "100%",
          right: state.LabelPanelClosed ? "100%" : "30%",
          top: "0px",
          zIndex: 100,
          // backgroundColor: "black",
        }}
      >
        {children}
      </Mobile_SidePanel>
    </div>
  );
}
