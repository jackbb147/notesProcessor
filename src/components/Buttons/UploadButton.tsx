import {
  useAppState,
  useDispatch,
  useGraphDispatch,
} from "../../hooks/AppStateAndGraphhooks";
import { ListItem } from "./ListItem";
import React, { useRef } from "react";
import { useUpload } from "../../hooks/useUpload";
import { GraphActionType, GraphState } from "../../reducers/GraphReducer";

export function UploadButton() {
  const state = useAppState();
  const dispatch = useDispatch();
  const graphDispatch = useGraphDispatch();
  const ref = useRef<any>(null);
  const upload = useUpload();

  async function handleClick() {
    let obj = (await upload()) as GraphState;
    graphDispatch({
      type: GraphActionType.merge,
      other: obj,
    });
  }

  return (
    <>
      <ListItem
        ref={ref}
        text={"Upload Notes"}
        iconOnly={state.LabelPanelClosed}
        onClick={handleClick}
        icon={<span className="material-symbols-outlined">upload</span>}
      ></ListItem>
    </>
  );
}
