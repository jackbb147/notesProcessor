import styles from "./styles.module.css";
import { GraphActionType, GraphNode } from "../../../reducers/GraphReducer";
import { useGraphology } from "../../../hooks/useGraphology";
import { useContext, useEffect, useState } from "react";
import { ListItem } from "../../Buttons/ListItem";
import {
  useAppState,
  useAppDispatch,
  useGraph,
  useGraphDispatch,
} from "../../../hooks/AppStateAndGraphAndUserhooks";
import Select, { ActionMeta, CSSObjectWithLabel } from "react-select";
import ScrollableButHiddenScrollBar from "../../ScrollableButHiddenScrollBar.module.css";
import { AppActionType, Collections } from "../../../reducers/AppStateReducer";
import { Tablet } from "../../../hooks/useMediaQuery";
import { Desktop } from "../../../hooks/useMediaQuery";
import { Mobile } from "../../../hooks/useMediaQuery";
import { ReferenceStateContext } from "../Tiptap/Reference/ReferenceStateContext";
import { useSyncGraphLinks } from "../Tiptap/Reference/useSyncGraphLinks";
import { SeeAlso } from "./Subsections/SeeAlso";
import { Separator } from "./Separator";
import { Title } from "./Title";
import { References } from "./Subsections/References";
import { ReferencedBy } from "./Subsections/ReferencedBy";

function NoteInfoSidePanelWrapper({
  width,
  children,
}: {
  width: string;
  children: React.ReactNode;
}) {
  const AppState = useAppState();
  const dispatch = useAppDispatch();
  return (
    <>
      <Mobile>
        <div //this div is the dark overlay that covers the rest of the screen when the side panel is open
          onClick={(e) => {
            e.stopPropagation();
            dispatch({
              type: AppActionType.setShowNoteInfoPanel,
              show: false,
            });
          }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: "0px",
            top: "0px",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: AppState.showNoteInfoPanel ? "block" : "none",
          }}
        ></div>
        <div
          className={`flex flex-col ${styles.noteInfoSidePanel}  bg-white dark:bg-dark_secondary `}
          style={{
            width: AppState.showNoteInfoPanel ? "60%" : "0px",
            position: "absolute",
            right: "0px",
            height: "100%",
            zIndex: 100,
          }}
          onClick={(e) => {
            e.stopPropagation(); // this is to allow the editor, excluding the toolbar,  to be clicked on in order to focus the editor
          }}
        >
          {children}
        </div>
      </Mobile>

      <Tablet>
        <div
          className={`flex flex-col ${styles.noteInfoSidePanel} `}
          style={{
            width: width,
          }}
          onClick={(e) => {
            e.stopPropagation(); // this is to allow the editor, excluding the toolbar,  to be clicked on in order to focus the editor
          }}
        >
          {children}
        </div>
      </Tablet>

      <Desktop>
        <div
          className={`flex flex-col ${styles.noteInfoSidePanel} `}
          style={{
            width: width,
          }}
          onClick={(e) => {
            e.stopPropagation(); // this is to allow the editor, excluding the toolbar,  to be clicked on in order to focus the editor
          }}
        >
          {children}
        </div>
      </Desktop>
    </>
  );
}

export function NoteInfoSidePanel({
  note,
  width,
}: {
  note: GraphNode;
  width: any;
}) {
  const referenceState = useContext(ReferenceStateContext);

  useSyncGraphLinks({ sourceID: note.Id });
  return (
    <NoteInfoSidePanelWrapper width={width}>
      <References noteId={note.Id} />
      <ReferencedBy note={note} />
      <SeeAlso note={note} />
    </NoteInfoSidePanelWrapper>
  );
}
