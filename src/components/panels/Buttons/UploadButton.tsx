import {useDispatch, useAppState} from "../../../reducers/hooks";
import {ListItem} from "../ListItem";
import React, {useEffect, useRef} from "react";
import {useUpload} from "../../../useUpload";

export function UploadButton()
{
    const state =useAppState()
    const dispatch = useDispatch()
    const ref = useRef<any>(null)
    const inputRef = useRef<any>(null)



    function handleClick()
    {
        if(!inputRef || !inputRef.current)
        {
            console.error("input not ready.")
            return;
        }
        inputRef.current.click();

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
                <input style={{
                    display: "none"
                }}
                       ref={inputRef}
                       type={"file"}/>
            </>

    )
}