import { NodeViewWrapper } from "@jackhou147/tiptap/packages/react";
import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

export default (props) => {
  const increase = () => {
    props.updateAttributes({
      count: props.node.attrs.count + 1,
    });
  };

  function onChange(newValue) {
    console.log("change", newValue);
  }

  return (
    <NodeViewWrapper className="react-component">
      <span className="label">React Component</span>

      <div className="content">
        <button onClick={increase}>
          This button has been clicked {props.node.attrs.count} times.
        </button>
        <AceEditor
          mode="latex"
          theme="monokai"
          enableLiveAutocompletion={true}
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    </NodeViewWrapper>
  );
};
