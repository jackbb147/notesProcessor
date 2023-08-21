import { NodeViewWrapper } from "@jackhou147/tiptap/packages/react";
import React, { useEffect, useRef } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { MATHJAXCOMMANDS } from "../Forked/mathjaxCommands";

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
    const completionOptions = MATHJAXCOMMANDS.map(function (word) {
      return {
        caption: word,
        value: word,
        meta: "static",
      };
    });
    var staticWordCompleter = {
      getCompletions: function (editor, session, pos, prefix, callback) {
        // var wordList = [String.raw `\foo`, "bar", "baz"];

        // debugger;
        callback(null, completionOptions);
      },
    };

    editor.completers.push(staticWordCompleter);
    // https://stackoverflow.com/a/38437098
    editor.on("change", (obj, editor) => {
      switch (obj.action) {
        case "insert":
          let lines = obj.lines;
          let char = lines[0];
          if (lines.length === 1 && char.length === 1 && /\\/i.test(char)) {
            setTimeout(() => {
              editor.commands.byName.startAutocomplete.exec(editor);
            }, 50);
          }
          break;
      }
    });
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
          enableLiveAutocompletion={false}
          enableBasicAutocompletion={true}
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    </NodeViewWrapper>
  );
};
