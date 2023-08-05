import React from "react";
import {ListItem} from "../panels/ListItem";
import {useAppState, useDispatch} from "../../reducers/hooks";
import {AppActionType} from "../../reducers/AppStateReducer";


export function AccountButton()
{
    const state = useAppState();
    const dispatch = useDispatch();

    function handleDarkModeTogglerClick()
    {
        dispatch({type: AppActionType.toggleDarkMode})
    }



    return (
        <ListItem text={`Account`}
                  // onClick={handleDarkModeTogglerClick}
                  iconOnly={state.LabelPanelClosed}
                  icon={<span className="material-symbols-outlined">
                        account_circle
                    </span>}
        />
    )
}