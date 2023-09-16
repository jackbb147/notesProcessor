import { GraphActionType, GraphNode } from "../../../../reducers/GraphReducer";
import { useGraphology } from "../../../../hooks/useGraphology";
import {
  useAppState,
  useGraph,
  useGraphDispatch,
} from "../../../../hooks/AppStateAndGraphAndUserhooks";
import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import ScrollableButHiddenScrollBar from "../../../ScrollableButHiddenScrollBar.module.css";
import Select, { ActionMeta, CSSObjectWithLabel } from "react-select";

import { Separator } from "../Separator";
import { Title } from "../Title";
import {
  useGetNotesQuery,
  useGetLinksQuery,
  useAddLinkMutation,
  useDeleteLinkMutation,
} from "../../../../api/apiSlice";
import { NoteItem } from "../NoteItem";
import { v4 as uuid } from "uuid";

/**
 *
 * @param note
 * @constructor
 */
function Selector({ note }: { note: GraphNode }) {
  //   TODO options should be all undirected neighbors of this note that are not already listed in the SeeAlso section
  const { data: notes } = useGetNotesQuery();
  const { data: links } = useGetLinksQuery();
  const [addLink, { isLoading: isAddingLink }] = useAddLinkMutation();
  const [options, setOptions] = useState<any[]>([]);
  const [listed, setListed] = useState<string[]>([]);
  const AppState = useAppState();
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    if (!notes) {
      console.warn("[Selector] notes not available");
      return;
    }
    if (!links) {
      console.warn("[Selector] links not available");
      return;
    }
    try {
      console.log("Selector");

      // const undirectedNeighbors = graphology.undirectedNeighbors(note.Id);
      const undirectedNeighbors = links
        .filter((link) => {
          return (
            link.Undirected &&
            !link.Deleted &&
            (link.SourceId === note.Id || link.TargetId === note.Id)
          );
        })
        .map((link) => {
          if (link.SourceId === note.Id) {
            return link.TargetId;
          } else {
            return link.SourceId;
          }
        });
      const id = note.Id;
      const options = notes
        .filter((note: GraphNode) => {
          return (
            !note.Deleted &&
            note.Id !== id &&
            !undirectedNeighbors.includes(note.Id)
          );
        })
        .map((note: GraphNode) => {
          return {
            value: note.Id,
            label: note.Title,
          };
        });
      setOptions(options);
    } catch (e) {
      console.error(e);
    }
  }, [notes, links, note]);

  function handleChange(option: any, actionMeta: ActionMeta<any>) {
    if (actionMeta.action !== "select-option") return;
    const id = option.value;
    addLink({
      Id: uuid(),
      SourceId: note.Id,
      TargetId: id,
      Undirected: true,
    });
  }

  return (
    <div
      className={`
    flex
    flex-row
    w-full
    items-center
    `}
    >
      <span className="material-symbols-outlined">add</span>
      <Select
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={{
          //this is a hack to make the select box empty after a selection is made
          value: "",
          label: "",
        }}
        options={options}
        onChange={handleChange}
        styles={{
          container: (provided, state) => ({
            ...provided,
            width: "100%",
          }),
          control: (provided, state) => ({
            ...provided,
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            cursor: "text",
          }),
          input: (provided, state) => ({
            ...provided,
            color: AppState.darkModeOn ? "white" : "black",

            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
            borderBottomColor: AppState.darkModeOn
              ? isFocused
                ? state.theme.colors.primary
                : state.theme.colors.neutral20
              : isFocused
              ? state.theme.colors.primary
              : state.theme.colors.neutral20,
          }),
          indicatorsContainer: (provided, state) => ({
            ...provided,
            display: "none",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: AppState.darkModeOn
              ? state.isFocused
                ? state.theme.colors.neutral0
                : "transparent"
              : state.isFocused
              ? state.theme.colors.primary50
              : "transparent",
            color: AppState.darkModeOn
              ? state.isFocused
                ? "black"
                : "white"
              : state.isFocused
              ? "black"
              : "black",
          }),
          menu: (base, state): CSSObjectWithLabel => ({
            ...base,
            backgroundColor: AppState.darkModeOn
              ? state.theme.colors.neutral80
              : "transparent",
          }),
          // o,
        }}
      />
    </div>
  );
}
export function SeeAlso({ note }: { note: GraphNode }) {
  const { data: notes } = useGetNotesQuery();
  const { data: links } = useGetLinksQuery();
  const [deleteLink, { isLoading: isDeletingLink }] = useDeleteLinkMutation();
  const [undirectedNeighbors, setUndirectedNeighbors] = useState<string[]>([]);

  useEffect(() => {
    if (!notes) {
      console.warn("[SeeAlso] notes not available");
      return;
    }
    if (!links) {
      console.warn("[SeeAlso] links not available");
      return;
    }
    var neighborIds: string[] = [];

    links.forEach((link) => {
      if (
        link.Undirected &&
        (link.SourceId === note.Id || link.TargetId === note.Id)
      ) {
        if (link.SourceId === note.Id) {
          neighborIds.push(link.TargetId);
        } else {
          neighborIds.push(link.SourceId);
        }
      }
    });
    neighborIds = neighborIds.filter((id) => {
      return notes.some((note) => note.Id === id && note.Deleted === false);
    });

    setUndirectedNeighbors(neighborIds);
  }, [notes, links, note]);

  function handleDelete() {} //TODO
  if (!notes) return null;
  if (!links) return null;
  return (
    <>
      <div
        className={`${styles.flexItem} ${ScrollableButHiddenScrollBar.ScrollableButHiddenScrollBar}`}
      >
        <Title text={"See also"} />
        <div>
          {undirectedNeighbors.map((id) => {
            const neighborNode = notes.find((node) => node.Id === id);
            if (neighborNode) {
              return (
                <NoteItem
                  note={neighborNode}
                  deletable={true}
                  onDelete={() => {
                    // TODO
                    const link = links.find((link) => {
                      return (
                        ((link.SourceId === note.Id &&
                          link.TargetId === neighborNode.Id) ||
                          (link.SourceId === neighborNode.Id &&
                            link.TargetId === note.Id)) &&
                        link.Undirected
                      );
                    });
                    if (link) {
                      deleteLink({
                        sourceId: link.SourceId,
                        targetId: link.TargetId,
                      });
                    }
                  }}
                />
              );
            } else {
              return null;
            }
          })}
          <Selector note={note} />
        </div>
      </div>
      <Separator />
    </>
  );
}
