import { Desktop, Tablet, Mobile } from "../../../hooks/useMediaQuery";
import { Desktop_SettingsPanel } from "./Desktop_SettingsPanel";
import { Tablet_SettingsPanel } from "./Tablet_SettingsPanel";
import { Mobile_SettingsPanel } from "./Mobile_SettingsPanel";
export function SettingsPanel({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Desktop>
        <Desktop_SettingsPanel>{children}</Desktop_SettingsPanel>
      </Desktop>

      <Tablet>
        <Tablet_SettingsPanel>{children}</Tablet_SettingsPanel>
      </Tablet>

      <Mobile>
        <Mobile_SettingsPanel>{children}</Mobile_SettingsPanel>
      </Mobile>
    </>
  );
}
