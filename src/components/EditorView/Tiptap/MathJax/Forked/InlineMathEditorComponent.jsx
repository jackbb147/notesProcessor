import { NodeViewWrapper } from "@jackhou147/tiptap/packages/react";
import React, { useEffect, useRef, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { MATHJAXCOMMANDS } from "../Forked/mathjaxCommands";
import { useAppState } from "../../../../../hooks/AppStateAndGraphhooks";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import { useResizeObserverBugFix } from "../../../../../hooks/useResizeObserverBugFix";
import { MathJax, MathJaxContext } from "better-react-mathjax";

function getCursorPos(tiptapEditor) {
  const selection = tiptapEditor.state.selection;
  const cursorPos = selection.$anchor.pos;
  return cursorPos;
}

function setCursorPos(tiptapEditor, pos) {
  tiptapEditor.chain().focus().setTextSelection(pos).run();
}

function InlineMathEditorComponent(props) {
  const AppState = useAppState();
  const reactAceRef = useRef(null);
  const [completerConfigured, setCompleterConfigured] = React.useState(false);
  const [destroyed, setDestroyed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [value, setValue] = useState("");
  useResizeObserverBugFix();
  const increase = () => {
    props.updateAttributes({
      count: props.node.attrs.count + 1,
    });
  };

  function onChange(newValue) {
    console.log("change", newValue);
    setValue(newValue);
  }

  useEffect(() => {
    if (!reactAceRef.current) return;
    if (!props.selected) {
      return;
    }
    console.debug(
      `[InlineMathEditorComponent] props.selected: ${props.selected}`,
    );

    reactAceRef.current.editor.focus();
  }, [props.selected]);

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
          setShowTooltip(true);
          if (lines.length === 1 && char.length === 1 && /\\/i.test(char)) {
            setTimeout(() => {
              editor.commands.byName.startAutocomplete.exec(editor);
            }, 50);
          }
          break;
      }
    });

    editor.focus();
    // editor.setValue("hello world");

    editor.commands.addCommand({
      name: "deleteMe",
      bindKey: { win: "backspace", mac: "backspace" },
      exec: function (editor) {
        //  ;
        let value = editor.getValue();
        console.log(value);
        if (value.length === 0) {
          let p = props;
          // editor.destroy();

          setDestroyed(true);
          // debugger;
          const cursorPos = getCursorPos(p.editor);
          p.deleteNode();
          setCursorPos(p.editor, cursorPos);
          return true;

          // user wants to delete the quillModules box ...
          // let index = quill.getSelection().index;
          // quill.deleteText(index, 1);
          // tooltip.hide();
        }

        return false; // must return false in order to fire the default event:https://stackoverflow.com/a/42020190/21646295
      },
    });

    editor.commands.addCommand({
      name: "exit me, left",
      bindKey: { win: "Left", mac: "Left" },
      exec: function (editor) {
        let cursorPosition = editor.selection.getCursor();

        if (cursorPosition.column === 0) {
          //
          // debugger;
          let p = props;
          setCursorPos(p.editor, getCursorPos(p.editor) - 1);

          //TODO convertEditorToMath(editor);
        }
        return false;
      },
    });

    editor.commands.addCommand({
      name: "exit me, right",
      bindKey: { win: "Right", mac: "Right" },
      exec: function (editor) {
        let cursorPosition = editor.selection.getCursor();
        let len = editor.getValue().length;
        //
        if (cursorPosition.column === len) {
          let p = props;
          setCursorPos(p.editor, getCursorPos(p.editor) + 1);
          // TODO convertEditorToMath(editor, "right");
        }
        return false;
      },
    });

    editor.renderer.on("beforeRender", updateSize);
    function updateSize(e, renderer) {
      // https://stackoverflow.com/a/57279878/21646295
      var text = renderer.session.getLine(0);
      var chars = renderer.session.$getStringScreenWidth(text)[0];

      var width =
        Math.max(chars, 2) * renderer.characterWidth + // text size
        2 * renderer.$padding + // padding
        2; // add border width if needed

      // update container size
      renderer.container.style.width = width + "px";
      // update computed size stored by the editor
      renderer.onResize(false, 0, width, renderer.$size.height);
    }
    updateSize(null, editor.renderer);

    // make sure the auto complete pop up boxes are on top, instead of bottom
    const config = {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style"],
    };

    const callback = (mutationList, observer) => {
      //  ;
      for (const mutation of mutationList) {
        if (
          mutation.type === "childList" &&
          // /**/&&
          "addedNodes" in mutation &&
          mutation.addedNodes.length > 0 &&
          mutation.addedNodes[0].classList &&
          mutation.addedNodes[0].classList.contains("ace_autocomplete")
        ) {
          let auto = mutation.addedNodes[0];
          // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
          // this is to override ACE's styling choices for the autocomplete pop up box.
          const myObserver = new ResizeObserver((entries) => {
            // We wrap it in requestAnimationFrame to avoid this error - ResizeObserver loop limit exceeded
            // window.requestAnimationFrame(() => {
            entries.forEach((entry) => {
              console.log("width", entry.contentRect.width);
              console.log("height", entry.contentRect.height);
              let target = entry.target;
              // let height = entry.contentRect.height;
              let height = 100; // in pixels todo don't hard code this..
              if (height != 0) {
                //  ;
                let bounds = editor.container.getBoundingClientRect();
                target.style.top = bounds.y - 1.01 * height + "px";
                target.style.height = height + "px";
              }
            });
            // });
          });

          myObserver.observe(auto);
        }
      }
    };
    const observer = new MutationObserver(callback);

    observer.observe(document.body, config);

    setCompleterConfigured(true);
  }, [reactAceRef.current]);

  return (
    <NodeViewWrapper className="react-component">
      {/*<span className="label">React Component</span>*/}

      <div className="content">
        {/*<button onClick={increase}>*/}
        {/*  This button has been clicked {props.node.attrs.count} times.*/}
        {/*</button>*/}
        {!destroyed && (
          <Tooltip
            // options
            title="Welcome to React"
            html={
              <MathJaxContext>
                <MathJax>{`\\( ${value} \\)`}</MathJax>
              </MathJaxContext>
            }
            position={"bottom"}
            // trigger="click"
            open={showTooltip}
            arrow={true}
          >
            <AceEditor
              ref={reactAceRef}
              mode="latex"
              theme={AppState.darkModeOn ? "monokai" : "github"}
              style={{
                maxWidth: "100%",
                minWidth: "1rem",
              }}
              placeholder={"\\text{hello world}"}
              showGutter={false}
              showPrintMargin={false}
              highlightActiveLine={false}
              maxLines={1}
              enableLiveAutocompletion={false}
              enableBasicAutocompletion={true}
              onChange={onChange}
              onLoad={(editor) => {}}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
            />
          </Tooltip>
        )}
      </div>
    </NodeViewWrapper>
  );
}

export default function WithContext() {
  return (
    <MathJaxContext>
      <InlineMathEditorComponent />
    </MathJaxContext>
  );
}
