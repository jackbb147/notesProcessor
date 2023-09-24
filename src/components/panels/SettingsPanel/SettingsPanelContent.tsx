import { LightModeButton } from "../../Buttons/LightModeButton";
import { UploadButton } from "../../Buttons/UploadButton";
import { DownloadButton } from "../../Buttons/DownloadButton";
import React from "react";
import { Desktop, Mobile, Tablet } from "../../../hooks/useMediaQuery";

import { CloseSettingsPanelButton } from "../../Buttons/CloseSettingsPanelButton";

export function SettingsPanelContent() {
  return (
    <>
      <Desktop>
        <LightModeButton />
        <UploadButton />
        <DownloadButton />
      </Desktop>
      <Tablet>
        <LightModeButton />
        <UploadButton />
        <DownloadButton />
      </Tablet>
      <Mobile>
        <div className={"flex flex-col  h-full"}>
          <CloseSettingsPanelButton />
          <LightModeButton />
          <div className={"mt-auto flex flex-col justify-center w-full"}>
            <UploadButton />
            <DownloadButton />
          </div>
        </div>
      </Mobile>
    </>
  );
}
