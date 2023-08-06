import {AppActionType} from "../../reducers/AppStateReducer";
import {Button} from "../ui/Button";
import React from "react";
import {useDispatch} from "../../hooks/AppStateAndGraphhooks";


export function ToggleLabelPanelButton()
{
    const dispatch = useDispatch();
    console.log("toggle label panel clicked")
    return (
        <Button icon={<span className="material-symbols-outlined">
thumbnail_bar
</span>} onClick={()=>{
            dispatch({type: AppActionType.toggleLabelPanel}) //TODO
        }}></Button>
    )
}