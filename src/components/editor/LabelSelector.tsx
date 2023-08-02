import {useGraph, useGraphDispatch, useState} from "../../reducers/hooks";
import CreatableSelect from "react-select/creatable";
import Select from "react-select/base";
import {stat} from "fs";
import {CSSObjectWithLabel} from "react-select";
export function LabelSelector()
{
    const graph = useGraph();
    const graphDispatch = useGraphDispatch();

    const appState = useState();


    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    // ]

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
                menuPlacement={"top"}
                isMulti
                isClearable
                options={graph.labels.map(s=>{
                    return {
                        value: s,
                        label: s
                    }
                })} />
        </div>
    )

}