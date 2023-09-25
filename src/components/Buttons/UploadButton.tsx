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
  GraphLink,
  GraphNode,
  GraphState,
} from "../../reducers/GraphReducer";
import { migrate } from "../../_migration/GraphStateMigration";
import { Version1_0 } from "../../_migration/GraphStates/V1_0";
import { Version } from "../../Version";
import {
  useAddNoteMutation,
  useAddLabelMutation,
  useSetLabelMutation,
  useAddLinkMutation,
} from "../../api/apiSlice";
import { v4 as uuidv4 } from "uuid";

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
  const [addLabel, { isLoading: addLabelIsLoading, isError: addLabelIsError }] =
    useAddLabelMutation();

  const [setLabel, { isLoading: setLabelIsLoading, isError: setLabelIsError }] =
    useSetLabelMutation();

  const [addLink, { isLoading: addLinkIsLoading, isError: addLinkIsError }] =
    useAddLinkMutation();
  const [uploadedNoteCount, setUploadedNoteCount] = React.useState<number>(0);

  async function handleClick() {
    let obj = await upload();
    try {
      const migratedObj = migrate(obj, "1.0");
      // debugger;
      let parseResult = Version1_0.safeParse(migratedObj);
      if (!parseResult.success) {
        debugger;
        console.error(parseResult.error);
        return;
      }
      // debugger;
      // TODO
      const migratedGraphState: Version1_0 = parseResult.data;
      // TODO clear data first before uploading

      try {
        for (const node of migratedGraphState.nodes) {
          const nodeToUpload: GraphNode = {
            Id: node.id,
            Content: node.content.length < 1 ? "Empty" : node.content,
            Title: node.title.length < 1 ? "No Title" : node.title,
            DateCreated: node.dateCreated,
            DateLastModified: node.dateLastModified,
            Deleted: false,
          };
          await addNote(nodeToUpload).unwrap();
          setUploadedNoteCount((prev) => {
            console.log(
              `added ${prev + 1}/${
                migratedGraphState.nodes.length
              } notes so far `,
            );
            return prev + 1;
          });
        }
      } catch (e) {
        console.error(e);
        debugger;
      }
      debugger;

      try {
        for (const node of migratedGraphState.nodes) {
          for (const label of node.labels) {
            await setLabel({
              noteId: node.id,
              label: label,
            }).unwrap();
          }
        }
      } catch (e) {
        console.error(e);
        debugger;
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
        await addNote(nodeToUpload).unwrap();
      }

      for (const link of migratedGraphState.links) {
        // TODO
        const linkToUpload: GraphLink = {
          Id: uuidv4(),
          SourceId: link.source,
          TargetId: link.target,
        };

        await addLink(linkToUpload).unwrap();
      }
      alert("upload successful!");

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
