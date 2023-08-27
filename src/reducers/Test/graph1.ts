import { GraphState } from "../GraphReducer";

export const graph1: GraphState = {
  links: [
    // {
    //   source: "test",
    //   target: "test2",
    // },
    {
      source: "id1",
      target: "id3",
      undirected: true,
    },
  ],
  nodes: [
    // TODO delete this
    {
      id: "id1",
      title: "test1",
      content: "this is test 1",
      labels: ["Test"],
    },
    {
      id: "id2",
      title: "test2",
      content: "this is test2 ",
      labels: [],
    },
    {
      id: "id3",
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
