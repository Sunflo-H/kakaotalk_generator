import { createContext, useEffect, useState } from "react";
import useNextId from "../hooks/useNextId";

export const MessageContext = createContext();
export const TalkContext = createContext();

export function TalkProvider({ children }) {
  const [id, setNextId] = useNextId();
  const [talkList, setTalkList] = useState([
    {
      title: "조보아",
      id: 1,
      messages: [
        {
          text: "안녕안녕안녕안녕",
          owner: "mine",
          image: "",
          id: 1,
        },
        { text: "우히", owner: "other", image: "", id: 2 },
        { text: "쿠쿠루삥뽕", owner: "mine", image: "", id: 3 },
      ],
    },
    {
      title: "백종원",
      id: 2,
      messages: [
        {
          text: "안녕안녕안녕안녕",
          owner: "mine",
          image: "",
          id: 1,
        },
        { text: "우히", owner: "other", image: "", id: 2 },
        { text: "쿠쿠루삥뽕", owner: "mine", image: "", id: 3 },
      ],
    },
  ]);
  // const [activatedTalkId, setActivatedTalkId] = useState(talkList[0]?.id);
  const [activatedTalkId, setActivatedTalkId] = useState(1);

  const activateTalk = (id) => {
    setActivatedTalkId(id);
  };

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

  const addMessage = (data, owner, type) => {
    if (type === "text") {
      const text = data;
      const message = { id: id, text: text, owner: owner, image: "" };
      setTalkList([
        ...talkList.map((talk) => {
          //토크 리스트에서 활성화된 토크를 찾아서 메세지를 추가해
          let result =
            talk.id === activatedTalkId
              ? {
                  ...talk,
                  messages: [...messages, message],
                }
              : talk;
          return result;
        }),
      ]);

      // setMessages([
      //   ...messages,
      //   { id: id, text: text, owner: owner, image: "" },
      // ]);
    } else {
      const image = data;
      setMessages([
        ...messages,
        { id: id, text: "", owner: owner, image: image },
      ]);
    }
    setNextId();
  };

  useEffect(() => {}, [talkList]);

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
        talkList,
        setTalkList,
        activatedTalkId,
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
