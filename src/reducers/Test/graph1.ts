import { GraphState } from "../GraphReducer";

export const graph1: GraphState = {
  links: [
    // {
    //   source: "test",
    //   target: "test2",
    // },
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
      title: "test",
      content: "something",
      labels: ["Test"],
    },
    {
      id: "test2",
      title: "test2",
      content: "Not a test! ",
      labels: [],
    },
    {
      id: "test3",
      title: "test 3",
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
