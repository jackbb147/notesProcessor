import { NodeViewWrapper } from "@tiptap/react";
import React, {
  LegacyRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";
import { ContentContainer } from "../../ContentContainer";
import { MATHJAXCOMMANDS } from "./mathjaxCommands";
import { useAppState } from "../../../../hooks/AppStateAndGraphAndUserhooks";
// import "react-tippy/dist/tippy.css";
import { Tooltip, withTooltip } from "react-tippy";
import Tippy from "@tippyjs/react";
// import 'tippy.js/dist/tippy.css'; // optional
import { useDisableErrorOverlay } from "../../../../hooks/useDisableErrorOverlay";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import MathView from "../../MathView";
import { getCursorPos, setCursorPos } from "./TiptapCursorPos";

import { NodeViewProps } from "@tiptap/react";
import ReactAce from "react-ace";
import { IAceEditor } from "react-ace/lib/types";
import { Ace } from "ace-builds";
import { VirtualRenderer } from "ace-builds/ace";
import ReactFocusLock from "react-focus-lock";
import { TippedMath } from "../../TippedMath";
import Draggable from "react-draggable"; // The default
import useDoubleClick from "use-double-click";
import { useLongPress } from "use-long-press";
import NearMeIcon from "@mui/icons-material/NearMe";
import { NearMeOutlined } from "@mui/icons-material";

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
  const [draggableKey, setDraggableKey] = useState(0); //changing this will achieve the effect of resetting the node position: https://github.com/react-grid-layout/react-draggable/issues/214#issuecomment-270021423

  const [nodeMoved, setNodeMoved] = useState(false);
  // console.warn(props.node.attrs);
  // const [showTooltip, setShowTooltip] = useState(false);

  // useEffect(() => {
  //   setShowTooltip(true);
  // }, []);
  function resetNodePosition() {
    setDraggableKey(draggableKey + 1);
    setNodeMoved(false);
  }

  function handleNodeLongPress() {
    // alert("long press detected")
    // setShowTooltip(true);
    props.updateAttributes({
      open: true,
    });
  }

  function handleRequestCloseTooltip() {
    // setShowTooltip(false); //TODO modify this somehow
    props.updateAttributes({
      open: false,
    });
  }

  function handleNodeMove() {
    setNodeMoved(true);
  }
  useEffect(() => {
    if (props.node.attrs.first) {
      // debugger;
      setTimeout(() => {
        props.updateAttributes({
          open: true,
        });
        props.updateAttributes({
          first: false,
        });
      }, 0); // this is a hack to get the tooltip to show up on the first render. Without the set timeout, mathjax crashes.
    }
  }, []);
  // @ts-ignore
  return (
    <Draggable key={draggableKey} onDrag={handleNodeMove}>
      <NodeViewWrapper className="react-component">
        {/*<span className="label">React Component</span>*/}
        <ContentContainer onLongPress={handleNodeLongPress}>
          <div
            style={{
              // border: "1px solid yellow",
              position: "relative",
              marginRight: "1.15rem",
            }}
          >
            <TippedMath
              value={props.node.attrs.value}
              showTooltip={props.node.attrs.open}
              requestClose={handleRequestCloseTooltip}
              onChange={(newValue: string) => {
                // setValue(newValue);
                props.updateAttributes({
                  value: newValue,
                });
              }}
            />
            <div
              onClick={resetNodePosition}
              onTouchStart={resetNodePosition}
              style={{
                display: "inline",
                // width: "1rem",
                // border: "1px solid blue",
                position: "absolute",
                left: "100%",
                top: "0",
                cursor: "pointer",
                fontSize: "1rem",
                opacity: ".4",
                // color: "red"
              }}
            >
              {nodeMoved ? (
                <NearMeOutlined fontSize={"inherit"}></NearMeOutlined>
              ) : (
                <NearMeIcon fontSize={"inherit"}></NearMeIcon>
              )}
            </div>
          </div>
          {/*// <Tippy*/}
          {/*// allowHTML={true}*/}
          {/*// interactive={true}*/}
          {/*// content={*/}
          {/*//   <div>asklflk</div>*/}
          {/*//   // <AceEditor></AceEditor>*/}
          {/*// }>*/}
          {/*//   <div>{value}</div>*/}
          {/*// </Tippy>*/}

          {/*// withTooltip(MyCustomACEEditor, {*/}
          {/*//   html:*/}
          {/*//   <MyCustomACEEditor*/}
          {/*//     props={props}*/}
          {/*//     value={value}*/}
          {/*//     setValue={setValue}*/}
          {/*//   />,*/}
          {/*//*/}
          {/*//   // position: "top",*/}
          {/*//   // trigger="click"*/}
          {/*//   open: showTooltip,*/}
          {/*//   arrow: true,*/}
          {/*// })*/}
          {/*// <MathView value={value} />*/}
          {/*// <MyCustomACEEditor*/}
          {/*//   props={props}*/}
          {/*//   value={value}*/}
          {/*//   setValue={setValue}*/}
          {/*// />*/}
        </ContentContainer>
      </NodeViewWrapper>
    </Draggable>
  );
}

export function MyCustomACEEditor({
  width = "350px",
  value,
  onChange,
}: {
  width?: string;
  value: string;
  onChange: (newValue: string) => void;
}) {
  const reactAceRef = useRef<ReactAce>(null);
  const [completerConfigured, setCompleterConfigured] = React.useState(false);
  function updateSize(
    e: any,
    editor: IAceEditor,
    renderer: Ace.VirtualRenderer,
  ) {
    // console.log(`[updateSize] fired`);
    //
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
    //
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

        //
        callback(null, completionOptions);
      },
    };

    //
    editor.completers.push(staticWordCompleter);
    // https://stackoverflow.com/a/38437098
    editor.on("changeSession", (e: any) => {
      console.log("[changeSession] fired");
    });
    // editor.on("change", (obj: Delta) => {
    //   //
    //
    //   console.log("[onChange] fired in ACEEditor.");
    //   const s = editor.getValue();
    //   // switch (obj.action) {
    //   //   case "insert":
    //   //     let lines = obj.lines;
    //   //     let char = lines[0];
    //   //     if (lines.length === 1 && char.length === 1 && /\\/i.test(char)) {
    //   //       setTimeout(() => {
    //   //         editor.commands.byName.startAutocomplete.exec(editor);
    //   //       }, 50);
    //   //     }
    //   //     break;
    //   // }
    //   onChange(s); // onChange(obj.);
    // });

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
        onFocus={() => {
          console.log("focused");
        }}
        theme={"monokai"}
        // theme={AppState.darkModeOn ? "monokai" : "github"}
        style={{
          // height: "50px",
          // maxWidth: "100%",
          // minWidth: "1rem",
          width: width,
          maxHeight: "10vh",
        }}
        placeholder={"\\text{hello world}"}
        // showGutter={false}
        // showPrintMargin={false}
        enableLiveAutocompletion={false}
        enableBasicAutocompletion={true}
        onChange={(s) => {
          console.log("[onChange] fired in ACEEditor. s: " + s);
          onChange(s);
          // if (reactAceRef.current) reactAceRef.current.editor.focus();
        }}
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
        //         //
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
        //         //
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
            //
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
