import { Desktop, Tablet, Mobile } from "../../../hooks/useMediaQuery";
import { Desktop_NotesPanel } from "./Desktop_NotesPanel";
import { Tablet_NotesPanel } from "./Tablet_NotesPanel";
import { Mobile_NotesPanel } from "./Mobile_NotesPanel";
import React from "react";
export function NotesPanel({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Desktop>
        <Desktop_NotesPanel>{children}</Desktop_NotesPanel>
      </Desktop>

      <Tablet>
        <Tablet_NotesPanel>{children}</Tablet_NotesPanel>
      </Tablet>

      <Mobile>
        <Mobile_NotesPanel>{children}</Mobile_NotesPanel>
      </Mobile>
    </>
  );
}
