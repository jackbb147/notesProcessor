import {
  useGraph,
  useGraphDispatch,
  useAppState,
} from "../../../hooks/AppStateAndGraphAndUserhooks";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, CSSObjectWithLabel, Options } from "react-select";
import { GraphActionType } from "../../../reducers/GraphReducer";
import { ValueType } from "tailwindcss/types/config";
import { ComponentProps, useEffect } from "react";
import { DropdownIndicator } from "react-select/dist/declarations/src/components/indicators";

import { useSetLabelMutation } from "../../../api/apiSlice";

export function LabelSelector({
  handleChange,
  showDropDown = true,
  options,
  values,
}: {
  handleChange: (value: Options<any>, action: ActionMeta<any>) => any;

  showDropDown?: boolean;
  options: { value: string; label: string }[];
  values: { value: string; label: string }[];
}) {
  // useEffect(() => {
  //   if (isError) {
  //     throw JSON.stringify(error, null, 2);
  //   }
  // }, [isError]);

  const [setLabel, { isLoading: isSettingLabel }] = useSetLabelMutation();

  const appState = useAppState();

  function getComponents() {
    let res: any = {};
    if (!showDropDown) {
      res.DropdownIndicator = () => null;
      res.ClearIndicator = () => null;
      res.IndicatorSeparator = () => null;
    }
    return res;
  }

  return (
    <div style={{ color: "black" }}>
      <CreatableSelect
        styles={{
          control: (base, state): CSSObjectWithLabel => ({
            ...base,
            backgroundColor: "transparent",
          }),
          menu: (base, state): CSSObjectWithLabel => ({
            ...base,
            backgroundColor: appState.darkModeOn
              ? state.theme.colors.neutral80
              : "white",
          }),

          menuList: (base, state): CSSObjectWithLabel => ({
            ...base,
            // color: appState.darkModeOn ?
          }),

          input: (base, state) => ({
            ...base,
            color: appState.darkModeOn ? "white" : "black",
          }),

          option: (base, state) => ({
            ...base,
            backgroundColor: appState.darkModeOn
              ? state.isFocused
                ? state.theme.colors.neutral0
                : "transparent"
              : state.isFocused
              ? state.theme.colors.primary50
              : "transparent",
            color: appState.darkModeOn
              ? state.isFocused
                ? "black"
                : "white"
              : state.isFocused
              ? "black"
              : "black",
          }),
        }}
        components={getComponents()}
        menuPlacement={"top"}
        isMulti
        isClearable
        value={values}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
}
