import {useDispatch, useAppState} from "../../../reducers/hooks";
import {ListItem} from "../ListItem";
import React, {useEffect, useRef} from "react";
import {useUpload} from "../../../useUpload";

export function UploadButton()
{
    const state =useAppState()
    const dispatch = useDispatch()
    const ref = useRef<any>(null)
    const upload = useUpload()

    return (
            <>
                <ListItem
                    ref={ref}
                    text={"Upload Notes"}
                    iconOnly={state.LabelPanelClosed}
                    onClick={upload}
                    icon={<span className="material-symbols-outlined">
                        upload
                    </span>}
                ></ListItem>
            </>

    )
}