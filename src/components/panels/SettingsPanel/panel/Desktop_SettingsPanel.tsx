import { useAppState } from "../../../../hooks/AppStateAndGraphAndUserhooks";
import { LightModeButton } from "../../../Buttons/LightModeButton";
import { UploadButton } from "../../../Buttons/UploadButton";
import { DownloadButton } from "../../../Buttons/DownloadButton";
import React from "react";

export function Desktop_SettingsPanel({
  show,
  children,
}: {
  show: boolean;
  children?: React.ReactNode;
}) {
  const state = useAppState();
  if (show) {
    return (
      <div
        className={`
                ${state.darkModeOn ? "bg-dark_secondary" : "bg-grey"}
                p-1
                pb-0
                pl-1.5
                pr-1.5
                border 
                border-neutral-100
                border-opacity-25
            `}
      >
        {children}
      </div>
    );
  } else {
    return <></>;
  }
}
