import { createContext, useState } from "react";

export const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [id, setId] = useState(1);
  const [messages, setMessages] = useState([
    {
      text: "안녕안녕안녕안녕",
      owner: "mine",
      image: "",
      id: 1,
    },
    { text: "우히", owner: "other", image: "", id: 2 },
    { text: "쿠쿠루삥뽕", owner: "mine", image: "", id: 3 },
  ]);
  const [messages_to_play, setMessages_to_play] = useState("");

  const addMessage = (text, owner) => {
    setMessages([...messages, { id: id, text: text, owner: owner, image: "" }]);
    setId(id + 1);
  };

  const removeMessage = (id) => {
    let confirm = window.confirm("정말 삭제하시겠습니까?");
    confirm && setMessages(messages.filter((message) => message.id !== id));
  };

  const updateMessage = (id, input) => {
    setMessages(
      messages.map((message) =>
        message.id === id ? { ...message, text: input } : message
      )
    );
  };

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
        addMessage,
        removeMessage,
        updateMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
