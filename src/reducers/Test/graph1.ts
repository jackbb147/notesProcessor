import { GraphState } from "../GraphReducer";

export const graph1: GraphState = {
  links: [
    // {
    //   source: "test",
    //   target: "test2",
    // },
    {
      source: "test1",
      target: "test3",
      undirected: true,
    },
  ],
  nodes: [
    // TODO delete this
    {
      id: "test1",
      title: "test",
      content: "this is test 1",
      labels: ["Test"],
    },
    {
      id: "test2",
      title: "test2",
      content: "this is test2 ",
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
