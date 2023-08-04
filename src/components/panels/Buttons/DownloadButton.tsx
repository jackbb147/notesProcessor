import {ListItem} from "../ListItem";
import React from "react";
import {useDispatch, useState} from "../../../reducers/hooks";

export function DownloadButton()
{
    const state =useState()
    const dispatch = useDispatch()


    return (
        <ListItem text={"Download Notes"}
                  iconOnly={state.LabelPanelClosed}
                  // onClick={handleCreateEditLabelClick}
                  icon={<span className="material-symbols-outlined">
download
</span>}

        ></ListItem>
    )
}