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

function Selector({ note }: { note: GraphNode }) {
  //   TODO options should be all undirected neighbors of this note that are not already listed in the SeeAlso section
  const [options, setOptions] = useState<any[]>([]);
  const [graphology, updated] = useGraphology();
  const [listed, setListed] = useState<string[]>([]);
  const AppState = useAppState();
  const GraphState = useGraph();
  const graphDispatch = useGraphDispatch();
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    try {
      console.log("Selector");
      const allNotes = graphology.nodes();
      // const undirectedNeighbors = graphology.undirectedNeighbors(note.Id);
      // const options = allNotes
      //   .filter((id) => {
      //     return note.Id !== id && !undirectedNeighbors.includes(id);
      //   })
      //   .map((id) => {
      //     return {
      //       value: id,
      //       label:
      //         GraphState.nodes.find((node) => node.Id === id)?.Title ?? "ERROR",
      //     };
      //   });
      // setOptions(options);
    } catch (e) {
      console.error(e);
    }
  }, [updated, note]);

  function handleChange(option: any, actionMeta: ActionMeta<any>) {
    if (actionMeta.action !== "select-option") return;
    const id = option.value;
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
  const GraphState = useGraph();
  const graphDispatch = useGraphDispatch();
  const [undirectedNeighbors, setUndirectedNeighbors] = useState<string[]>([]);
  useEffect(() => {
    try {
      console.log("SeeAlso");
      if (!graphology.hasNode(note.Id)) {
        console.warn("[SeeAlso] graphology does not have node", note.Id);
      } else {
        setUndirectedNeighbors((v) => graphology.undirectedNeighbors(note.Id));
        console.log("neighbors", undirectedNeighbors);
      }
    } catch (e) {
      console.error(e);
    }
  }, [updated, note]);
  return (
    <>
      <div
        className={`${styles.flexItem} ${ScrollableButHiddenScrollBar.ScrollableButHiddenScrollBar}`}
      >
        <Title text={"See also"} />
        <div>
          {/*{undirectedNeighbors.map((id) => {*/}
          {/*  const node = GraphState.nodes.find((node) => node.Id === id);*/}
          {/*  if (node) {*/}
          {/*    return (*/}
          {/*      <NoteItem*/}
          {/*        note={node}*/}
          {/*        deletable={true}*/}
          {/*        onDelete={() => {*/}
          {/*          const link = GraphState.links.find((link) => {*/}
          {/*            return (*/}
          {/*              ((link.source === note.Id && link.target === node.Id) ||*/}
          {/*                (link.source === node.Id &&*/}
          {/*                  link.target === note.Id)) &&*/}
          {/*              link.undirected*/}
          {/*            );*/}
          {/*          });*/}
          {/*          if (link) {*/}
          {/*            graphDispatch({*/}
          {/*              type: GraphActionType.removeLink,*/}
          {/*              link,*/}
          {/*            });*/}
          {/*          }*/}
          {/*        }}*/}
          {/*      />*/}
          {/*    );*/}
          {/*  } else {*/}
          {/*    return null;*/}
          {/*  }*/}
          {/*})}*/}
          <Selector note={note} />
        </div>
      </div>
      <Separator />
    </>
  );
}
