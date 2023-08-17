import { NotesPanelContent } from "./NotesPanelContent";
import { AddNodeButton } from "../../Buttons/AddNodeButton";
import { EditorSwitch } from "../../EditorView/EditorSwitch";
import { Desktop_SidePanel } from "../../ui/SidePanel/Desktop/Desktop_SidePanel";
import React from "react";
import { GraphNode } from "../../../reducers/GraphReducer";
import { Collections } from "../../../reducers/AppStateReducer";
import {
  useDispatch,
  useGraph,
  useGraphDispatch,
  useAppState,
} from "../../../hooks/AppStateAndGraphhooks";
import { Mobile_SidePanel } from "../../ui/SidePanel/Mobile/Mobile_SidePanel";
import { Mobile } from "../../../hooks/useMediaQuery";
import { useActiveCollection } from "./useActiveCollection";
import { ToggleLabelPanelButton } from "../../Buttons/ToggleLabelPanelButton";

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
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={
          "dark:bg-dark_primary  dark:border-dark_primary w-full h-full "
        }
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
