import { Desktop, Mobile, Tablet } from "../../../../hooks/useMediaQuery";
import { LogOutButton } from "../../../Buttons/LogOutButton";
import { CloseSettingsPanelButton } from "../../../Buttons/CloseSettingsPanelButton";
import React from "react";
import { CloseUserSettingsPanelButton } from "../../../Buttons/CloseUserSettingsPanelButton";

export function UserSettingsPanelContent() {
  return (
    <>
      <Desktop>
        <LogOutButton />
      </Desktop>
      <Tablet>
        <LogOutButton />
      </Tablet>
      <Mobile>
        <CloseUserSettingsPanelButton />
        <LogOutButton />
      </Mobile>
    </>
  );
}
