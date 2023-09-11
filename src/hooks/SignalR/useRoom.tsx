import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignalRActionTypes } from "../../reducers/SignalR";
import { RootState, AppDispatch } from "../../store";

/**
 * This hook is used to join a SignalR room.
 * @param userName The username.
 * @param roomName The room name. Note that users with the same room name will be in the same room.
 * If room name is the same as username, then a user logged in on multiple devices will be in the same room.
 */
export function useRoom({
  userName,
  roomName,
}: {
  userName: string | null;
  roomName: string | null;
}) {
  const updatedNeeded = useSelector(
    (state: RootState) => state.signalr.updateNeeded,
  );
  const dispatch: AppDispatch = useDispatch();
  // const [connection, setConnection] = useState<HubConnection>();
  // const [updateNeeded, setUpdateNeeded] = useState<number>(0);
  const joinRoom = async (user: string, room: string) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        // alert(`Message received: ${message}`);
        console.log(`Message received: ${message}`);
      });

      connection.on("DeletedNote", (user, noteId) => {
        // alert(`Deleted note: ${noteId}`);
        console.log(`Deleted note: ${noteId}`);
        // apiSlice.endpoints.getNotes.invalidateTags(["notes"]);
        // setUpdateNeeded((updateNeeded) => updateNeeded + 1);
        dispatch({
          type: SignalRActionTypes.incrementUpdateNeeded,
        });
      });

      connection.on("AddedNote", (user, noteId) => {
        // alert(`Deleted note: ${noteId}`);
        console.log(`added note: ${noteId}`);
        // apiSlice.endpoints.getNotes.invalidateTags(["notes"]);
        // setUpdateNeeded((updateNeeded) => updateNeeded + 1);
        dispatch({
          type: SignalRActionTypes.incrementUpdateNeeded,
        });
      });

      connection.on("RecoveredNote", (user, noteId) => {
        // alert(`Recovered note: ${noteId}`);
        console.log(`Recovered note: ${noteId}`);
        // apiSlice.endpoints.getNotes.invalidateTags(["notes"]);
        // setUpdateNeeded((updateNeeded) => updateNeeded + 1);
        dispatch({
          type: SignalRActionTypes.incrementUpdateNeeded,
        });
      });

      // TODO

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      // setConnection(connection);
      dispatch({
        type: SignalRActionTypes.setConnection,
        connection: connection,
      });
    } catch (e) {
      alert(JSON.stringify(e, null, 2));
    }
  };

  useEffect(() => {
    if (userName && roomName) {
      joinRoom(userName, roomName);
    }
  }, [userName, roomName]);

  // return [connection, updateNeeded];
}
