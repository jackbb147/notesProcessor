import React, { createContext, Dispatch, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import {
  ReferenceStateAction,
  ReferenceStateActionType,
  ReferenceStateReducer,
  ReferenceMap,
  ReferenceState,
} from "./ReferenceStateReducer";
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

export const ReferenceStateContext = createContext<ReferenceState>({
  sourceID: "",
  referenceMap: new Map(),
});

export const ReferenceStateDispatchContext = createContext<
  Dispatch<ReferenceStateAction>
>(null as unknown as Dispatch<ReferenceStateAction>);

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
  const [referenceState, dispatch] = useImmerReducer<
    ReferenceState,
    ReferenceStateAction
  >(ReferenceStateReducer, {
    sourceID: note.Id,
    referenceMap: new Map(),
  });

  useEffect(() => {
    dispatch({
      type: ReferenceStateActionType.setReferenceState,
      referenceState: {
        sourceID: note.Id,
        referenceMap: countReferences(
          generateJSON(note.Content, [
            Document,
            Paragraph,
            Bold,
            Text,
            MathExtension,
            Mention,
          ]),
        ),
      },
    });
  }, [note.Id]);

  return (
    <ReferenceStateContext.Provider value={referenceState}>
      <ReferenceStateDispatchContext.Provider value={dispatch}>
        {children}
      </ReferenceStateDispatchContext.Provider>
    </ReferenceStateContext.Provider>
  );
}
