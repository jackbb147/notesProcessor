import {useGraph, useGraphDispatch, useState} from "../../reducers/hooks";
import CreatableSelect from "react-select/creatable";
import Select from "react-select/base";
import {stat} from "fs";
export function LabelSelector()
{
    const graph = useGraph();
    const graphDispatch = useGraphDispatch();

    const appState = useState();

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <div className={"text-black"}>
            <CreatableSelect
                classNames={{
                    // control: (state)=>{
                    //     return "bg"
                    // }
                }}
                menuPlacement={"top"}
                isMulti
                isClearable
                options={options} />
        </div>
    )

}