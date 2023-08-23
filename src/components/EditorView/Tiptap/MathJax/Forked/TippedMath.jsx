import {Tooltip} from "react-tippy";
import AceEditor from "react-ace";
import MathView from "./MathView";
import {MyCustomACEEditor} from "./InlineMathEditorComponent";

export function TippedMath({value, onChange})
{
    return (
        <Tooltip
            interactive={true}
            html={
            <MyCustomACEEditor value={value} onChange={onChange} />
                // <AceEditor
                //     theme={"github"}
                //     value={value}
                //     onChange={onChange}
                //     style={{
                //         maxHeight: "10vh",
                //     }}
                // ></AceEditor>
            }
        >
             <MathView value={value} />
        </Tooltip>
    )
}