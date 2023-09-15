/**
 * All credit for the following code belongs to:
 * https://stackoverflow.com/a/42234988/21646295
 */

import React, { useEffect, useRef } from "react";

function useOutsideAlerter(
  ref: any,
  callback: (event: MouseEvent) => any,
  condition: (me: Element, target: EventTarget | null) => any = () => {},
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        condition(ref.current, event.target)
      ) {
        // console.log("You clicked outside of me!");
        callback(event);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter({
  callback,
  children,
  condition = () => {},
}: {
  callback: (event: MouseEvent) => any;
  children: React.ReactNode;
  condition?: (me: Element, target: EventTarget | null) => any;
}) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, callback, condition);

  return <div ref={wrapperRef}>{children}</div>;
}
