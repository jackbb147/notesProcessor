import {ListItem} from "../ListItem";
import React from "react";
import {useDispatch, useAppState, useGraph} from "../../../reducers/hooks";
import {useDownload} from "../../../useDownload";


export function DownloadButton()
{
    const state =useAppState()
    const dispatch = useDispatch()
    const graph = useGraph()
    const download = useDownload()


    function handleClick (){
        download("my notes" ,JSON.stringify(graph,null, "\t"));
    }

    return (

            <ListItem   text={"Download Notes"}
                        iconOnly={state.LabelPanelClosed}
                        onClick={handleClick}
                        icon={<span className="material-symbols-outlined">
                download
                </span>}
            ></ListItem>
    )
}