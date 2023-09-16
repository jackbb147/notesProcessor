import { GraphNode } from "../../../../reducers/GraphReducer";
import { useGraphology } from "../../../../hooks/useGraphology";
import { useGraph } from "../../../../hooks/AppStateAndGraphAndUserhooks";
import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import ScrollableButHiddenScrollBar from "../../../ScrollableButHiddenScrollBar.module.css";
import { Title } from "../Title";
import { Separator } from "../Separator";
import { useGetNotesQuery, useGetLinksQuery } from "../../../../api/apiSlice";
import { NoteItem } from "../NoteItem";

export function ReferencedBy({ note }: { note: GraphNode }) {
  const { data: notes } = useGetNotesQuery();
  const { data: links } = useGetLinksQuery();
  const [graphology, updated] = useGraphology();
  const GraphState = useGraph();
  const [InNeighbors, setInNeighbors] = useState<string[]>([]);

  // useEffect(() => {
  //   if (!notes) {
  //     console.warn("[ReferencedBy] no notes available");
  //     return;
  //   }
  //   if (!links) {
  //     console.warn("[ReferencedBy] no links available");
  //     return;
  //   }
  //   try {
  //     console.log("LinksToThisNote");
  //     // if (!graphology.hasNode(note.Id)) {
  //     //   console.warn("[ReferencedBy] Node not found in graphology: " + note.Id);
  //     //   console.debug(
  //     //     "[ReferencedBy] graphology nodes: " +
  //     //       JSON.stringify(graphology.nodes(), null, 2),
  //     //   );
  //     // } else {
  //     //   setInNeighbors((v) => graphology.inNeighbors(note.Id));
  //     // }
  //     // console.log("InNeighbors", InNeighbors);
  //     var inNeighbors = ;
  //
  //     setInNeighbors(inNeighbors);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, [updated, note]);

  if (!notes) return null;
  if (!links) return null;
  const inNeighborIds = Array.from(
    new Set(
      links
        .filter((link) => link.TargetId === note.Id && !link.Deleted)
        .map((link) => link.SourceId),
    ),
  );
  return (
    <>
      <div
        className={`${styles.flexItem} ${ScrollableButHiddenScrollBar.ScrollableButHiddenScrollBar}`}
      >
        <Title text={"Referenced By"} />
        <div>
          {/*  THIS IS TO AVOID DUPLICATES */}
          {inNeighborIds.map((id) => {
            const node = notes.find((node) => node.Id === id);
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
