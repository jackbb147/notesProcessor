import { NodeViewWrapper } from "@jackhou147/tiptap/packages/react";
import React, { useEffect, useRef } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { MATHJAXCOMMANDS } from "../../../Quill/quillModules/Quill-MathJax/mathjaxCommands";

export default (props) => {
  const reactAceRef = useRef(null);
  const [completerConfigured, setCompleterConfigured] = React.useState(false);
  const increase = () => {
    props.updateAttributes({
      count: props.node.attrs.count + 1,
    });
  };

  function onChange(newValue) {
    console.log("change", newValue);
  }

  useEffect(() => {
    if (!reactAceRef.current) return;
    if (completerConfigured) return;
    const editor = reactAceRef.current.editor;
    // debugger;
    var staticWordCompleter = {
      getCompletions: function (editor, session, pos, prefix, callback) {
        // var wordList = [String.raw `\foo`, "bar", "baz"];
        var wordList = MATHJAXCOMMANDS;
        callback(
          null,
          wordList.map(function (word) {
            return {
              caption: word,
              value: word,
              meta: "static",
            };
          }),
        );
      },
    };

    editor.completers.push(staticWordCompleter);
    setCompleterConfigured(true);
  }, [reactAceRef.current]);

  return (
    <NodeViewWrapper className="react-component">
      <span className="label">React Component</span>

      <div className="content">
        <button onClick={increase}>
          This button has been clicked {props.node.attrs.count} times.
        </button>
        <AceEditor
          ref={reactAceRef}
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
