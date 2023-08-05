import {AppActionType} from "../../../reducers/AppStateReducer";
import {Button} from "../../ui/Button";
import React from "react";
import {useDispatch} from "../../../reducers/hooks";


export function ToggleLabelPanelButton()
{
    const dispatch = useDispatch();
    return (
        <Button icon={<span className="material-symbols-outlined">
thumbnail_bar
</span>} onClick={()=>{
            dispatch({type: AppActionType.toggleLabelPanel}) //TODO
        }}></Button>
    )
}