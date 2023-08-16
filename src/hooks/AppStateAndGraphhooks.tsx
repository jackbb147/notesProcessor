import { useContext } from "react";
import {
  AppStateContext,
  AppStateDispatchContext,
} from "../reducers/AppStateContext";
import { GraphContext, GraphDispatchContext } from "../reducers/GraphContext";

export function useAppState() {
  var state = useContext(AppStateContext);

  if (state === null) throw Error("state is null. ");

  return state;
}

export function useDispatch() {
  var dispatch = useContext(AppStateDispatchContext);
  if (dispatch === null) throw Error("dispatch is null. ");
  return dispatch;
}

export function useGraph() {
  var graph = useContext(GraphContext);
  if (graph === null) throw Error("graph is null. ");
  return graph;
}

export function useGraphDispatch() {
  var graphDispatch = useContext(GraphDispatchContext);
  if (graphDispatch === null) throw Error("graphDispatch is null. ");
  return graphDispatch;
}
