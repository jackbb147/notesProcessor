import styles from "./styles.module.css";
import { GraphNode } from "../../../reducers/GraphReducer";
import { useGraphology } from "../../../hooks/useGraphology";
import { useEffect, useState } from "react";
import { ListItem } from "../../Buttons/ListItem";
import { useGraph } from "../../../hooks/AppStateAndGraphhooks";
import ScrollableButHiddenScrollBar from "../../ScrollableButHiddenScrollBar.module.css";
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

function LinksToThisNote({ note }: { note: GraphNode }) {
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
        <Title text={"Links to this note"} />
        <div>
          {InNeighbors.map((id) => {
            const node = GraphState.nodes.find((node) => node.id === id);
            if (node) {
              return (
                <ListItem
                  key={id}
                  text={node.title}
                  icon={
                    <span className="material-symbols-outlined">article</span>
                  }
                  style={{
                    opacity: 0.7,
                    padding: "0",
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

function LinksFromThisNote({ note }: { note: GraphNode }) {
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
        <Title text={"Links from this note"} />
        <div>
          {OutNeighbors.map((id) => {
            const node = GraphState.nodes.find((node) => node.id === id);
            if (node) {
              return (
                <ListItem
                  key={id}
                  text={node.title}
                  icon={
                    <span className="material-symbols-outlined">article</span>
                  }
                  style={{
                    opacity: 0.7,
                    padding: "0",
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
        paddingTop: "1rem",
      }}
    >
      <LinksToThisNote note={note} />
      <LinksFromThisNote note={note} />
    </div>
  );
}
