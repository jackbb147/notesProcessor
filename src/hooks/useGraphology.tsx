import Graph from "graphology";
import { useGraph } from "./AppStateAndGraphAndUserhooks";
import { GraphState } from "../reducers/GraphReducer";
import { useEffect, useRef, useState } from "react";
import { useGetNotesQuery, useGetLinksQuery } from "../api/apiSlice";

/**
 * This hook returns a graphology graph that is kept in sync with the graph state.
 */
export function useGraphology(): [Graph, number] {
  const { data: notes, isLoading: loadingNotes } = useGetNotesQuery();

  const { data: links, isLoading: loadingLinks } = useGetLinksQuery();

  // const graph: GraphState = useGraph();
  const graphologyRef = useRef<Graph>(new Graph());
  const [updated, setUpdated] = useState(0);

  useEffect(() => {
    let graphology = graphologyRef.current;
    graphology.on("nodeAdded", () => {
      setUpdated((updated) => updated + 1);
    });
    graphology.on("nodeDropped", () => {
      setUpdated((updated) => updated + 1);
    });
    graphology.on("edgeAdded", () => {
      setUpdated((updated) => updated + 1);
    });
    graphology.on("edgeDropped", () => {
      setUpdated((updated) => updated + 1);
    });
  }, []);
  // TODO this might be slow because it's O(n) ...
  useEffect(() => {
    // debugger;
    if (!notes) {
      console.warn("[useGraphology] no notes available");
      return;
    }
    if (!links) {
      console.warn("[useGraphology] no links available");
      return;
    }

    let graphology = graphologyRef.current;
    graphology.clear();
    // debugger;
    notes.forEach((node) => {
      graphology.addNode(node.Id);
    });
    links.forEach((link) => {
      if (link.Undirected) {
        graphology.addUndirectedEdge(link.SourceId, link.TargetId);
      } else {
        graphology.addDirectedEdge(link.SourceId, link.TargetId);
      }
    });

    setUpdated((updated) => updated + 1);
  }, [notes?.length, links?.length, loadingLinks, loadingNotes]); //TODO

  return [graphologyRef.current, updated];
}
