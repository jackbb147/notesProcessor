import { GraphNode } from "../../../../reducers/GraphReducer";
import { useGraphology } from "../../../../hooks/useGraphology";
import { useGraph } from "../../../../hooks/AppStateAndGraphAndUserhooks";
import { useEffect } from "react";
import styles from "../styles.module.css";
import ScrollableButHiddenScrollBar from "../../../ScrollableButHiddenScrollBar.module.css";
import { Title } from "../Title";
import { Separator } from "../Separator";

export function ReferencedBy({ note }: { note: GraphNode }) {
  const [graphology, updated] = useGraphology();
  const GraphState = useGraph();
  // const [InNeighbors, setInNeighbors] = useState<string[]>([]);

  useEffect(() => {
    try {
      console.log("LinksToThisNote");
      // setInNeighbors((v) => graphology.inNeighbors(note.Id));
      // console.log("InNeighbors", InNeighbors);
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
        {/*<div>*/}
        {/*  {InNeighbors.map((id) => {*/}
        {/*    const node = GraphState.nodes.find((node) => node.Id === id);*/}
        {/*    if (node) {*/}
        {/*      return <NoteItem note={node} />;*/}
        {/*    } else {*/}
        {/*      return null;*/}
        {/*    }*/}
        {/*  })}*/}
        {/*</div>*/}
      </div>
      <Separator />
    </>
  );
}
