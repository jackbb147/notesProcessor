import { GraphNode } from "../../../../reducers/GraphReducer";
import { useGraphology } from "../../../../hooks/useGraphology";
import { useGraph } from "../../../../hooks/AppStateAndGraphAndUserhooks";
import { useEffect } from "react";
import styles from "../styles.module.css";
import ScrollableButHiddenScrollBar from "../../../ScrollableButHiddenScrollBar.module.css";
import { Title } from "../Title";
import { Separator } from "../Separator";
import { NoteItem } from "../NoteItem";
import { useGetNotesQuery } from "../../../../api/apiSlice";

export function References({
  note,
  referenceMap,
}: {
  note: GraphNode;
  referenceMap: Map<string, number>;
}) {
  // const [graphology, updated] = useGraphology();
  const { data: notes } = useGetNotesQuery();
  // const GraphState = useGraph();
  // const [OutNeighbors, setOutNeighbors] = useState<string[]>([]);
  useEffect(() => {
    try {
      console.log("LinksFromThisNote");
      // setOutNeighbors((v) => graphology.outNeighbors(note.Id));
      // console.log("OutNeighbors", OutNeighbors);
    } catch (e) {
      console.error(e);
    }
  }, [note]);
  console.log(
    "[References] Reference map: " + Array.from(referenceMap.entries()),
  );
  // console.log("[References] GraphState: " + GraphState)
  if (!notes) return null;
  return (
    <>
      <div
        className={`${styles.flexItem} ${ScrollableButHiddenScrollBar.ScrollableButHiddenScrollBar}`}
      >
        <Title text={"References"} />
        <div>
          {Array.from(referenceMap.entries()).map(([id, count]) => {
            if (count < 1) return null;
            const node = notes.find((node) => node.Id === id);
            if (node) {
              return <NoteItem note={node} />;
            } else {
              console.warn("[References] Node not found: " + id);
              return null;
            }
          })}
        </div>
      </div>
      <Separator />
    </>
  );
}
