import { Tooltip } from "react-tippy";
import AceEditor from "react-ace";
import MathView from "./MathView";
import { MyCustomACEEditor } from "./Tiptap/MathEditor/InlineMathEditorComponent";
import {
  AppStateContext,
  AppStateProvider,
} from "../../reducers/AppStateContext";
import { useRef, useState } from "react";
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
export function TippedMath({ value, onChange, showTooltip, requestClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  // Merge all the interactions into prop getters
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
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <MyCustomACEEditor
              // width={"350px"}
              value={value}
              onChange={onChange}
            />
          </div>
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
