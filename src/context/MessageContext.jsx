import { createContext, useState } from "react";

export const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [messages, setMessages] = useState([
    { text: "안녕", owner: "mine", image: "" },
    { text: "안녕하신가", owner: "other", image: "" },
    { text: "안녕하신가", owner: "other", image: "" },
    { text: "안녕하신가ㅎㅎ", owner: "other", image: "" },
  ]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
}
