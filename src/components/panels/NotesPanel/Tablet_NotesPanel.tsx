import { NotesPanelContent } from "./NotesPanelContent";

import { Desktop_SidePanel } from "../../ui/SidePanel/Desktop/Desktop_SidePanel";
import React from "react";
import { GraphNode } from "../../../reducers/GraphReducer";
import { Collections } from "../../../reducers/AppStateReducer";
import {
  useAppDispatch,
  useGraph,
  useGraphDispatch,
  useAppState,
} from "../../../hooks/AppStateAndGraphAndUserhooks";
import { useActiveCollection } from "../../../hooks/useActiveCollection";

export function Tablet_NotesPanel({ children }: { children: React.ReactNode }) {
  const graph = useGraph();
  const graphDispatch = useGraphDispatch();
  const state = useAppState();
  const dispatch = useAppDispatch();
  const activeCollection = useActiveCollection();
  return (
    <>
      <div
        className={
          "dark:bg-dark_primary  dark:border-dark_primary w-full h-full "
        }
      >
        <Desktop_SidePanel
          sideBarMinimized={!state.showNotesPanel}
          panelChildren={<NotesPanelContent collection={activeCollection} />}
        >
          {children}
        </Desktop_SidePanel>
      </div>
    </>
  );
}
