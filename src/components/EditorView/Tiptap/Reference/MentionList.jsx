import "./MentionList.css";

import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  useAppState,
  useGraph,
  useGraphDispatch,
} from "../../../../hooks/AppStateAndGraphAndUserhooks";
import { GraphActionType } from "../../../../reducers/GraphReducer";
import {
  ReferenceStateContext,
  ReferenceStateDispatchContext,
} from "./ReferenceStateContext";
import { ReferenceStateActionType } from "./ReferenceStateReducer";

export default forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const referenceMap = useContext(ReferenceStateContext);
  const referenceMapDispatch = useContext(ReferenceStateDispatchContext);

  const selectItem = (index) => {
    const item = props.items[index];
    const node = JSON.parse(item);
    //
    if (node) {
      props.command({ id: item });
      const sourceNode = props.editor.storage.mention.note;

      referenceMapDispatch({
        type: ReferenceStateActionType.addReference,
        reference: {
          sourceID: sourceNode.Id, //TODO : get the current node id somehow
          targetID: node.Id,
        },
      });

      // setReferenceMap((previousMap) => {
      //   var newMap = new Map(previousMap);
      //   if (!newMap.has(node.Id)) {
      //     newMap.set(node.Id, 1);
      //   } else {
      //     newMap.set(node.Id, 1 + newMap.get(node.Id));
      //   }
      //
      //   return newMap;
      // });
      //
      //   // TODO  : get the current node id from the graph state and then link the current node to the selected node

      //

      // graphDispatch({
      //   type: GraphActionType.addLink,
      //   link: {
      //     source: AppState.activeNodeID,
      //     target: node.Id,
      //   },
      // });
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

  // console.debug("items", JSON.stringify(props.items, null, 2));
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
            {JSON.parse(stringifiedNode).Title}
          </button>
        ))
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  );
});
