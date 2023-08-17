import Graph from "graphology";
import { useGraph } from "./AppStateAndGraphhooks";
import { GraphState } from "../reducers/GraphReducer";
import { useEffect, useRef } from "react";
export function useGraphology() {
  const graph: GraphState = useGraph();
  const graphologyRef = useRef<Graph>(new Graph());
  // TODO this might be slow because it's O(n) ...
  useEffect(() => {
    let graphology = graphologyRef.current;
    graphology.clear();
    graph.nodes.forEach((node) => {
      graphology.addNode(node.id);
    });
    graph.links.forEach((link) => {
      graphology.addEdge(link.source, link.target);
    });
  }, [graph.nodes.length, graph.links.length]);

  return graphologyRef.current;
}
