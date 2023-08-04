import {ListItem} from "../ListItem";
import React from "react";
import {useDispatch, useState} from "../../../reducers/hooks";
import {useDownload} from "../../../useDownload";

export function DownloadButton()
{
    const state =useState()
    const dispatch = useDispatch()
    const download = useDownload()

    function handleClick (){
        download();
    }

    return (

            <ListItem text={"Download Notes"}
                      iconOnly={state.LabelPanelClosed}
                onClick={handleClick}
                      icon={<span className="material-symbols-outlined">
download
</span>}

            ></ListItem>

    )
}