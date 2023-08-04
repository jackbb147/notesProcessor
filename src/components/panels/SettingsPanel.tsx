import {useState} from "../../reducers/hooks";
import {LightModeButton} from "./Buttons/LightModeButton";
import {UploadButton} from "./Buttons/UploadButton";
import {DownloadButton} from "./Buttons/DownloadButton";

export function SettingsPanel()
{
    const state = useState();
    if(state.showSettingsPanel)
    {
        return (
            <div className={`
                border-2
                ${state.darkModeOn ? 'bg-dark_secondary' : 'bg-selectedItem-2'}
            `}>
                <LightModeButton/>
                <UploadButton/>
                <DownloadButton/>
            </div>
        )
    }else
    {
        return <></>
    }
}