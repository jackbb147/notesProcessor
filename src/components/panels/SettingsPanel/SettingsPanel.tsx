import { Desktop, Tablet, Mobile } from "../../../hooks/useMediaQuery";
import { Desktop_SettingsPanel } from "./Desktop_SettingsPanel";
import { Tablet_SettingsPanel } from "./Tablet_SettingsPanel";
import { Mobile_SettingsPanel } from "./Mobile_SettingsPanel";
export function SettingsPanel() {
  return (
    <>
      <Desktop>
        <Desktop_SettingsPanel />
      </Desktop>

      <Tablet>
        <Tablet_SettingsPanel />
      </Tablet>

      <Mobile>
        <Mobile_SettingsPanel />
      </Mobile>
    </>
  );
}
