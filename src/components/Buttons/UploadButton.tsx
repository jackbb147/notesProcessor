import {
  useAppState,
  useAppDispatch,
  useGraphDispatch,
} from "../../hooks/AppStateAndGraphAndUserhooks";
import { ListItem } from "./ListItem";
import React, { useRef } from "react";
import { useUpload } from "../../hooks/useUpload";
import {
  GraphActionType,
  GraphNode,
  GraphState,
} from "../../reducers/GraphReducer";
import { migrate } from "../../_migration/GraphStateMigration";
import { Version1_0 } from "../../_migration/GraphStates/V1_0";
import { Version } from "../../Version";
import { useAddNoteMutation } from "../../api/apiSlice";

export function UploadButton() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const graphDispatch = useGraphDispatch();
  const ref = useRef<any>(null);
  const upload = useUpload();
  const [
    addNote,
    {
      isLoading: addNoteIsLoading,
      isError: addNoteIsError,
      error: addNoteError,
    },
  ] = useAddNoteMutation();

  async function handleClick() {
    let obj = await upload();
    try {
      const migratedObj = migrate(obj, "1.0");
      debugger;
      let parseResult = Version1_0.safeParse(migratedObj);
      if (!parseResult.success) {
        debugger;
        console.error(parseResult.error);
        return;
      }
      debugger;
      // TODO
      const migratedGraphState: Version1_0 = parseResult.data;
      for (const node of migratedGraphState.nodes) {
        const nodeToUpload: GraphNode = {
          Id: node.id,
          Content: node.content,
          Title: node.title,
          DateCreated: node.dateCreated,
          DateLastModified: node.dateLastModified,
          Deleted: false,
        };
        await addNote(nodeToUpload);
      }

      for (const node of migratedGraphState.deletedNodes) {
        const nodeToUpload: GraphNode = {
          Id: node.id,
          Content: node.content,
          Title: node.title,
          DateCreated: node.dateCreated,
          DateLastModified: node.dateLastModified,
          Deleted: true,
        };
        await addNote(nodeToUpload);
      }

      // upload all the notes, labels, links to the server.
      // graphDispatch({
      //   type: GraphActionType.set, // todo maybe change this to "set" because "merge" creates trouble when the versions aren't the same??  Or maybe migrate first, before merging?
      //   state: parseResult.data,
      // });
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
