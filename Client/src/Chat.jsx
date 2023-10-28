import { useEffect } from "react";
import { io } from "socket.io-client";

export default function Chat() {
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL);
    socket.on("connect", () => {
      console.log(socket.id);

      // receive a message from the Server
      socket.on("hello", (arg) => {
        console.log(arg);
      });

      // send a message to the server
      socket.emit("hi", "This is message was sent from the Client");
    });
    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return <div>Chat</div>;
}
