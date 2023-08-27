import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

export const ReferenceMapContext = createContext<Map<string, number> | null>(
  null,
);

export const SetReferenceMapContext = createContext<null | Dispatch<
  SetStateAction<Map<any, any>>
>>(null);

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
