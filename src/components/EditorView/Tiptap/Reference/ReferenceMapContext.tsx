import React, { createContext, Dispatch, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import {
  ReferenceMapAction,
  ReferenceMapActionType,
  ReferenceMapReducer,
} from "./ReferenceMapReducer";
import { enableMapSet } from "immer";
import { GraphNode } from "../../../../reducers/GraphReducer";
import { countReferences } from "./countReferences";
import { generateJSON } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Text from "@tiptap/extension-text";
import MathExtension from "../MathEditor/Extension";
import { Mention } from "@tiptap/extension-mention";

export type ReferenceMap = Map<string, number>;
export const ReferenceMapContext = createContext<Map<string, number>>(
  new Map(),
);

export const ReferenceMapDispatchContext = createContext<
  Dispatch<ReferenceMapAction>
>(null as unknown as Dispatch<ReferenceMapAction>);

/**
 * This component provides a context for the reference map.
 * @param children
 * @constructor
 */
export function ReferenceMapProvider({
  note,
  children,
}: {
  note: GraphNode;
  children: React.ReactNode;
}) {
  // const [referenceMap, setReferenceMap] = useState<ReferenceMap>(new Map());

  enableMapSet(); // https://immerjs.github.io/immer/map-set/
  const [referenceMap, dispatch] = useImmerReducer<
    ReferenceMap,
    ReferenceMapAction
  >(ReferenceMapReducer, new Map());

  useEffect(() => {
    dispatch({
      type: ReferenceMapActionType.setReferenceMap,
      referenceMap: countReferences(
        generateJSON(note.content, [
          Document,
          Paragraph,
          Bold,
          Text,
          MathExtension,
          Mention,
        ]),
      ),
    });
  }, [note.id]);

  return (
    <ReferenceMapContext.Provider value={referenceMap}>
      <ReferenceMapDispatchContext.Provider value={dispatch}>
        {children}
      </ReferenceMapDispatchContext.Provider>
    </ReferenceMapContext.Provider>
  );
}
