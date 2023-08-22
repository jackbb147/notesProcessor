import { useEffect } from "react";

export function useResizeObserverBugFix() {
  useEffect(() => {
    window.addEventListener("error", (e) => {
      // if (e.message === "ResizeObserver loop limit exceeded") {
      if (e.message.includes("ResizeObserver")) {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div",
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay",
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    });
  }, []);
}
