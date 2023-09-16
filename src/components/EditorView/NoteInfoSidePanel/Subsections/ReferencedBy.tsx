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
import { useInNeighborIds } from "../../../../hooks/useInNeighborIds";

export function ReferencedBy({ note }: { note: GraphNode }) {
  const { data: notes } = useGetNotesQuery();
  const { data: links } = useGetLinksQuery();
  const inNeighborIds = useInNeighborIds(note.Id);
  if (!notes) return null;
  if (!links) return null;

  const inNeighbors: GraphNode[] = inNeighborIds.map(
    (id) => notes.find((note) => note.Id === id)!,
  );
  return (
    <>
      <div
        className={`${styles.flexItem} ${ScrollableButHiddenScrollBar.ScrollableButHiddenScrollBar}`}
      >
        <Title text={"Referenced By"} />
        <div>
          {inNeighbors.map((node) => (
            <NoteItem note={node} />
          ))}
        </div>
      </div>
      <Separator />
    </>
  );
}
