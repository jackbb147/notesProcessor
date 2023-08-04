import {useDispatch, useState} from "../../../reducers/hooks";
import {ListItem} from "../ListItem";
import React from "react";
import {AppActionType} from "../../../reducers/AppStateReducer";

export function SettingsButton()
{
    const state =useState()
    const dispatch = useDispatch()


    function handleClick()
    {
        dispatch({
            type: AppActionType.setShowSettingsPanel,
            show: !state.showSettingsPanel
        })
    }
    return (
        <ListItem text={`Settings`}
                  onClick={handleClick}
                  iconOnly={state.LabelPanelClosed}
                  icon={<span className="material-symbols-outlined">
                        settings
                    </span>}
        />
    )

}