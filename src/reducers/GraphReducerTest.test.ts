import { describe, expect, test } from "@jest/globals";
import {
  GraphActionType,
  graphReducer,
  GraphNode,
  GraphLink,
  GraphAction,
  GraphState,
} from "./GraphReducer";

function sum(a: number, b: number) {
  return a + b;
}

describe("sum module, for testing", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe("GraphReducer", () => {
  test("add node", () => {
    let state: GraphState = {
      nodes: [],
      links: [],
      deletedNodes: [],
      labels: [],
      deletedLinks: [],
    };
    let action: GraphAction = {
      type: GraphActionType.addNode,

      node: {
        id: "1",
        content: "hello",
        title: "hello",
        labels: [],
      },
    };
    graphReducer(state, action);
    expect(state.nodes.length).toBe(1);
    expect(state.nodes[0].id).toBe("1");
    expect(state.nodes[0].content).toBe("hello");
    expect(state.nodes[0].labels.length).toBe(0);
  });
  test("remove node", () => {
    let state: GraphState = {
      nodes: [
        {
          id: "1",
          content: "hello",
          title: "hello",
          labels: [],
        },
        {
          id: "2",
          content: "hello2",
          title: "hello2",
          labels: [],
        },
      ],
      links: [
        {
          source: "1",
          target: "2",
        },
      ],
      deletedNodes: [],
      deletedLinks: [],
      labels: [],
    };

    let action: GraphAction = {
      type: GraphActionType.removeNode,
      id: "1",
    };

    graphReducer(state, action);
    expect(state.nodes.length).toBe(1);
    expect(state.nodes[0].id).toBe("2");
    expect(state.nodes[0].content).toBe("hello2");
    expect(state.nodes[0].labels.length).toBe(0);
    expect(state.links.length).toBe(0);
    expect(state.deletedNodes.length).toBe(1);
    expect(state.deletedNodes[0].id).toBe("1");
    expect(state.deletedLinks.length).toBe(1);
    expect(state.deletedLinks[0].source).toBe("1");
    expect(state.deletedLinks[0].target).toBe("2");
  });
  test("update node", () => {});
  test("recover node", () => {
    let state: GraphState = {
      nodes: [
        {
          id: "1",
          content: "hello",
          title: "hello",
          labels: [],
        },
      ],
      links: [],
      deletedNodes: [
        {
          id: "2",
          content: "hello2",
          title: "hello2",
          labels: [],
        },
      ],
      deletedLinks: [
        {
          source: "1",
          target: "2",
        },
      ],
      labels: [],
    };
    let action: GraphAction = {
      type: GraphActionType.recoverNode,
      id: "2",
    };
    graphReducer(state, action);
    expect(state.nodes.length).toBe(2);
    expect(state.nodes[0].id).toBe("1");
    expect(state.nodes[0].content).toBe("hello");
    expect(state.nodes[0].labels.length).toBe(0);
    expect(state.nodes[1].id).toBe("2");
    expect(state.nodes[1].content).toBe("hello2");
    expect(state.nodes[1].labels.length).toBe(0);
    expect(state.links.length).toBe(1);
    expect(state.links[0].source).toBe("1");
    expect(state.links[0].target).toBe("2");
    expect(state.deletedNodes.length).toBe(0);
    expect(state.deletedLinks.length).toBe(0);
  });

  test("add link", () => {
    let state: GraphState = {
      nodes: [
        {
          id: "1",
          content: "hello",
          title: "hello",
          labels: [],
        },
        {
          id: "2",
          content: "hello2",
          title: "hello2",
          labels: [],
        },
      ],
      links: [],
      deletedNodes: [],
      deletedLinks: [],
      labels: [],
    };
    let action: GraphAction = {
      type: GraphActionType.addLink,
      link: {
        source: "1",
        target: "2",
      },
    };
    graphReducer(state, action);
    expect(state.links.length).toBe(1);
    expect(state.links[0].source).toBe("1");
    expect(state.links[0].target).toBe("2");
  });
  test("remove link", () => {
    let state: GraphState = {
      nodes: [
        {
          id: "1",
          content: "hello",
          title: "hello",
          labels: [],
        },
        {
          id: "2",
          content: "hello2",
          title: "hello2",
          labels: [],
        },
      ],
      links: [
        {
          source: "1",
          target: "2",
        },
      ],
      deletedNodes: [],
      deletedLinks: [],
      labels: [],
    };
    let action: GraphAction = {
      type: GraphActionType.removeLink,
      link: {
        source: "1",
        target: "2",
      },
    };
    graphReducer(state, action);
    expect(state.links.length).toBe(0);
    expect(state.deletedLinks.length).toBe(1);
    expect(state.deletedLinks[0].source).toBe("1");
    expect(state.deletedLinks[0].target).toBe("2");
  });

  test("recover link", () => {
    let state: GraphState = {
      nodes: [
        {
          id: "1",
          content: "hello",
          title: "hello",
          labels: [],
        },
        {
          id: "2",
          content: "hello2",
          title: "hello2",
          labels: [],
        },
      ],
      links: [],
      deletedNodes: [],
      deletedLinks: [
        {
          source: "1",
          target: "2",
        },
      ],
      labels: [],
    };
    let action: GraphAction = {
      type: GraphActionType.recoverLink,
      link: {
        source: "1",
        target: "2",
      },
    };
    graphReducer(state, action);
    expect(state.links.length).toBe(1);
    expect(state.links[0].source).toBe("1");
    expect(state.links[0].target).toBe("2");
    expect(state.deletedLinks.length).toBe(0);
  });
});
