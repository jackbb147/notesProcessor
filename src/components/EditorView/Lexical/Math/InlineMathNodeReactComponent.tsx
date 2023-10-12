import { ContentContainer } from "../../ContentContainer";
import { Popover, TippedMath } from "./TippedMath";
import React, { useEffect } from "react";

export function InlineMathNodeReactComponent({
  handleCloseToolTip,
  showToolTip, // ref,
  defaultTex,
  updateTex,
}: {
  handleCloseToolTip: () => void;
  showToolTip: boolean;
  defaultTex: string;
  updateTex: (tex: string) => void;
  // ref: Function;
}) {
  const [tex, setTex] = React.useState(defaultTex);

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
      requestClose={() => {
        // this.closeToolTip(_editor);
        updateTex(tex);
        handleCloseToolTip();
      }}
    />
  );
}
