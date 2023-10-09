import { NotesPanelContent } from "./NotesPanelContent";
import { AddNodeButton } from "../../Buttons/AddNodeButton";
import React from "react";
import { AppActionType } from "../../../reducers/AppStateReducer";
import {
  useAppDispatch,
  useAppState,
  useGraph,
  useGraphDispatch,
} from "../../../hooks/AppStateAndGraphAndUserhooks";
import { Mobile_SidePanel } from "../../ui/SidePanel/Mobile/Mobile_SidePanel";
import { useActiveCollection } from "../../../hooks/useActiveCollection";
import { ToggleLabelPanelButton } from "../../Buttons/ToggleLabelPanelButton";
import { useSwipeable } from "react-swipeable";

function PanelContent() {
  const activeCollection = useActiveCollection();
  return (
    <NotesPanelContent
      collection={activeCollection}
      topBarButtons={[
        <ToggleLabelPanelButton />,
        <AddNodeButton rootClassName={`ml-auto`} />,
      ]}
    />
  );
}

export function Mobile_NotesPanel({ children }: { children: React.ReactNode }) {
  const graph = useGraph();
  const graphDispatch = useGraphDispatch();
  const state = useAppState();
  const dispatch = useAppDispatch();
  const handlers = useSwipeable({
    onSwipedRight: (eventData) => {
      console.log("User Swiped!", eventData);
      dispatch({ type: AppActionType.openLabelPanel });
    },
    // ...config,
  });
  return (
    <>
      <div
        className={
          "dark:bg-dark_primary  dark:border-dark_primary w-full h-full "
        }
        {...handlers}
      >
        <Mobile_SidePanel
          panelChildren={<PanelContent />}
          sideBarClosed={state.activeNodeID !== undefined}
        >
          {children}
        </Mobile_SidePanel>
      </div>
    </>
  );
}
