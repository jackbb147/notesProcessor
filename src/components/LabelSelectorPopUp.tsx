import {LabelSelector} from "./editor/LabelSelector";
import {Overlay} from "./Overlay";
import {useDispatch, useGraph, useGraphDispatch, useState} from "../reducers/hooks";
import {ActionMeta, Options} from "react-select";
import {AppActionType} from "../reducers/AppStateReducer";
import {GraphActionType} from "../reducers/GraphReducer";

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
                graphDispatch({
                    type: GraphActionType.addLabel,
                    label: action.option.label
                })
                break;
            }

            case "remove-value":
            {
                graphDispatch({
                    type: GraphActionType.removeLabel,
                    label: action.removedValue.label
                })
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
                m-auto
            `}>
                <LabelSelector handleChange={handleChange} labels={graph.labels}/>
            </div>
        </Overlay>
    )
}