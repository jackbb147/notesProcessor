import { describe, expect, test } from "@jest/globals";

import {
  ReferenceMap,
  ReferenceStateActionType,
  ReferenceStateReducer,
} from "./ReferenceStateReducer";

function sum(a: number, b: number) {
  return a + b;
}

describe("sum module, for testing", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe("Reference state reducer", () => {
  test("add reference", () => {
    let referenceState = {
      sourceID: "1",
      referenceMap: new Map(),
    };
    ReferenceStateReducer(referenceState, {
      type: ReferenceStateActionType.addReference,
      reference: { sourceID: "1", targetID: "2" },
    });
    expect(referenceState.referenceMap.get("2")).toBe(1);
  });

  test("remove reference", () => {
    let referenceState = {
      sourceID: "1",
      referenceMap: new Map([["2", 3]]),
    };
    ReferenceStateReducer(referenceState, {
      type: ReferenceStateActionType.removeReference,
      reference: { sourceID: "1", targetID: "2" },
    });
    expect(referenceState.referenceMap.get("2")).toBe(2);
    ReferenceStateReducer(referenceState, {
      type: ReferenceStateActionType.removeReference,
      reference: { sourceID: "1", targetID: "2" },
    });
    expect(referenceState.referenceMap.get("2")).toBe(1);
    ReferenceStateReducer(referenceState, {
      type: ReferenceStateActionType.removeReference,
      reference: { sourceID: "1", targetID: "2" },
    });
    expect(referenceState.referenceMap.has("2")).toBe(false);
  });

  test("set reference state", () => {
    let referenceState = {
      sourceID: "1",
      referenceMap: new Map([["2", 1]]),
    };
    ReferenceStateReducer(referenceState, {
      type: ReferenceStateActionType.setReferenceState,
      referenceState: {
        sourceID: "1",
        referenceMap: new Map([["3", 2]]),
      },
    });
    expect(referenceState.referenceMap.get("3")).toBe(2);
    expect(referenceState.referenceMap.has("2")).toBe(false);
  });
});
