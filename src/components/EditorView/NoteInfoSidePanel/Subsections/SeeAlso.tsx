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

function Selector({ note }: { note: GraphNode }) {
  //   TODO options should be all undirected neighbors of this note that are not already listed in the SeeAlso section
  const { data: notes } = useGetNotesQuery();
  const { data: links } = useGetLinksQuery();
  const [addLink, { isLoading: isAddingLink }] = useAddLinkMutation();
  const [options, setOptions] = useState<any[]>([]);
  const [graphology, updated] = useGraphology();
  const [listed, setListed] = useState<string[]>([]);
  const AppState = useAppState();
  const GraphState = useGraph();
  const graphDispatch = useGraphDispatch();
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
      const allNotes = graphology.nodes();
      // const undirectedNeighbors = graphology.undirectedNeighbors(note.Id);
      const undirectedNeighbors = links
        .filter((link) => {
          return (
            link.Undirected &&
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
      const options = allNotes
        .filter((id) => {
          return note.Id !== id && !undirectedNeighbors.includes(id);
        })
        .map((id) => {
          return {
            value: id,
            label: notes.find((node) => node.Id === id)?.Title ?? "ERROR",
          };
        });
      setOptions(options);
    } catch (e) {
      console.error(e);
    }
  }, [notes, links]);

  function handleChange(option: any, actionMeta: ActionMeta<any>) {
    if (actionMeta.action !== "select-option") return;
    const id = option.value;
    addLink({
      Id: uuid(),
      SourceId: note.Id,
      TargetId: id,
      Undirected: true,
    });

    // graphDispatch({
    //   type: GraphActionType.addLink,
    //   link: {
    //     source: note.Id,
    //     target: id,
    //     undirected: true,
    //   },
    // });
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
  const [graphology, updated] = useGraphology();
  const { data: notes } = useGetNotesQuery();
  const { data: links } = useGetLinksQuery();
  const GraphState = useGraph();
  const graphDispatch = useGraphDispatch();
  const [deleteLink, { isLoading: isDeletingLink }] = useDeleteLinkMutation();
  const [undirectedNeighbors, setUndirectedNeighbors] = useState<string[]>([]);
  // useEffect(() => {
  //   try {
  //     console.log("SeeAlso");
  //     if (!graphology.hasNode(note.Id)) {
  //       console.warn("[SeeAlso] graphology does not have node", note.Id);
  //     } else {
  //       setUndirectedNeighbors((v) => graphology.undirectedNeighbors(note.Id));
  //       console.log("neighbors", undirectedNeighbors);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, [updated, note]);

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
  }, [notes, links]);

  function handleDelete() {}
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
