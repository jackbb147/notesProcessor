import React, { useEffect, useRef, useState } from "react";
import { Quill } from "react-quill";
import "./quillModules/quillStyle.css";
import style from "../ScrollableButHiddenScrollBar.module.css";
import { QuillBoxComponent } from "./QuillBoxComponent";

//@ts-ignore
import { MathEditorModule } from "./quillModules/Quill-MathJax/MathEditorModule";
import "./quillModules/Quill-MathJax/quill.bubble.css";
import "./quillModules/Quill-MathJax/quill.snow.css";
import { GraphActionType, GraphNode } from "../../reducers/GraphReducer";
import { RangeStatic } from "quill";
import { LabelSelector } from "./LabelSelector";
import { LastEditedWhen } from "./LastEditedWhen";
import { ActionMeta, Options } from "react-select";
import { useGraph, useGraphDispatch } from "../../hooks/AppStateAndGraphhooks";
import { NoteInfoSidePanel } from "./NoteInfoSidePanel/NoteInfoSidePanel";

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

  const appState = useState();

  const noteRef = useRef<GraphNode>(note); //https://stackoverflow.com/questions/57847594/react-hooks-accessing-up-to-date-state-from-within-a-callback
  noteRef.current = note;

  useEffect(() => {
    console.log(`note changed: ${JSON.stringify(note)}`);
  }, [note]);

  useEffect(() => {
    console.log("HEY! CHANGING COLOR");
    if (darkModeOn) {
      document
        .querySelectorAll(".ql-toolbar .ql-stroke")
        .forEach((val: Element) => {
          val.classList.add("fill-none", "stroke-fff");
        });

      document
        .querySelectorAll(".ql-toolbar .ql-fill")
        .forEach((val: Element) => {
          val.classList.add("fill-fff", "stroke-none");
        });

      document
        .querySelectorAll(".ql-toolbar .ql-picker")
        .forEach((val: Element) => {
          // val.classList.add("color-fff");
        });

      document.querySelectorAll(".ql-picker-label").forEach((val) => {
        val.classList.add("color-white");
      });

      document.querySelectorAll(".ql-quillModules.ql-blank").forEach((val) => {
        val.classList.add("placeholderWhite");
      });
    } else {
      document
        .querySelectorAll(".ql-toolbar .ql-stroke")
        .forEach((val: Element) => {
          val.classList.remove("fill-none", "stroke-fff");
        });

      document
        .querySelectorAll(".ql-toolbar .ql-fill")
        .forEach((val: Element) => {
          val.classList.remove("fill-fff", "stroke-none");
        });

      document
        .querySelectorAll(".ql-toolbar .ql-picker")
        .forEach((val: Element) => {
          // val.classList.remove("color-fff");
        });

      document.querySelectorAll(".ql-picker-label").forEach((val) => {
        val.classList.remove("color-white");
      });

      document.querySelectorAll(".ql-quillModules.ql-blank").forEach((val) => {
        val.classList.remove("placeholderWhite");
      });
    }
  }, [darkModeOn]);

  function handleBlur(s: string, firstLine: string = "") {
    // debugger;
    var newNode: GraphNode = {
      ...noteRef.current,
      content: s,
      title: firstLine,
      dateLastModified: new Date(),
    };
    // debugger;
    onBlur(newNode);
  }

  function handleChange(value: Options<any>, action: ActionMeta<any>) {
    // debugger
    switch (action.action) {
      case "create-option": {
        // debugger;
        graphDispatch({
          type: GraphActionType.addLabel,
          label: action.option.label,
        });

        graphDispatch({
          type: GraphActionType.addLabelToNode,
          label: action.option.label,
          id: note.id,
        });

        break;
      }

      case "select-option": {
        graphDispatch({
          type: GraphActionType.updateNode,
          node: {
            ...note,
            labels: [...note.labels, action.option.label],
          },
        });
        break;
      }

      case "deselect-option": {
        console.log("Deselect option fired");
        // debugger;
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
        // debugger;
        console.log("remove value fired");
        // debugger;
        graphDispatch({
          type: GraphActionType.updateNode,
          node: {
            ...note,
            labels: note.labels.filter(
              (s: string) => s !== action.removedValue.label,
            ),
          },
        });
        break;
      }
    }
  }

  return (
    <div
      style={{
        // width: "100%",
        flexGrow: "1",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: "95%",
          border: darkModeOn ? "1px solid white" : "1px solid #ccc",
          marginBottom: ".2rem",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <QuillBoxComponent
          val={note.content}
          handleBlur={(s: string, firstLine?: string) => {
            handleBlur(s, firstLine);
          }}
          onFinishSetup={onFinishSetUp}
          isReadOnly={locked}
          onEditAttempt={onEditAttempt}
          darkModeOn={darkModeOn}
          onTouchStart={() => {}}
          width={"65%"}
        />
        <NoteInfoSidePanel note={note} width={"35%"} />
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
            width: "65%",
          }}
        >
          <LabelSelector handleChange={handleChange} labels={note.labels} />
        </div>

        <div
          style={{
            flexGrow: "1",
          }}
        >
          <LastEditedWhen />
        </div>
      </div>
    </div>
  );
}
