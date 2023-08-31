import { describe, expect, test } from "@jest/globals";
import * as V0 from "./GraphStates/V0";
import * as V1_0 from "./GraphStates/V1_0";
import { V0_SAMPLE } from "./GraphStates/V0_SAMPLE";
import { GraphStateMigrations } from "./GraphStateMigration";
function sum(a: number, b: number) {
  return a + b;
}
describe("sum module, for testing", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe("V0 to V1_0", () => {
  const v0: V0.V0 = {
    nodes: [
      {
        id: "3b26538e-d564-43c9-bce8-5df65d474174",
        title: "hello !",
        content: String.raw`<p>hello !</p>`,
        labels: ["something"],
        dateCreated: "2023-08-17T22:34:43.425Z",
        dateLastModified: "2023-08-17T22:35:32.235Z",
      },
      {
        id: "98d5697c-efac-4fd9-932f-03c75c583f1b",
        title: "asdf",
        content: String.raw`<p>asdf</p>`,
        labels: [],
        dateCreated: "2023-08-17T22:35:32.291Z",
        dateLastModified: "2023-08-24T20:36:48.867Z",
      },
    ],
    deletedNodes: [],
    labels: ["something"],
  };

  const expectedV1_0: V1_0.Version1_0 = {
    version: "1.0",
    nodes: [
      {
        id: "3b26538e-d564-43c9-bce8-5df65d474174",
        title: "hello !",
        content: String.raw`<p>hello !</p>`,
        labels: ["something"],
        dateCreated: "2023-08-17T22:34:43.425Z",
        dateLastModified: "2023-08-17T22:35:32.235Z",
      },
      {
        id: "98d5697c-efac-4fd9-932f-03c75c583f1b",
        title: "asdf",
        content: String.raw`<p>asdf</p>`,
        labels: [],
        dateCreated: "2023-08-17T22:35:32.291Z",
        dateLastModified: "2023-08-24T20:36:48.867Z",
      },
    ],
    links: [],
    deletedNodes: [],
    deletedLinks: [],
    labels: ["something"],
  };

  test("I. converts V0 to V1_0", () => {
    expect(GraphStateMigrations[0].up(v0)).toEqual(expectedV1_0);
  });

  test("II. converts V0 to V1_0", () => {
    const received: any = GraphStateMigrations[0].up(V0_SAMPLE);
    expect(received).toHaveProperty("version", "1.0");
    expect(received).toHaveProperty("nodes");
    expect(received.nodes.length).toBe(V0_SAMPLE.nodes.length);
    expect(received).toHaveProperty("links");
    expect(received.links.length).toBe(0);
    expect(received).toHaveProperty("deletedNodes");
    expect(received.deletedNodes.length).toBe(V0_SAMPLE.deletedNodes.length);
    expect(received).toHaveProperty("deletedLinks");
    expect(received.labels.length).toBe(V0_SAMPLE.labels.length);

    expect(received).toHaveProperty("labels");
    expect(received.labels.length).toBe(V0_SAMPLE.labels.length);
  });
});
