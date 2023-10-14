import { Tooltip } from "react-tippy";
import AceEditor from "react-ace";
import MathView from "../../MathView";
import { MyCustomACEEditor } from "./MyCustomACEEditor";
import {
  AppStateContext,
  AppStateProvider,
} from "../../../../reducers/AppStateContext";
import { useEffect, useRef, useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
} from "@floating-ui/react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getPreviousSelection, $getSelection } from "lexical";

export function Popover() {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: "end" }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const headingId = "123";

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        Add review
      </button>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="Popover"
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              // border: "1px solid white",
              padding: "10px",
              cursor: "pointer",
              color: "black",
            }}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <textarea placeholder="Write your review..." />
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
export function TippedMath({ value, onChange, showTooltip, requestClose }) {
  const [isOpen, setIsOpen] = useState(showTooltip);
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    console.log("showTooltip TippedMath", showTooltip);
    if (!showTooltip) return; //TODO THIS IS A HACK. FIX IT
    setIsOpen(showTooltip);
  }, [showTooltip]);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange(open) {
      setIsOpen(open);
      if (!open) {
        // debugger;
        requestClose({});
      }
    },
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        <MathView value={value} />
      </div>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="Popover"
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              // border: "1px solid white",
              // padding: "10px",
              cursor: "pointer",
              color: "black",
              zIndex: 1000,
            }}
            {...getFloatingProps()}
          >
            {/*<textarea placeholder="Write your review..." />*/}
            <MyCustomACEEditor
              // width={"350px"}
              value={value}
              showAutoComplete={value === "\\"}
              onChange={onChange}
              requestUnmount={(val, exitDirection) => {
                // debugger;
                setIsOpen(false);
                //   TODO make sure the lexical cursor is restored

                // debugger;
                debugger;
                requestClose({
                  val: val,
                  exitDirection: exitDirection,
                });
              }}
            />
          </div>
          {/*<div*/}
          {/*  ref={refs.setFloating}*/}
          {/*  style={floatingStyles}*/}
          {/*  {...getFloatingProps()}*/}
          {/*>*/}
          {/*<div className={"border p-2"}>HELLO</div>*/}
          {/*<MyCustomACEEditor*/}
          {/*  // width={"350px"}*/}
          {/*  value={value}*/}
          {/*  onChange={onChange}*/}
          {/*/>*/}
          {/*</div>*/}
        </FloatingFocusManager>
      )}
      {/*<Tooltip*/}
      {/*  interactive={true}*/}
      {/*  // theme={"light"}*/}
      {/*  trigger={"mouseenter"}*/}
      {/*  position={"bottom"}*/}
      {/*  open={showTooltip}*/}
      {/*  // unmountHTMLWhenHide={true}*/}
      {/*  // onOpen={() => {*/}
      {/*  //   // debugger;*/}
      {/*  //   console.info("onOpen");*/}
      {/*  // }}*/}
      {/*  onShow={() => {*/}
      {/*    // debugger;*/}
      {/*    console.info("onShow");*/}
      {/*  }}*/}
      {/*  onRequestClose={requestClose}*/}
      {/*  style={{*/}
      {/*    backgroundColor: "transparent",*/}
      {/*  }}*/}
      {/*  html={*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: "350px", // need to be the same as the maxWidth value listed here : https://atomiks.github.io/tippyjs/v5/all-props/*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <MyCustomACEEditor*/}
      {/*        width={"350px"}*/}
      {/*        value={value}*/}
      {/*        onChange={onChange}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  }*/}
      {/*></Tooltip>*/}
    </>
  );
}
