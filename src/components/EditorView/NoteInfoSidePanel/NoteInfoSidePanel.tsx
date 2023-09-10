import styles from "./styles.module.css";
import { GraphActionType, GraphNode } from "../../../reducers/GraphReducer";
import { useGraphology } from "../../../hooks/useGraphology";
import { useContext, useEffect, useState } from "react";
import { ListItem } from "../../Buttons/ListItem";
import {
  useAppState,
  useDispatch,
  useGraph,
  useGraphDispatch,
} from "../../../hooks/AppStateAndGraphAndUserhooks";
import Select, { ActionMeta, CSSObjectWithLabel } from "react-select";
import ScrollableButHiddenScrollBar from "../../ScrollableButHiddenScrollBar.module.css";
import { AppActionType, Collections } from "../../../reducers/AppStateReducer";
import { Tablet } from "../../../hooks/useMediaQuery";
import { Desktop } from "../../../hooks/useMediaQuery";
import { Mobile } from "../../../hooks/useMediaQuery";
import { ReferenceStateContext } from "../Tiptap/Reference/ReferenceStateContext";
import { useSyncGraphLinks } from "../Tiptap/Reference/useSyncGraphLinks";

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
      id: note.Id,
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
        key={note.Id}
        text={note.Title}
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
      setUndirectedNeighbors((v) => graphology.undirectedNeighbors(note.Id));
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
            const node = GraphState.nodes.find((node) => node.Id === id);
            if (node) {
              return (
                <NoteItem
                  note={node}
                  deletable={true}
                  onDelete={() => {
                    const link = GraphState.links.find((link) => {
                      return (
                        ((link.source === note.Id && link.target === node.Id) ||
                          (link.source === node.Id &&
                            link.target === note.Id)) &&
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
      setInNeighbors((v) => graphology.inNeighbors(note.Id));
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
            const node = GraphState.nodes.find((node) => node.Id === id);
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

function References({
  note,
  referenceMap,
}: {
  note: GraphNode;
  referenceMap: Map<string, number>;
}) {
  const [graphology, updated] = useGraphology();
  const GraphState = useGraph();
  const [OutNeighbors, setOutNeighbors] = useState<string[]>([]);
  useEffect(() => {
    try {
      console.log("LinksFromThisNote");
      setOutNeighbors((v) => graphology.outNeighbors(note.Id));
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
          {Array.from(referenceMap.entries()).map(([id, count]) => {
            if (count < 1) return null;
            const node = GraphState.nodes.find((node) => node.Id === id);
            if (node) {
              return <NoteItem note={node} />;
            } else {
              return null;
            }
            return <div></div>;
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
      const undirectedNeighbors = graphology.undirectedNeighbors(note.Id);
      const options = allNotes
        .filter((id) => {
          return note.Id !== id && !undirectedNeighbors.includes(id);
        })
        .map((id) => {
          return {
            value: id,
            label:
              GraphState.nodes.find((node) => node.Id === id)?.Title ?? "ERROR",
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
        source: note.Id,
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

function NoteInfoSidePanelWrapper({
  width,
  children,
}: {
  width: string;
  children: React.ReactNode;
}) {
  const AppState = useAppState();
  const dispatch = useDispatch();
  return (
    <>
      <Mobile>
        <div //this div is the dark overlay that covers the rest of the screen when the side panel is open
          onClick={(e) => {
            e.stopPropagation();
            dispatch({
              type: AppActionType.setShowNoteInfoPanel,
              show: false,
            });
          }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: "0px",
            top: "0px",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: AppState.showNoteInfoPanel ? "block" : "none",
          }}
        ></div>
        <div
          className={`flex flex-col ${styles.noteInfoSidePanel}  bg-white dark:bg-dark_secondary `}
          style={{
            width: AppState.showNoteInfoPanel ? "60%" : "0px",
            position: "absolute",
            right: "0px",
            height: "100%",
            zIndex: 100,
          }}
          onClick={(e) => {
            e.stopPropagation(); // this is to allow the editor, excluding the toolbar,  to be clicked on in order to focus the editor
          }}
        >
          {children}
        </div>
      </Mobile>

      <Tablet>
        <div
          className={`flex flex-col ${styles.noteInfoSidePanel} `}
          style={{
            width: width,
          }}
          onClick={(e) => {
            e.stopPropagation(); // this is to allow the editor, excluding the toolbar,  to be clicked on in order to focus the editor
          }}
        >
          {children}
        </div>
      </Tablet>

      <Desktop>
        <div
          className={`flex flex-col ${styles.noteInfoSidePanel} `}
          style={{
            width: width,
          }}
          onClick={(e) => {
            e.stopPropagation(); // this is to allow the editor, excluding the toolbar,  to be clicked on in order to focus the editor
          }}
        >
          {children}
        </div>
      </Desktop>
    </>
  );
}

export function NoteInfoSidePanel({
  note,
  width,
}: {
  note: GraphNode;
  width: any;
}) {
  const referenceState = useContext(ReferenceStateContext);

  useSyncGraphLinks({ sourceID: note.Id });
  return (
    <NoteInfoSidePanelWrapper width={width}>
      <References note={note} referenceMap={referenceState.referenceMap} />
      <ReferencedBy note={note} />
      <SeeAlso note={note} />
    </NoteInfoSidePanelWrapper>
  );
}
