import React from "react";
import {ListItem} from "../ListItem";
import {useState, useDispatch} from "../../../reducers/hooks";
import {AppActionType} from "../../../reducers/AppStateReducer";


export function LightModeButton()
{
    const state = useState();
    const dispatch = useDispatch();

    function handleDarkModeTogglerClick()
    {
        dispatch({type: AppActionType.toggleDarkMode})
    }



    return (
        <ListItem text={`${state.darkModeOn ? "Light" : "Dark"} Mode`}
                  onClick={handleDarkModeTogglerClick}
                  iconOnly={state.LabelPanelClosed}
                  icon={state.darkModeOn ? <span className="material-symbols-outlined">
                        light_mode
                    </span> : <span className="material-symbols-outlined">
dark_mode
</span>}
        />
    )
}