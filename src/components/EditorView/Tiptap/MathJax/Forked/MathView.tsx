import { MathJax, MathJaxContext } from "better-react-mathjax";
import React from "react";

export default ({
  value,
  styles = {},
}: {
  value: string;
  styles?: React.CSSProperties;
}) => {
  return (
    <MathJaxContext>
      <MathJax
        style={{
          ...styles,
        }}
      >{`\\( ${value} \\)`}</MathJax>
    </MathJaxContext>
  );
};
