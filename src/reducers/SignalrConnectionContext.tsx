import { createContext } from "react";
import { HubConnection } from "@microsoft/signalr";
import { useLogInStatus } from "../hooks/useLogInStatus";
import { useRoom } from "../hooks/SignalR/useRoom";

export const SignalrConnectionContext = createContext<HubConnection | null>(
  null,
);

export function SignalrConnectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, userName] = useLogInStatus();
  const connection = useRoom({
    userName: userName,
    roomName: userName,
  });

  return (
    <SignalrConnectionContext.Provider value={connection}>
      {children}
    </SignalrConnectionContext.Provider>
  );
}
