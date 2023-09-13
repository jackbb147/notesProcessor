import { LabelSelector } from "./EditorView/LabelSelector/LabelSelector";
import { Overlay } from "./Overlay";
import {
  useAppDispatch,
  useGraph,
  useGraphDispatch,
  useAppState,
} from "../hooks/AppStateAndGraphAndUserhooks";
import { ActionMeta, Options } from "react-select";
import { AppActionType } from "../reducers/AppStateReducer";
import { GraphActionType } from "../reducers/GraphReducer";
import { useGetLabelsQuery } from "../api/apiSlice";

export function LabelSelectorPopUp() {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const graph = useGraph();
  const graphDispatch = useGraphDispatch();
  const { data: labels } = useGetLabelsQuery();
  function handleChange(value: Options<any>, action: ActionMeta<any>) {
    switch (action.action) {
      // TODO
      case "create-option": {
        graphDispatch({
          type: GraphActionType.addLabel,
          label: action.option.label,
        });
        break;
      }

      case "remove-value": {
        graphDispatch({
          type: GraphActionType.removeLabel,
          label: action.removedValue.label,
        });
        break;
      }
    }
  }

  function handleOverlayClick(e: React.MouseEvent) {
    dispatch({
      type: AppActionType.setShowLabelSelectorPopup,
      show: false,
    });
  }

  return !state.showLabelSelectorPopup || !labels ? (
    <></>
  ) : (
    <Overlay handleClick={handleOverlayClick}>
      <div
        className={`
                m-auto
               
                w-full
                
            `}
      >
        <LabelSelector
          handleChange={handleChange}
          showDropDown={false}
          options={labels.map((s: string) => {
            return { value: s, label: s };
          })}
        />
      </div>
    </Overlay>
  );
}
