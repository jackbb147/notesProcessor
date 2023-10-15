import style from "../../ScrollableButHiddenScrollBar.module.css";
import React, { useContext } from "react";
import { Desktop } from "../../../hooks/useMediaQuery";
import {
  AppStateContext,
  AppStateDispatchContext,
} from "../../../reducers/AppStateContext";
import { Button } from "../../ui/Button";
import { GraphActionType, GraphNode } from "../../../reducers/GraphReducer";
import { AppActionType, Collections } from "../../../reducers/AppStateReducer";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ListItem } from "../../Buttons/ListItem";
import {
  GraphContext,
  GraphDispatchContext,
} from "../../../reducers/GraphContext";
import { animated, useTransition } from "@react-spring/web";
import { AnimatedListItem } from "../../Buttons/AnimatedListItem";
import { useSpring, Transition } from "@react-spring/web";
import {
  useAppDispatch,
  useAppState,
} from "../../../hooks/AppStateAndGraphAndUserhooks";
import { DeleteButton } from "../../Buttons/DeleteButton";
import { ToggleNotesPanelButton } from "../../Buttons/ToggleNotesPanelButton";
import { useSwipeable } from "react-swipeable";
import { SearchBar } from "../../SearchBar/SearchBar";

const NoNotesDisplayID = "none";
const MyComponent = (styles: any) => <div style={styles}>hello</div>;

interface ReactNodeWithID {
  node: React.ReactNode;
  id: string;
}

function AnimatedList({ data }: { data: ReactNodeWithID[] }) {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const transitions = useTransition(data, {
    from: (item) => ({ opacity: 0, transform: "scale(0)" }),
    enter: (item) =>
      item.id === NoNotesDisplayID
        ? {
            opacity: 1,
            transform: "scale(1)",
            position: "absolute",
            top: "0",
            maxHeight: "100%",
            height: "100%",
            width: "100%",
          }
        : { opacity: 1, transform: "scale(1)", maxHeight: "500px" },
    leave: (item) => ({ opacity: 0, transform: "scale(0)", maxHeight: "0" }),
    keys: (item) => item.id,
  });

  return transitions((style, node) => (
    <animated.div style={style}>{node.node}</animated.div>
  ));
}

export function NotesPanelContent({
  collection,
  topBarButtons,
  rootStyle,
}: {
  collection: GraphNode[];
  topBarButtons?: React.ReactNode[];
  rootStyle?: React.CSSProperties;
}) {
  const state = useContext(AppStateContext);
  const dispatch = useContext(AppStateDispatchContext);
  const graph = useContext(GraphContext);
  const graphDispatch = useContext(GraphDispatchContext);
  if (state === null || dispatch === null)
    throw Error("state or dispatch is null. ");
  if (graph === null || graphDispatch === null)
    throw Error("graph or graphDispatch is null. ");

  const handlers = useSwipeable({
    onSwipedRight: (eventData) => {
      console.log("User Swiped!", eventData);
      dispatch({ type: AppActionType.openLabelPanel });
    },
    // ...config,
  });

  function handleKeyDown(e: React.KeyboardEvent) {
    if (graph === null) return;
    if (dispatch === null) return;
    if (state === null) return;
    if (collection.length < 2) return;

    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

    let index = collection.findIndex((node) => node.Id === state.activeNodeID);

    let nextID;
    if (e.key === "ArrowDown")
      nextID = collection[(index + 1) % collection.length].Id;
    else
      nextID =
        index - 1 >= 0
          ? collection[(index - 1) % collection.length].Id
          : collection[collection.length - 1].Id;

    dispatch({
      type: AppActionType.setActiveNodeID,
      id: nextID,
    });
  }

  function buildOptionalText(node: GraphNode): string {
    if (!node.DateLastModified) return "";
    const dateLastModified = new Date(node.DateLastModified);

    let hour = dateLastModified.getHours();
    let minute = dateLastModified.getMinutes();
    const date = dateLastModified.getDate();
    const month = dateLastModified.getMonth() + 1;
    const year = dateLastModified.getFullYear();
    let PM = false;
    var res = "";

    if (hour >= 12) {
      PM = true;
      hour %= 12;
    }

    res += hour.toString();
    res += ":";
    if (minute < 10) res += "0";
    res += minute.toString();
    if (PM) res += "PM";
    else res += "AM";
    res += ` ${month}/${date}/${year}`;
    return res;
  }

  return (
    <>
      <div
        className={"w-full h-full flex flex-col-reverse md:flex-col"}
        style={{
          ...rootStyle,
        }}
        {...handlers}
      >
        <div className={"top-bar h-12 flex items-center"}>
          {topBarButtons || (
            <>
              <ToggleNotesPanelButton />
              {state.showNotesPanel && (
                <>
                  <Button
                    icon={
                      <span className="material-symbols-outlined">
                        grid_view
                      </span>
                    }
                  ></Button>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      // border: "1px solid",
                      marginLeft: "auto",
                      width: "80%",
                      paddingLeft: "1rem",
                    }}
                  >
                    <SearchBar />
                    <DeleteButton />
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div
          className={`w-full h-full overflow-scroll relative ${style.ScrollableButHiddenScrollBar} `}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <AnimatedList
            data={
              collection.length > 0
                ? collection.map((node) => {
                    return {
                      node: (
                        <ListItem
                          text={node.Title}
                          boldText={true}
                          active={node.Id === state.activeNodeID}
                          optionalText={buildOptionalText(node)}
                          style={{
                            // height: "3rem",
                            // border: "1px solid",
                            marginBottom: ".4rem",
                            borderBottom: ".7px solid grey",
                          }}
                          icon={
                            <span
                              className="material-symbols-outlined"
                              style={
                                {
                                  // fontSize: "2rem",
                                }
                              }
                            >
                              article
                            </span>
                          }
                          iconOnly={!state.showNotesPanel}
                          onClick={() =>
                            dispatch({
                              type: AppActionType.setActiveNodeID,
                              id: node.Id,
                            })
                          }
                        />
                      ),
                      id: node.Id,
                    };
                  })
                : [
                    {
                      node: (
                        <div
                          className={
                            "flex flex-col items-center justify-center w-full h-full"
                          }
                        >
                          No Notes
                        </div>
                      ),
                      id: NoNotesDisplayID,
                    },
                  ]
            }
          />
        </div>
      </div>
    </>
  );
}
