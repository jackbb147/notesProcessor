import { ContentContainer } from "../../ContentContainer";
import { TippedMath } from "../../TippedMath";
import React from "react";

export function InlineMathNodeReactComponent({
  handleCloseToolTip,
  showToolTip,
}: {
  handleCloseToolTip: () => void;
  showToolTip: boolean;
}) {
  const [tex, setTex] = React.useState("F = ma");
  return (
    <TippedMath
      value={tex}
      onChange={(tex: string) => {
        console.log("[onChange] fired in TippedMath. tex: " + tex);
        // alert("hey");
        // this.hanleTexChange(_editor, tex);
        setTex(tex);
      }}
      showTooltip={showToolTip}
      requestClose={() => {
        // this.closeToolTip(_editor);
        handleCloseToolTip();
      }}
    />
  );
}
