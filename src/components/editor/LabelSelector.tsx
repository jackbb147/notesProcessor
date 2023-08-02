import {useGraph, useGraphDispatch, useState} from "../../reducers/hooks";
import CreatableSelect from "react-select/creatable";
import {ActionMeta, CSSObjectWithLabel, Options} from "react-select";
import {GraphActionType} from "../../reducers/GraphReducer";
import {ValueType} from "tailwindcss/types/config";

export function LabelSelector({handleChange, labels=[]}:{
    handleChange: (value:Options<any>, action: ActionMeta<any>)=>any,
    labels: string[]
})
{
    const graph = useGraph();
    const graphDispatch = useGraphDispatch();

    const appState = useState();



    return (
        <div style={{color: "black"}}>
            <CreatableSelect
                styles={{
                    control: (base, state):CSSObjectWithLabel=>({
                        ...base,
                        backgroundColor: "transparent"
                    }),
                    menu: (base, state):CSSObjectWithLabel=>({
                        ...base,
                        backgroundColor: appState.darkModeOn ? state.theme.colors.neutral80 : "transparent"

                    }),

                    menuList: (base, state):CSSObjectWithLabel=>({
                        ...base,
                        // color: appState.darkModeOn ?

                    }),

                    input: (base, state)=>({
                       ...base,
                       color: appState.darkModeOn ? "white" : "black",
                    }),



                    option: (base, state)=>({
                        ...base,
                        backgroundColor: appState.darkModeOn ? (
                            state.isFocused ? state.theme.colors.neutral0 : "transparent"
                        ) : (
                            state.isFocused ? state.theme.colors.primary50 : "transparent"
                        ),
                        color: appState.darkModeOn ? (
                            state.isFocused ? "black" : "white"
                        ) : (
                            state.isFocused ? "black" : "black"
                        )
                    }),
                }}


                value={labels.map((s:string)=>{
                    return {label: s, value: s}
                })}
                menuPlacement={"top"}
                isMulti
                isClearable
                // onCreateOption={handleCreateOption}
                onChange={handleChange}

                options={graph.labels.map(s=>{
                    return {
                        value: s,
                        label: s
                    }
                })} />
        </div>
    )

}