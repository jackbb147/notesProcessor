import {useDispatch, useState} from "../../../reducers/hooks";
import {ListItem} from "../ListItem";
import React from "react";

export function UploadButton()
{
    const state =useState()
    const dispatch = useDispatch()


    return (
        <ListItem text={"Upload Notes"}
                  iconOnly={state.LabelPanelClosed}
                  // onClick={handleCreateEditLabelClick}
                  icon={<span className="material-symbols-outlined">
upload
</span>}
        ></ListItem>
    )
}