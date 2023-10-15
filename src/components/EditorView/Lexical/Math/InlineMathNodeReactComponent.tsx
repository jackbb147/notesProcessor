import { ContentContainer } from "../../ContentContainer";
import { Popover, TippedMath } from "./TippedMath";
import React, { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useAppState } from "../../../../hooks/AppStateAndGraphAndUserhooks";

export function InlineMathNodeReactComponent({
  handleCloseToolTip,
  showToolTip, // ref,
  defaultTex,
  updateTex,
  selected,
}: {
  handleCloseToolTip: ({
    exitDirection,
  }: {
    exitDirection?: "left" | "right";
  }) => void;
  showToolTip: boolean;
  defaultTex: string;
  updateTex: (tex: string) => void;
  selected?: boolean;
  // ref: Function;
}) {
  const [tex, setTex] = React.useState(defaultTex);
  const appState = useAppState();

  useEffect(() => {
    // if (!showToolTip) debugger;
    console.log("showToolTip: " + showToolTip);
  }, [showToolTip]);
  useEffect(() => {
    console.log("[InlineMathNodeReactComponent] selected: " + selected);
  }, [selected]);

  return (
    // <Popover />
    <div
      style={{
        // opacity: selected && !showToolTip ? 0.6 : 1,
        outline: selected
          ? `1px solid ${appState.darkModeOn ? "white" : "black"}`
          : "none",
      }}
    >
      <TippedMath
        value={tex}
        onChange={(tex: string) => {
          console.log("[onChange] fired in TippedMath. tex: " + tex);
          // alert("hey");
          // this.hanleTexChange(_editor, tex);
          // debugger;
          // const _ = ref();

          // ref.current = tex;
          setTex(tex);
        }}
        showTooltip={showToolTip}
        requestClose={({
          val,
          exitDirection,
        }: {
          val?: string;
          exitDirection?: "left" | "right";
        }) => {
          // this.closeToolTip(_editor);
          // debugger;

          if (val) {
            setTex(val);
            updateTex(val);
          } else {
            updateTex(tex);
          }
          console.log("exitDirection: " + exitDirection);
          handleCloseToolTip({
            exitDirection: exitDirection ?? "right",
          });
        }}
      />
    </div>
  );
}
