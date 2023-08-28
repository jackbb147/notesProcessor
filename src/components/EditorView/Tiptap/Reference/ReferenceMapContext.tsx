import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useImmerReducer } from "use-immer";
import { ReferenceMapAction, ReferenceMapReducer } from "./ReferenceMapReducer";

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
  defaultReferenceMap,
  children,
}: {
  defaultReferenceMap: ReferenceMap;
  children: React.ReactNode;
}) {
  // const [referenceMap, setReferenceMap] = useState<ReferenceMap>(new Map());
  const [referenceMap, dispatch] = useImmerReducer<
    ReferenceMap,
    ReferenceMapAction
  >(ReferenceMapReducer, defaultReferenceMap);

  return (
    <ReferenceMapContext.Provider value={referenceMap}>
      <ReferenceMapDispatchContext.Provider value={dispatch}>
        {children}
      </ReferenceMapDispatchContext.Provider>
    </ReferenceMapContext.Provider>
  );
}
