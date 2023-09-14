import Graph from "graphology";
import { useGraph } from "./AppStateAndGraphAndUserhooks";
import { GraphState } from "../reducers/GraphReducer";
import { useEffect, useRef, useState } from "react";
import { useGetNotesQuery, useGetLinksQuery } from "../api/apiSlice";

/**
 * This hook returns a graphology graph that is kept in sync with the graph state.
 */
export function useGraphology(): [Graph, number] {
  const { data: notes } = useGetNotesQuery();

  const { data: links } = useGetLinksQuery();

  const graph: GraphState = useGraph();
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
    if (!notes || !links) return;
    let graphology = graphologyRef.current;
    graphology.clear();
    debugger;
    graph.nodes.forEach((node) => {
      graphology.addNode(node.Id);
    });
    graph.links.forEach((link) => {
      if (link.undirected) {
        graphology.addUndirectedEdge(link.source, link.target);
      } else {
        graphology.addDirectedEdge(link.source, link.target);
      }
    });

    setUpdated((updated) => updated + 1);
  }, [notes?.length, links?.length]); //TODO

  return [graphologyRef.current, updated];
}
