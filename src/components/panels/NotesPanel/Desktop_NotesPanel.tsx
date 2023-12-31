import { NotesPanelContent } from "./NotesPanelContent";
import { AddNodeButton } from "../../Buttons/AddNodeButton";
import { EditorSwitch } from "../../EditorView/EditorSwitch";
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

export function Desktop_NotesPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const graph = useGraph();
  const graphDispatch = useGraphDispatch();
  const state = useAppState();
  const dispatch = useAppDispatch();

  const activeCollection = useActiveCollection();
  // function activeCollection() {
  //     if(graph===null || graphDispatch === null) throw Error("graph or graphDispatch is null. ");
  //     if(state === null) throw Error("state is null.")
  //     var collection: GraphNode[];
  //     switch (state.activeCollection) {
  //         case Collections.All: {
  //             collection = graph.nodes
  //             console.log("collection: ", JSON.stringify(collection))
  //             break;
  //         }
  //         case Collections.RecentlyDeleted: {
  //             collection = graph.deletedNodes
  //             break;
  //         }
  //         case Collections.Label: {
  //             collection = graph.nodes.filter(node => state.activeLabel && node.labels.includes(state.activeLabel))
  //             break;
  //         }
  //     }
  //
  //     return collection;
  // }
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
