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
  if (!notes) return null;
  if (!links) return null;
  const inNeighborIds = Array.from(
    new Set(
      links
        .filter((link) => link.TargetId === note.Id && !link.Deleted)
        .map((link) => link.SourceId)
        .filter((id) => notes.some((note) => note.Id === id)),
    ),
  );

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
