import { describe, expect, test } from "@jest/globals";

import {
  ReferenceMap,
  ReferenceMapActionType,
  ReferenceMapReducer,
} from "./ReferenceMapReducer";

function sum(a: number, b: number) {
  return a + b;
}

describe("sum module, for testing", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe("Reference map reducer", () => {
  test("add reference", () => {
    let referenceMap: ReferenceMap = new Map();
    ReferenceMapReducer(referenceMap, {
      type: ReferenceMapActionType.addReference,
      reference: { sourceID: "1", targetID: "2" },
    });
    expect(referenceMap.get("2")).toBe(1);
  });

  test("remove reference", () => {
    let referenceMap: ReferenceMap = new Map();
    referenceMap.set("2", 1);
    ReferenceMapReducer(referenceMap, {
      type: ReferenceMapActionType.removeReference,
      reference: { sourceID: "1", targetID: "2" },
    });
  });
});
