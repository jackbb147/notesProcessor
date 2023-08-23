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
import { Tooltip, withTooltip } from "react-tippy";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { useDisableErrorOverlay } from "../../../../../hooks/useDisableErrorOverlay";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import MathView from "./MathView";
import { getCursorPos, setCursorPos } from "./TiptapCursorPos";
import { NodeViewProps } from "@jackhou147/tiptap/packages/react";
import ReactAce from "react-ace";
import { IAceEditor } from "react-ace/lib/types";
import { Ace } from "ace-builds";
import { VirtualRenderer } from "ace-builds/ace";
import ReactFocusLock from "react-focus-lock";
import {TippedMath} from "./TippedMath";
interface Point {
  row: number;
  column: number;
}

interface Delta {
  action: "insert" | "remove";
  start: Point;
  end: Point;
  lines: string[];
}

export function InlineMathEditorComponent(props: NodeViewProps) {
  const AppState = useAppState();

  const [destroyed, setDestroyed] = useState(false);
  const [isEditing, setIsEditing] = useState(true); // ["latex", "mathml"

  const [showTooltip, setShowTooltip] = useState(false);
  const [value, setValue] = useState("hello!!!");
  // useDisableErrorOverlay();

  // @ts-ignore
  return (
    <NodeViewWrapper className="react-component">
      {/*<span className="label">React Component</span>*/}

      <div className="content" tabIndex={0}>
        {/*<button onClick={increase}>*/}
        {/*  This button has been clicked {props.node.attrs.count} times.*/}
        {/*</button>*/}
        {!destroyed &&
          (isEditing ? (


              <TippedMath
                  value={value}
                  onChange={(newValue: string) => {
                    setValue(newValue);
                  }}
              />
              // <Tippy
              // allowHTML={true}
              // interactive={true}
              // content={
              //   <div>asklflk</div>
              //   // <AceEditor></AceEditor>
              // }>
              //   <div>{value}</div>
              // </Tippy>

            // withTooltip(MyCustomACEEditor, {
            //   html:
            //   <MyCustomACEEditor
            //     props={props}
            //     value={value}
            //     setValue={setValue}
            //   />,
            //
            //   // position: "top",
            //   // trigger="click"
            //   open: showTooltip,
            //   arrow: true,
            // })
              // <MathView value={value} />
            // <MyCustomACEEditor
            //   props={props}
            //   value={value}
            //   setValue={setValue}
            // />
          ) : (
            <div
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <MathView
                value={value}
                styles={{
                  color: "yellow",
                }}
              />
            </div>
          ))}
      </div>
    </NodeViewWrapper>
  );
}

