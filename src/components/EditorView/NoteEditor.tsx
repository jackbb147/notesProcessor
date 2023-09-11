import React, { useEffect, useRef, useState } from "react";
import "./Quill/quillModules/quillStyle.css";

import styles from "./NoteEditorStyle.module.css";

import { ReferenceMapProvider } from "./Tiptap/Reference/ReferenceStateContext";

//@ts-ignore
import { MathEditorModule } from "./Quill/quillModules/Quill-MathJax/MathEditorModule";
import "./Quill/quillModules/Quill-MathJax/quill.bubble.css";
import "./Quill/quillModules/Quill-MathJax/quill.snow.css";
import { GraphActionType, GraphNode } from "../../reducers/GraphReducer";
import { LabelSelector } from "./LabelSelector";
import { ActionMeta, Options } from "react-select";
import {
  useAppState,
  useDispatch,
  useGraph,
  useGraphDispatch,
} from "../../hooks/AppStateAndGraphAndUserhooks";
import { NoteInfoSidePanel } from "./NoteInfoSidePanel/NoteInfoSidePanel";
import { Button } from "../ui/Button";
import { AppActionType, Collections } from "../../reducers/AppStateReducer";
import { TiptapBoxComponent } from "./Tiptap/Tiptap";

function ToggleSideInfoPanelButton({ disabled }: { disabled: boolean }) {
  const appState = useAppState();
  const dispatch = useDispatch();
  const [color, setColor] = useState("");
  useEffect(() => {
    if (appState.darkModeOn) {
      if (appState.showNoteInfoPanel) {
        setColor("#FFC700");
      } else {
        setColor("white");
      }
    } else {
      if (appState.showNoteInfoPanel) {
        setColor("#FFC700");
      } else {
        setColor("black");
      }
    }
  }, [appState.showNoteInfoPanel, appState.darkModeOn]);

  return (
    <Button
      icon={<span className="material-symbols-outlined">info</span>}
      rootStyles={{
        color: color,
        cursor: "pointer",
        visibility: disabled ? "hidden" : "visible",
      }}
      onClick={(e) => {
        e.preventDefault();
        dispatch({
          type: AppActionType.setShowNoteInfoPanel,
          show: !appState.showNoteInfoPanel,
        });
      }}
    />
  );
}

/**
 *
 * @param note
 * @param onBlur
 * @param onFinishSetUp
 * @param locked
 * @param onEditAttempt callback for when user attempts to edit a locked node.
 * @constructor
 */
export function NoteEditor({
  note,
  onBlur = (note: GraphNode) => {},
  onFinishSetUp = () => {},
  locked = false,
  onEditAttempt = () => {
    console.log("Edit attempted");
  },
  darkModeOn = true,
}: {
  note: GraphNode;
  onBlur?: (note: GraphNode) => any;
  onFinishSetUp?: () => any;
  locked?: boolean | undefined;
  onEditAttempt?: () => any;
  darkModeOn?: boolean;
}) {
  const graph = useGraph();
  const graphDispatch = useGraphDispatch();

  const appState = useAppState();
  const dispatch = useDispatch();
  const [infoPanelWidth, setInfoPanelWidth] = useState("");
  const [focusRequested, setFocusRequested] = useState(0);

  // const [referenceMap, setReferenceMap] = useState(new Map());

  useEffect(() => {
    if (appState.showNoteInfoPanel) {
      setInfoPanelWidth("25%");
    } else {
      setInfoPanelWidth("0%");
    }
  }, [appState.showNoteInfoPanel]);

  const noteRef = useRef<GraphNode>(note); //https://stackoverflow.com/questions/57847594/react-hooks-accessing-up-to-date-state-from-within-a-callback
  noteRef.current = note;

  useEffect(() => {
    console.log(`note changed: ${JSON.stringify(note)}`);
  }, [note]);

  function handleBlur(s: string, firstLine: string = "") {
    //
    var newNode: GraphNode = {
      ...noteRef.current,
      Content: s,
      Title: firstLine,
      DateLastModified: new Date().toJSON(),
    };
    //
    onBlur(newNode);
  }

  function handleChange(value: Options<any>, action: ActionMeta<any>) {
    //
    switch (action.action) {
      case "create-option": {
        //
        graphDispatch({
          type: GraphActionType.addLabel,
          label: action.option.label,
        });

        graphDispatch({
          type: GraphActionType.addLabelToNode,
          label: action.option.label,
          id: note.Id,
        });

        break;
      }

      case "select-option": {
        graphDispatch({
          type: GraphActionType.updateNode,
          node: {
            ...note,
            // labels: [...note.labels, action.option.label],
          },
        });
        break;
      }

      case "deselect-option": {
        console.log("Deselect option fired");
        //
        // graphDispatch({
        //     type: GraphActionType.updateNode,
        //     node: {
        //         ...note,
        //         labels: note.labels.filter((s:string)=>s !== action.option.label)
        //     }
        // })
        break;
      }

      case "remove-value": {
        //
        console.log("remove value fired");
        //
        // graphDispatch({
        //   type: GraphActionType.updateNode,
        //   node: {
        //     ...note,
        //     labels: [].filter((s: string) => s !== action.removedValue.label),
        //   },
        // });
        break;
      }
    }
  }

  return (
    <div
      className={`${styles.noteEditorContainer}`}
      style={{
        // width: "100%",
        overflowX: "hidden",
        // ensures no selection
        userSelect: "none",
        // disable browser handling of all panning and zooming gestures on touch devices
        touchAction: "none",
      }}
    >
      <div
        onClick={() => {
          // alert("hey");
          setFocusRequested(focusRequested + 1);
        }}
        style={{
          height: "95%",
          // border: darkModeOn ? "1px solid red" : "1px solid #ccc",
          marginBottom: ".2rem",
          display: "flex",
          flexDirection: "row",
          position: "relative",
          paddingLeft: "2px",
        }}
      >
        <ReferenceMapProvider note={note}>
          <TiptapBoxComponent
            note={note}
            width={`calc(100% - ${infoPanelWidth})`}
            focusRequested={focusRequested}
            // updateReferences={(map: Map<string, number>) => {
            //   setReferenceMap(map);
            // }}
          />
          {/*{appState.activeCollection !== Collections.RecentlyDeleted && (*/}
          {/*  <NoteInfoSidePanel*/}
          {/*    note={note}*/}
          {/*    width={infoPanelWidth}*/}
          {/*    // referenceMap={new Map(referenceMap.entries())}*/}
          {/*  />*/}
          {/*)}*/}
        </ReferenceMapProvider>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexGrow: "1",
        }}
      >
        <div
          style={{
            width: "95%",
          }}
        >
          <LabelSelector handleChange={handleChange} labels={[]} />
        </div>

        <div
          style={{
            flexGrow: "1",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginLeft: "1rem",
          }}
        >
          <ToggleSideInfoPanelButton
            disabled={appState.activeCollection === Collections.RecentlyDeleted}
          />
          {/*<span className="material-symbols-outlined">info</span>*/}
          {/*<LastEditedWhen />*/}
        </div>
      </div>
    </div>
  );
}
