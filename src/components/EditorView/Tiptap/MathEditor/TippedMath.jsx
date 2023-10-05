import { Tooltip } from "react-tippy";
import AceEditor from "react-ace";
import MathView from "../../MathView";
import { MyCustomACEEditor } from "./InlineMathEditorComponent";
import {
  AppStateContext,
  AppStateProvider,
} from "../../../../reducers/AppStateContext";

export function TippedMath({ value, onChange, showTooltip, requestClose }) {
  return (
    <Tooltip
      interactive={true}
      // theme={"light"}
      trigger={"mouseenter"}
      position={"bottom"}
      open={showTooltip}
      onRequestClose={requestClose}
      style={{
        backgroundColor: "transparent",
      }}
      html={
        <div
          style={{
            width: "350px", // need to be the same as the maxWidth value listed here : https://atomiks.github.io/tippyjs/v5/all-props/
          }}
        >
          <MyCustomACEEditor
            width={"350px"}
            value={value}
            onChange={onChange}
          />
        </div>
      }
    >
      <MathView value={value} />
    </Tooltip>
  );
}
