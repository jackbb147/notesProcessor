import { useGetLinksQuery, useGetNotesQuery } from "../api/apiSlice";
import { useEffect, useState } from "react";

/**
 * Returns the ID's of the in-neighbors of a node (i.e the nodes that refernce this node)
 * @param id
 */
export function useInNeighborIds(id: string): string[] {
  const { data: notes } = useGetNotesQuery();
  const { data: links } = useGetLinksQuery();
  const [inNeighbors, setInNeighbors] = useState<string[]>([]);

  useEffect(() => {
    if (!notes) {
      console.warn("[useInNeighbors] notes not available");
      return;
    }
    if (!links) {
      console.warn("[useInNeighbors] links not available");
      return;
    }
    const inNeighborIds = Array.from(
      new Set(
        links
          .filter(
            (link) =>
              link.TargetId === id &&
              !link.Deleted &&
              notes.some((note) => note.Id === id),
          )
          .map((link) => link.SourceId),
      ),
    );

    setInNeighbors(inNeighborIds);
  }, [notes, links, id]);
  return inNeighbors;
}
