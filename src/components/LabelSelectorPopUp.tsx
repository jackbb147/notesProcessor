import {LabelSelector} from "./editor/LabelSelector";
import {Overlay} from "./Overlay";
import {useDispatch, useGraph, useGraphDispatch, useState} from "../reducers/hooks";
import {ActionMeta, Options} from "react-select";
import {AppActionType} from "../reducers/AppStateReducer";

export function LabelSelectorPopUp()
{

    const state = useState();
    const dispatch = useDispatch();

    const graph = useGraph();
    const graphDispatch = useGraphDispatch();
    function handleChange(value: Options<any>, action:ActionMeta<any>)
    {
        switch (action.action)
        {
            // TODO
            case "create-option":
            {
                break;
            }

            case "remove-value":
            {

                break;
            }
        }
    }

    function handleOverlayClick(e: React.MouseEvent)
    {
        dispatch({
            type: AppActionType.setShowLabelSelectorPopup,
            show: false
        })
    }





    return !state.showLabelSelectorPopup ? <></> : (
        <Overlay handleClick={handleOverlayClick}>
            <div className={`
                w-1/2
                m-auto
            `}>
                <LabelSelector handleChange={handleChange} labels={graph.labels}/>
            </div>
        </Overlay>
    )
}