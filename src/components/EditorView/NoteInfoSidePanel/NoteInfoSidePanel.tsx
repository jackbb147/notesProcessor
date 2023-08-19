import styles from "./styles.module.css";
import { GraphActionType, GraphNode } from "../../../reducers/GraphReducer";
import { useGraphology } from "../../../hooks/useGraphology";
import { useEffect, useState } from "react";
import { ListItem } from "../../Buttons/ListItem";
import {
  useAppState,
  useDispatch,
  useGraph,
  useGraphDispatch,
} from "../../../hooks/AppStateAndGraphhooks";
import Select, { ActionMeta, CSSObjectWithLabel } from "react-select";
import ScrollableButHiddenScrollBar from "../../ScrollableButHiddenScrollBar.module.css";
import { AppActionType, Collections } from "../../../reducers/AppStateReducer";

function Separator() {
  return (
    <div
      style={{
        height: "1px",
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "white",
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
        opacity: 0.7,
      }}
    />
  );
}

function Title({ text }: { text: string }) {
  return (
    <div
      className={`
  text-lg
  font-bold
  text-left
  mb-3
  `}
    >
      {text}
    </div>
  );
}

function NoteItem({
  note,
  deletable = false,
  onDelete,
}: {
  note: GraphNode;
  deletable?: boolean;
  onDelete?: () => void;
}) {
  const dispatch = useDispatch();
  function onClick() {
    dispatch({
      type: AppActionType.setActiveNodeID,
      id: note.id,
    });
    dispatch({
      type: AppActionType.setActiveCollection,
      activeCollection: Collections.All,
    });
  }

  return (
    <div
      className={`
    flex
    flex-row
    justify-between
    items-center
    w-full
   
    `}
    >
      <ListItem
        onClick={onClick}
        key={note.id}
        text={note.title}
        icon={<span className="material-symbols-outlined">article</span>}
        style={{
          opacity: 0.7,
          padding: "0",
          cursor: "pointer",
        }}
      />
      {deletable && onDelete && (
        <div
          className={`
        cursor-pointer
        hover:text-red9
        ml-1.5
        h-full
        flex
        items-center
       
        justify-end
        `}
          onClick={onDelete}
        >
          <span
            style={{
              fontSize: "1.2rem",
            }}
            className="material-symbols-outlined"
          >
            close
          </span>
        </div>
      )}
    </div>
  );
}

function SeeAlso({ note }: { note: GraphNode }) {
  const [graphology, updated] = useGraphology();
  const GraphState = useGraph();
  const graphDispatch = useGraphDispatch();
  const [undirectedNeighbors, setUndirectedNeighbors] = useState<string[]>([]);
  useEffect(() => {
    try {
      console.log("SeeAlso");
      setUndirectedNeighbors((v) => graphology.undirectedNeighbors(note.id));
      console.log("neighbors", undirectedNeighbors);
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
          {undirectedNeighbors.map((id) => {
            const node = GraphState.nodes.find((node) => node.id === id);
            if (node) {
              return (
                <NoteItem
                  note={node}
                  deletable={true}
                  onDelete={() => {
                    const link = GraphState.links.find((link) => {
                      return (
                        ((link.source === note.id && link.target === node.id) ||
                          (link.source === node.id &&
                            link.target === note.id)) &&
                        link.undirected
                      );
                    });
                    if (link) {
                      graphDispatch({
                        type: GraphActionType.removeLink,
                        link,
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

function ReferencedBy({ note }: { note: GraphNode }) {
  const [graphology, updated] = useGraphology();
  const GraphState = useGraph();
  const [InNeighbors, setInNeighbors] = useState<string[]>([]);

  useEffect(() => {
    try {
      console.log("LinksToThisNote");
      setInNeighbors((v) => graphology.inNeighbors(note.id));
      console.log("InNeighbors", InNeighbors);
    } catch (e) {
      console.error(e);
    }
  }, [updated, note]);

  return (
    <>
      <div
        className={`${styles.flexItem} ${ScrollableButHiddenScrollBar.ScrollableButHiddenScrollBar}`}
      >
        <Title text={"Referenced By"} />
        <div>
          {InNeighbors.map((id) => {
            const node = GraphState.nodes.find((node) => node.id === id);
            if (node) {
              return <NoteItem note={node} />;
            } else {
              return null;
            }
          })}
        </div>
      </div>
      <Separator />
    </>
  );
}

function References({ note }: { note: GraphNode }) {
  const [graphology, updated] = useGraphology();
  const GraphState = useGraph();
  const [OutNeighbors, setOutNeighbors] = useState<string[]>([]);
  useEffect(() => {
    try {
      console.log("LinksFromThisNote");
      setOutNeighbors((v) => graphology.outNeighbors(note.id));
      console.log("OutNeighbors", OutNeighbors);
    } catch (e) {
      console.error(e);
    }
  }, [updated, note]);
  return (
    <>
      <div
        className={`${styles.flexItem} ${ScrollableButHiddenScrollBar.ScrollableButHiddenScrollBar}`}
      >
        <Title text={"References"} />
        <div>
          {OutNeighbors.map((id) => {
            const node = GraphState.nodes.find((node) => node.id === id);
            if (node) {
              return <NoteItem note={node} />;
            } else {
              return null;
            }
          })}
        </div>
      </div>
      <Separator />
    </>
  );
}

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
      const undirectedNeighbors = graphology.undirectedNeighbors(note.id);
      const options = allNotes
        .filter((id) => {
          return note.id !== id && !undirectedNeighbors.includes(id);
        })
        .map((id) => {
          return {
            value: id,
            label:
              GraphState.nodes.find((node) => node.id === id)?.title ?? "ERROR",
          };
        });
      setOptions(options);
    } catch (e) {
      console.error(e);
    }
  }, [updated, note]);

  function handleChange(option: any, actionMeta: ActionMeta<any>) {
    if (actionMeta.action !== "select-option") return;
    const id = option.value;
    graphDispatch({
      type: GraphActionType.addLink,
      link: {
        source: note.id,
        target: id,
        undirected: true,
      },
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

export function NoteInfoSidePanel({
  note,
  width,
}: {
  note: GraphNode;
  width: any;
}) {
  return (
    <div
      className={`flex flex-col`}
      style={{
        width: width,

        transition: "width .1s",
      }}
    >
      <References note={note} />
      <ReferencedBy note={note} />
      <SeeAlso note={note} />
    </div>
  );
}
