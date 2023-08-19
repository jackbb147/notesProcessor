import { GraphState } from "../GraphReducer";

export const graph1: GraphState = {
  links: [
    {
      source: "test",
      target: "test2",
    },
    {
      source: "test",
      target: "test3",
      undirected: true,
    },
  ],
  nodes: [
    // TODO delete this
    {
      id: "test",
      title: "Just a test",
      content: "something",
      labels: ["Test"],
    },
    {
      id: "test2",
      title: "Not a test. ",
      content: "Not a test! ",
      labels: [],
    },
    {
      id: "test3",
      title: "Test 3",
      content: "Hello from test3! ",
      labels: [],
    },
  ],
  deletedNodes: [],
  labels: [
    // "Test", "not a test"
  ],
  deletedLinks: [],
};
