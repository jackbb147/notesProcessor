import {
  useAppState,
  useDispatch,
  useGraphDispatch,
} from "../../hooks/AppStateAndGraphAndUserhooks";
import { ListItem } from "./ListItem";
import React, { useRef } from "react";
import { useUpload } from "../../hooks/useUpload";
import { GraphActionType, GraphState } from "../../reducers/GraphReducer";
import { migrate } from "../../_migration/GraphStateMigration";
import { Version } from "../../Version";

export function UploadButton() {
  const state = useAppState();
  const dispatch = useDispatch();
  const graphDispatch = useGraphDispatch();
  const ref = useRef<any>(null);
  const upload = useUpload();

  async function handleClick() {
    let obj = await upload();
    try {
      const migratedObj = migrate(obj, Version.GraphState);
      let parseResult = GraphState.safeParse(migratedObj);
      if (!parseResult.success) {
        console.error(parseResult.error);
        return;
      }
      graphDispatch({
        type: GraphActionType.set, // todo maybe change this to "set" because "merge" creates trouble when the versions aren't the same??  Or maybe migrate first, before merging?
        state: parseResult.data,
      });
    } catch (e) {
      console.error("[uploadButton] error migrating uploaded graph:  ", e);
      return;
    }
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
