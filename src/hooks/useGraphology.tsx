import Graph from "graphology";
import { useGraph } from "./AppStateAndGraphhooks";
import { GraphState } from "../reducers/GraphReducer";
import { useEffect, useRef, useState } from "react";

export function useGraphology(): [Graph, number] {
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
    let graphology = graphologyRef.current;
    graphology.clear();
    graph.nodes.forEach((node) => {
      graphology.addNode(node.id);
    });
    graph.links.forEach((link) => {
      graphology.addEdge(link.source, link.target);
    });

    setUpdated((updated) => updated + 1);
  }, [graph.nodes.length, graph.links.length]);

  return [graphologyRef.current, updated];
}
