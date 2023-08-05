import {useAppState} from "../../../reducers/hooks";
import {LightModeButton} from "../../Buttons/LightModeButton";
import {UploadButton} from "../../Buttons/UploadButton";
import {DownloadButton} from "../../Buttons/DownloadButton";
import {CloseSettingsPanelButton} from "../../Buttons/CloseSettingsPanelButton";
import {Close} from "@radix-ui/react-popover";

export function Mobile_SettingsPanel()
{
    const state = useAppState();
    if(state.showSettingsPanel)
    {
        return (
            <div className={`
                ${state.darkModeOn ? 'bg-dark_secondary' : 'bg-grey'}
                absolute
                left-0 
                z-40 
                dark:bg-dark_secondary
                top-0
                w-full
                h-full
                border-2
                p-1
                pb-0
                pl-1.5
                pr-1.5
                border 
                border-neutral-100
                border-opacity-25
                z-30
            `}
            >
                <CloseSettingsPanelButton/>
                <LightModeButton/>
                <UploadButton/>
                <DownloadButton/>
            </div>
        )
    }else
    {
        return <>  </>
    }
}