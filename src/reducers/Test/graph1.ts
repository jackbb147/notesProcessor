import { GraphState } from "../GraphReducer";

export const graph1: GraphState = {
  version: "1.0",
  links: [
    // {
    //   source: "test",
    //   target: "test2",
    // },
    {
      source: "Id1",
      target: "Id3",
      undirected: true,
    },
  ],
  nodes: [
    {
      Id: "Id1",
      Title: "test1",
      Content: "this is test 1",
    },
    {
      Id: "Id2",
      Title: "test2",
      Content: "this is test2 ",
    },
    {
      Id: "Id3",
      Title: "test 3",
      Content: "Hello from test3! ",
    },
  ],
  deletedNodes: [],
  labels: [
    // "Test", "not a test"
  ],
  deletedLinks: [],
};
