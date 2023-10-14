import { ContentContainer } from "../../ContentContainer";
import { Popover, TippedMath } from "./TippedMath";
import React, { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export function InlineMathNodeReactComponent({
  handleCloseToolTip,
  showToolTip, // ref,
  defaultTex,
  updateTex,
  selected,
}: {
  handleCloseToolTip: () => void;
  showToolTip: boolean;
  defaultTex: string;
  updateTex: (tex: string) => void;
  selected?: boolean;
  // ref: Function;
}) {
  const [tex, setTex] = React.useState(defaultTex);

  useEffect(() => {
    console.log("showToolTip: " + showToolTip);
  }, [showToolTip]);
  useEffect(() => {
    console.log("[InlineMathNodeReactComponent] selected: " + selected);
  }, [selected]);

  return (
    // <Popover />
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
      requestClose={(val?: string) => {
        // this.closeToolTip(_editor);
        // debugger;

        if (val) {
          setTex(val);
          updateTex(val);
        } else {
          updateTex(tex);
        }
        handleCloseToolTip();
      }}
    />
  );
}
