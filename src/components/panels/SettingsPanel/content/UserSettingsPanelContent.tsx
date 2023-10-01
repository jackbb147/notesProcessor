import { Desktop, Mobile, Tablet } from "../../../../hooks/useMediaQuery";
import { LogOutButton } from "../../../Buttons/LogOutButton";
import { CloseSettingsPanelButton } from "../../../Buttons/CloseSettingsPanelButton";
import React from "react";
import { CloseUserSettingsPanelButton } from "../../../Buttons/CloseUserSettingsPanelButton";
import { ClearDataButton } from "../../../Buttons/ClearDataButton";

export function UserSettingsPanelContent() {
  return (
    <>
      <Desktop>
        <ClearDataButton />
        <LogOutButton />
      </Desktop>
      <Tablet>
        <ClearDataButton />
        <LogOutButton />
      </Tablet>
      <Mobile>
        <CloseUserSettingsPanelButton />
        <ClearDataButton />
        <LogOutButton />
      </Mobile>
    </>
  );
}
