import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export type ReferenceMap = Map<string, number>;
export const ReferenceMapContext = createContext<Map<string, number>>(
  new Map(),
);

export const SetReferenceMapContext = createContext<
  Dispatch<SetStateAction<Map<any, any>>>
>(null as unknown as Dispatch<SetStateAction<Map<any, any>>>);

/**
 * This component provides a context for the reference map.
 * @param children
 * @constructor
 */
export function ReferenceMapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [referenceMap, setReferenceMap] = useState<ReferenceMap>(new Map());

  return (
    <ReferenceMapContext.Provider value={referenceMap}>
      <SetReferenceMapContext.Provider value={setReferenceMap}>
        {children}
      </SetReferenceMapContext.Provider>
    </ReferenceMapContext.Provider>
  );
}
