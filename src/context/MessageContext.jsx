import { createContext, useState } from "react";

export const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [messages, setMessages] = useState([
    { text: "안녕", owner: "my-message", image: "" },
    { text: "안녕하신가", owner: "other-message", image: "" },
    { text: "안녕하신가", owner: "other-message", image: "" },
    { text: "쿠쿠루삥뽕", owner: "my-message", image: "" },
  ]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
}
