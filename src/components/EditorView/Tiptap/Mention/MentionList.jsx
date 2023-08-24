import "./styles.css";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  useAppState,
  useGraph,
  useGraphDispatch,
} from "../../../../hooks/AppStateAndGraphhooks";
import { GraphActionType } from "../../../../reducers/GraphReducer";

export default forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const graph = useGraph();
  const graphDispatch = useGraphDispatch();
  const AppState = useAppState();

  const selectItem = (index) => {
    const item = props.items[index];

    if (item) {
      // debugger;
      // TODO  : get the current node id from the graph state and then link the current node to the selected node
      props.command({ id: item });
      try {
        graphDispatch({
          type: GraphActionType.addLink,
          link: {
            source: AppState.activeNodeID,
            target: item.id,
          },
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length,
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="items">
      {props.items.length ? (
        props.items.map((item, index) => (
          <button
            className={`item ${index === selectedIndex ? "is-selected" : ""}`}
            key={index}
            onClick={() => selectItem(index)}
          >
            {/*TODO  change this to the actual name of the node
             */}
            {item.title}
          </button>
        ))
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  );
});
