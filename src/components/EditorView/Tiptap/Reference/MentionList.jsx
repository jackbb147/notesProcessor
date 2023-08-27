import "./MentionList.css";

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
    const node = JSON.parse(item);
    // debugger;
    if (node) {
      props.command({ id: item });
      //   // debugger;
      //   // TODO  : get the current node id from the graph state and then link the current node to the selected node

      //
      graphDispatch({
        type: GraphActionType.addLink,
        link: {
          source: AppState.activeNodeID,
          target: node.id,
        },
      });
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
        props.items.map((stringifiedNode, index) => (
          <button
            className={`item ${index === selectedIndex ? "is-selected" : ""}`}
            key={index}
            onClick={() => selectItem(index)}
          >
            {/*TODO  change this to the actual name of the node
             */}
            {/*{"hello world!"}*/}
            {JSON.parse(stringifiedNode).title}
          </button>
        ))
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  );
});