export function MyCustomACEEditor({
    width="350px",
  value,
    onChange
}: {
    width?:string,
  value:string,
  onChange: (newValue: string) => void
}) {

  const reactAceRef = useRef<ReactAce>(null);
  const [completerConfigured, setCompleterConfigured] = React.useState(false);
  function updateSize(
    e: any,
    editor: IAceEditor,
    renderer: Ace.VirtualRenderer,
  ) {
    // console.log(`[updateSize] fired`);
    // debugger;
    // https://stackoverflow.com/a/57279878/21646295

    // var text = renderer.session.getLine(0);

    return;

    var text = editor.getSession().getLine(0);
    // var chars = renderer.session.$getStringScreenWidth(text)[0];
    var chars = editor.getSession().getScreenWidth();

    var width =
      Math.max(chars, 2) * renderer.characterWidth + // text size
      2 * renderer.$padding + // padding
      2; // add border width if needed

    // update container size
    renderer.container.style.width = width + "px";

    // update computed size stored by the editor
    // renderer.onResize(false, 0, width, renderer.$size.height); //TODO put this back in somehow...?
    // renderer.on("resize");
  }


  useEffect(() => {
    if (!reactAceRef.current) return;
    // updateSize(
    //   null,
    //   reactAceRef.current.editor,
    //   reactAceRef.current.editor.renderer,
    // );
    if (completerConfigured) return;
    console.log(`[useEffect] fired`);
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
      getCompletions: function (
        editor: IAceEditor,
        session: any,
        pos: any,
        prefix: any,
        callback: (
          arg0: null,
          arg1: { caption: string; value: string; meta: string }[],
        ) => void,
      ) {
        // var wordList = [String.raw `\foo`, "bar", "baz"];

        // debugger;
        callback(null, completionOptions);
      },
    };

    // debugger;
    editor.completers.push(staticWordCompleter);
    // https://stackoverflow.com/a/38437098
    editor.on("change", (obj: Delta) => {
      // debugger;
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



    // make sure the auto complete pop up boxes are on top, instead of bottom
    // const config = {
    //   childList: true,
    //   subtree: true,
    //   attributes: true,
    //   attributeFilter: ["style"],
    // };

    // const callback = (mutationList, observer) => {
    //   //  ;
    //   for (const mutation of mutationList) {
    //     if (
    //       mutation.type === "childList" &&
    //       // /**/&&
    //       "addedNodes" in mutation &&
    //       mutation.addedNodes.length > 0 &&
    //       mutation.addedNodes[0].classList &&
    //       mutation.addedNodes[0].classList.contains("ace_autocomplete")
    //     ) {
    //       let auto = mutation.addedNodes[0];
    //       // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
    //       // this is to override ACE's styling choices for the autocomplete pop up box.
    //       const myObserver = new ResizeObserver((entries) => {
    //         // We wrap it in requestAnimationFrame to avoid this error - ResizeObserver loop limit exceeded
    //         // window.requestAnimationFrame(() => {
    //         entries.forEach((entry) => {
    //           console.log("width", entry.contentRect.width);
    //           console.log("height", entry.contentRect.height);
    //           let target = entry.target;
    //           // let height = entry.contentRect.height;
    //           let height = 100; // in pixels todo don't hard code this..
    //           if (height != 0) {
    //             //  ;
    //             let bounds = editor.container.getBoundingClientRect();
    //             target.style.top = bounds.y - 1.01 * height + "px";
    //             target.style.height = height + "px";
    //           }
    //         });
    //         // });
    //       });
    //
    //       myObserver.observe(auto);
    //     }
    //   }
    // };
    // const observer = new MutationObserver(callback);



    setCompleterConfigured(true);
  }, [completerConfigured]);
  return (
    <>
      {/*<input ref={inputRef} />*/}
      <AceEditor
        ref={reactAceRef}
        mode="latex"
        value={value}
        // focus={true}
        theme={"github"}
        // theme={AppState.darkModeOn ? "monokai" : "github"}
        style={
          {
            // height: "50px",
            // maxWidth: "100%",
            // minWidth: "1rem",
            width: width,
            maxHeight: "10vh",
          }
        }
        placeholder={"\\text{hello world}"}
        // showGutter={false}
        // showPrintMargin={false}
        enableLiveAutocompletion={false}
        enableBasicAutocompletion={true}
        onChange={onChange}
        // commands={[
        //   {
        //     name: "deleteMe",
        //     bindKey: { win: "backspace", mac: "backspace" },
        //     exec: function (editor) {
        //       //  ;
        //       let value = editor.getValue();
        //       console.log(value);
        //       if (value.length === 0) {
        //         let p = props;
        //         // editor.destroy();
        //
        //         // setDestroyed(true);
        //         // debugger;
        //         const cursorPos = getCursorPos(p.editor);
        //         p.deleteNode();
        //         setCursorPos(props.editor, cursorPos);
        //         // setCursorPos(p.editor, cursorPos);
        //         return true;
        //
        //         // user wants to delete the quillModules box ...
        //         // let index = quill.getSelection().index;
        //         // quill.deleteText(index, 1);
        //         // tooltip.hide();
        //       }
        //
        //       return false; // must return false in order to fire the default event:https://stackoverflow.com/a/42020190/21646295
        //     },
        //   },
        //   {
        //     name: "exit me, left",
        //     bindKey: { win: "Left", mac: "Left" },
        //     exec: function (editor) {
        //       let cursorPosition = editor.selection.getCursor();
        //
        //       if (cursorPosition.column === 0) {
        //         //
        //         // debugger;
        //         let p = props;
        //         setCursorPos(p.editor, getCursorPos(p.editor) - 1);
        //
        //         //TODO convertEditorToMath(editor);
        //         // setIsEditing(false);
        //       }
        //       return false;
        //     },
        //   },
        //   {
        //     name: "exit me, right",
        //     bindKey: { win: "Right", mac: "Right" },
        //     exec: function (editor) {
        //       let cursorPosition = editor.selection.getCursor();
        //       let len = editor.getValue().length;
        //       //
        //       if (cursorPosition.column === len) {
        //         let p = props;
        //         setCursorPos(p.editor, getCursorPos(p.editor) + 1);
        //         // TODO convertEditorToMath(editor, "right");
        //         // setIsEditing(false);
        //       }
        //       return false;
        //     },
        //   },
        // ]}
        onBlur={() => {
          console.debug(`[InlineMathEditorComponent] blur`);
          // setIsEditing(false);
          setCompleterConfigured(false);
        }}
        onLoad={(editor) => {
          setTimeout(() => {
            // focusAndOpenKeyboard(editor);
            // let d = document;
            // debugger;
            // editor.focus();
          }, 0);
        }}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </>
  );
}
const Header = () => <h2>Header here</h2>;

const HeaderWithTooltip = withTooltip(Header, {
  title: "Welcome to React with tooltip",
});

// export const TooltippedAceEditor = withTooltip(MyCustomACEEditor, {
//   // options
// });
