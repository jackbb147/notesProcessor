import React, { useRef, useState } from "react";
import { useLongPress } from "use-long-press";

export function ContentContainer({
  onSingleClick,
  onDoubleClick,
  onLongPress,
  onFinishLongPress,
  children,
}: {
  onSingleClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  onDoubleClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  onLongPress?: () => void;
  onFinishLongPress?: () => void;
  children: React.ReactNode;
}) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [className, setClassName] = useState<"NoPointerEvents" | "">("");
  // useDoubleClick(
  //     {
  //       ref: buttonRef,
  //   onSingleClick: onSingleClick??(()=>{}),
  //   onDoubleClick: onDoubleClick??(()=>{}),
  // })
  const bind = useLongPress(
    () => {
      // alert('Long pressed!');
      onLongPress?.();
    },
    {
      threshold: 200,
      cancelOnMovement: true,
      onStart: () => {
        setClassName("NoPointerEvents");
      },
      onFinish: () => {
        // https://stackoverflow.com/a/20290312/21646295
        window.addEventListener(
          "click",
          function captureClick(e) {
            e.stopPropagation(); // Stop the click from being propagated.
            console.log("click captured");
            window.removeEventListener("click", captureClick, true); // cleanup
          },
          true,
        );
      },
    },
  );
  return (
    <div
      className={`content`}
      {...bind()}
      ref={buttonRef}
      tabIndex={1}
      // onFocus={()=>{
      //   alert("FOCUSED")
      // }}
      // onTouchStart={()=>{alert("touched")}}

      // onDoubleClick={()=>{
      //   alert("HEY!")
      //   setDisableDraggable(true);
      // }}
      // onClick={()=>{
      //      onSingleClick?.(null as any)
      // }}
    >
      {children}
    </div>
  );
}
