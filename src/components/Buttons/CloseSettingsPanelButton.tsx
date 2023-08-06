import {Button} from "../ui/Button";
import React from "react";
import {useDispatch} from "../../hooks/AppStateAndGraphhooks";
import {AppActionType} from "../../reducers/AppStateReducer";

export function CloseSettingsPanelButton()
{
    const dispatch = useDispatch()

    function handleClick()
    {
        dispatch({
            type: AppActionType.setShowSettingsPanel,
            show: false
        })
    }
    return (
        <Button
            onClick={handleClick} icon={<span className="material-symbols-outlined">
            close
        </span>}/>
    )
}