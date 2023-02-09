import { createContext, useState } from "react";

export const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [messages, setMessages] = useState([
    {
      text: "안녕안녕안녕안녕",
      owner: "my-message",
      image: "",
    },
    { text: "우히", owner: "other-message", image: "" },
    { text: "쿠쿠루삥뽕", owner: "my-message", image: "" },
  ]);

  const [messages_to_play, setMessages_to_play] = useState("");

  const fillMessages_to_play = (message) => {
    setMessages_to_play((prev) => [...prev, message]);
  };

  const resetMessages_to_play = () => {
    setMessages_to_play("");
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        messages_to_play,
        fillMessages_to_play,
        resetMessages_to_play,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
