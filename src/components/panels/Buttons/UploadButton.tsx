import {useAppState, useDispatch, useGraphDispatch} from "../../../reducers/hooks";
import {ListItem} from "../ListItem";
import React, {useRef} from "react";
import {useUpload} from "../../../useUpload";
import {GraphActionType, GraphState} from "../../../reducers/GraphReducer";

export function UploadButton()
{
    const state =useAppState()
    const dispatch = useDispatch()
    const graphDispatch = useGraphDispatch();
    const ref = useRef<any>(null)
    const upload = useUpload()

    async function handleClick()
    {
        let obj = await upload() as GraphState;
        console.log(`got this object: ${obj}`)
        debugger;
        graphDispatch({
            type: GraphActionType.merge,
            other: obj
        })
    }

    return (
            <>
                <ListItem
                    ref={ref}
                    text={"Upload Notes"}
                    iconOnly={state.LabelPanelClosed}
                    onClick={handleClick}
                    icon={<span className="material-symbols-outlined">
                        upload
                    </span>}
                ></ListItem>
            </>

    )
}