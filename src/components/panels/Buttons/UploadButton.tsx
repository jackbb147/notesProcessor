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

    function handleInputChange(this: any)
    {
        let that:React.ReactNode = this;
        if(!inputRef ||  !inputRef.current || !inputRef.current.files)
        {
            console.error("input ref not ready, or no file property. ")
        }

        const reader = new FileReader();
        reader.onload = (e)=>{

            if (typeof reader.result !== "string") {
                alert(" There's something wrong with the file you uploaded :( ")
                return;
            }

            const obj = JSON.parse(reader.result);
            debugger;

        }

        reader.readAsText(inputRef.current.files[0]);
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
                       onChange={handleInputChange}
                       type={"file"}/>
            </>

    )
}