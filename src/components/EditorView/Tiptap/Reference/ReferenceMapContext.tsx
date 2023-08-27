import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

export const ReferenceMapContext = createContext<Map<string, number>>(
  new Map(),
);

export const SetReferenceMapContext = createContext<
  Dispatch<SetStateAction<Map<any, any>>>
>(null as unknown as Dispatch<SetStateAction<Map<any, any>>>);

export function ReferenceMapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [referenceMap, setReferenceMap] = useState(new Map());

  return (
    <ReferenceMapContext.Provider value={referenceMap}>
      <SetReferenceMapContext.Provider value={setReferenceMap}>
        {children}
      </SetReferenceMapContext.Provider>
    </ReferenceMapContext.Provider>
  );
}
