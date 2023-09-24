import { LightModeButton } from "../../Buttons/LightModeButton";
import { UploadButton } from "../../Buttons/UploadButton";
import { DownloadButton } from "../../Buttons/DownloadButton";
import React from "react";

export function SettingsPanelContent() {
  return (
    <>
      <LightModeButton />
      <UploadButton />
      <DownloadButton />
    </>
  );
}
