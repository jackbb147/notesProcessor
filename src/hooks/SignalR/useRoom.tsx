import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useEffect, useState } from "react";

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
  userName: string;
  roomName: string;
}) {
  const [connection, setConnection] = useState<HubConnection>();
  const [updateNeeded, setUpdateNeeded] = useState<number>(0);
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
        setUpdateNeeded((updateNeeded) => updateNeeded + 1);
      });

      connection.on("RecoveredNote", (user, noteId) => {
        // alert(`Recovered note: ${noteId}`);
        console.log(`Recovered note: ${noteId}`);
        // apiSlice.endpoints.getNotes.invalidateTags(["notes"]);
        setUpdateNeeded((updateNeeded) => updateNeeded + 1);
      });

      // TODO

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (e) {
      alert(JSON.stringify(e, null, 2));
    }
  };

  useEffect(() => {
    if (userName && roomName) {
      joinRoom(userName, roomName);
    }
  }, [userName, roomName]);

  return [connection, updateNeeded];
}
