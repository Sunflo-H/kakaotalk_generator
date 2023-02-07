import { createContext, useState } from "react";

export const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [messages, setMessages] = useState([
    { text: "안녕", owner: "my-message", image: "" },
    { text: "안녕하신가", owner: "other-message", image: "" },
    { text: "쿠쿠루삥뽕", owner: "my-message", image: "" },
  ]);

  const [messages_to_play, setMessages_to_play] = useState("");

  const fillMessages_to_play = (message) => {
    /**
     * 메세지를 반복하면서 재생할메세지를 채워
     */
    setMessages_to_play((prev) => [...prev, message]);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        messages_to_play,
        setMessages_to_play,
        fillMessages_to_play,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
