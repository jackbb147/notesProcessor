import { useEffect, useState } from "react";
import { useGetLinksQuery, useGetNotesQuery } from "../api/apiSlice";
import { NoteItem } from "../components/EditorView/NoteInfoSidePanel/NoteItem";

/**
 * Returns the ids of the out neighbors of the node with the given id (i.e the nodes that the given node references)
 * @param id
 */
export function useOutNeighborIds(id: string): string[] {
  const { data: notes } = useGetNotesQuery();
  const { data: links } = useGetLinksQuery();
  const [outNeighbors, setOutNeighbors] = useState<string[]>([]);
  useEffect(() => {
    if (!notes) {
      console.warn("[useOutNeighbors] notes not available");
      return;
    }
    if (!links) {
      console.warn("[useOutNeighbors] links not available");
      return;
    }
    const outNeighborIds = Array.from(
      new Set(
        links
          .filter(
            (link) => !link.Deleted && !link.Undirected && link.SourceId === id,
          )
          .map((link) => link.TargetId),
      ),
    );

    setOutNeighbors(outNeighborIds);
  }, [notes, links, id]);
  return outNeighbors;
}
