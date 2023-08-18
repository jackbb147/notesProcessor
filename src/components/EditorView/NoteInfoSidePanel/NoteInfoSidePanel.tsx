import styles from "./styles.module.css";
import { GraphNode } from "../../../reducers/GraphReducer";
import { useGraphology } from "../../../hooks/useGraphology";
import { useEffect, useState } from "react";
function Separator() {
  return (
    <div
      style={{
        height: "1px",
        width: "100%",
        backgroundColor: "white",
        marginTop: "0.5rem",
      }}
    />
  );
}
function LinksToThisNote({ note }: { note: GraphNode }) {
  const [graphology, updated] = useGraphology();
  const [InNeighbors, setInNeighbors] = useState<string[]>([]);

  useEffect(() => {
    try {
      console.log("LinksToThisNote");
      setInNeighbors((v) => graphology.inNeighbors(note.id));
      console.log("InNeighbors", InNeighbors);
    } catch (e) {
      console.error(e);
    }
  }, [updated]);

  return (
    <div className={`${styles.flexItem}`}>
      <div>Links to this note</div>
      <div>
        {InNeighbors.map((id) => (
          <div>{id}</div>
        ))}
      </div>
      <Separator />
    </div>
  );
}

function LinksFromThisNote({ note }: { note: GraphNode }) {
  const graphology = useGraphology();
  return (
    <div className={`${styles.flexItem}`}>
      <div>Links from this note</div>
      <Separator />
    </div>
  );
}
export function NoteInfoSidePanel({ note }: { note: GraphNode }) {
  return (
    <div className={`flex flex-col`}>
      <LinksToThisNote note={note} />
      <LinksFromThisNote note={note} />
    </div>
  );
}
