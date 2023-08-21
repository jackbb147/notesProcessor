import { NodeViewWrapper } from "@tiptap/react";
import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another

function CodeEditor() {
  const [code, setCode] = React.useState(
    `function add(c, d) {\n  return a + b;\n}`,
  );
  return (
    <Editor
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={(code) => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />
  );
}
export default (props) => {
  const increase = () => {
    props.updateAttributes({
      count: props.node.attrs.count + 1,
    });
  };

  return (
    <NodeViewWrapper className="react-component">
      <span className="label">React Component</span>

      <div className="content">
        <button onClick={increase}>
          This button has been clicked {props.node.attrs.count} times.
        </button>
        <CodeEditor />
      </div>
    </NodeViewWrapper>
  );
};
