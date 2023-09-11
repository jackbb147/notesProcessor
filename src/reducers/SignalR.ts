import { HubConnection } from "@microsoft/signalr";

export interface SignalRState {
  connection: HubConnection | null;
  updateNeeded: number;
  roomName: string | null;
}

export enum SignalRActionTypes {
  setConnection,
  setUpdateNeeded,
  setRoomName,
}

export type SignalRAction =
  | { type: SignalRActionTypes.setConnection; payload: HubConnection }
  | { type: SignalRActionTypes.setUpdateNeeded; payload: number }
  | { type: SignalRActionTypes.setRoomName; payload: string };

const initialState: SignalRState = {
  connection: null as HubConnection | null,
  updateNeeded: 0,
  roomName: null,
};

export function SignalrReducer(state = initialState, action: any) {
  switch (action.type) {
    case SignalRActionTypes.setConnection: {
      return {
        ...state,
        connection: action.payload,
      };
    }
    case SignalRActionTypes.setUpdateNeeded: {
      return {
        ...state,
        updateNeeded: action.payload,
      };
    }

    case SignalRActionTypes.setRoomName: {
      return {
        ...state,
        roomName: action.payload,
      };
    }

    default:
      return state;
  }
}
