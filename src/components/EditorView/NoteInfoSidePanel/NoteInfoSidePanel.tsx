import styles from "./styles.module.css";
import { GraphActionType, GraphNode } from "../../../reducers/GraphReducer";
import { useGraphology } from "../../../hooks/useGraphology";
import { useEffect, useState } from "react";
import { ListItem } from "../../Buttons/ListItem";
import {
  useDispatch,
  useGraph,
  useGraphDispatch,
} from "../../../hooks/AppStateAndGraphhooks";
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
