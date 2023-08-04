import {useDispatch, useState} from "../../../reducers/hooks";
import {ListItem} from "../ListItem";
import React from "react";

export function SettingsButton()
{
    const state =useState()
    const dispatch = useDispatch()

    return (
        <ListItem text={`Settings`}
                  // onClick={handleDarkModeTogglerClick}
                  iconOnly={state.LabelPanelClosed}
                  icon={<span className="material-symbols-outlined">
                        settings
                    </span>}
        />
    )

}