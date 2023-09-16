import { GraphNode } from "../../../../reducers/GraphReducer";
import { useGraphology } from "../../../../hooks/useGraphology";
import { useGraph } from "../../../../hooks/AppStateAndGraphAndUserhooks";
import { useEffect } from "react";
import styles from "../styles.module.css";
import ScrollableButHiddenScrollBar from "../../../ScrollableButHiddenScrollBar.module.css";
import { Title } from "../Title";
import { Separator } from "../Separator";
import { NoteItem } from "../NoteItem";
import { useGetLinksQuery, useGetNotesQuery } from "../../../../api/apiSlice";
import { useOutNeighborIds } from "../../../../hooks/useOutNeighborIds";

/**
 * This component displays all the notes that the given note references.
 * @param noteId
 * @constructor
 */
export function References({
  noteId, // note,
}: {
  noteId: string;
}) {
  const { data: notes } = useGetNotesQuery();
  const { data: links } = useGetLinksQuery();
  const outNeighborIds = useOutNeighborIds(noteId);
  if (!notes) return null;
  if (!links) return null;
  const outNeighbors: GraphNode[] = outNeighborIds
    .filter((id) => notes.some((node) => node.Id === id))
    .map((id) => {
      return notes.find((node) => node.Id === id)!;
    });
  return (
    <>
      <div
        className={`${styles.flexItem} ${ScrollableButHiddenScrollBar.ScrollableButHiddenScrollBar}`}
      >
        <Title text={"References"} />
        <div>
          {outNeighbors.map((node) => (
            <NoteItem note={node} />
          ))}
        </div>
      </div>
      <Separator />
    </>
  );
}
