import { createContext, useContext, useEffect, useState } from "react";
import useNextId from "../hooks/useNextId";

export const TalkContext = createContext();

export function TalkProvider({ children }) {
  const [currentTalkId, setCurrentTalkId] = useState(2);
  const [talkList, setTalkList] = useState([
    {
      title: "조보아",
      id: 1,
      messages: [
        {
          text: "조보아씨",
          owner: "mine",
          image: "",
          id: 1,
        },
      ],
    },
    {
      title: "백종원",
      id: 2,
      messages: [
        {
          text: "백종원씨",
          owner: "mine",
          image: "",
          id: 1,
        },
        { text: "우히", owner: "other", image: "", id: 2 },
        { text: "쿠쿠루삥뽕", owner: "mine", image: "", id: 3 },
      ],
    },
  ]);

  const { getId: getTalkId } = useNextId(talkList[talkList.length - 1]?.id + 1);
  const { getId: getMessageId } = useNextId(() => {
    const currentTalkMessages = talkList.find(
      (talk) => talk.id === currentTalkId
    ).messages;
    return currentTalkMessages[currentTalkMessages.length - 1].id + 1;
  });

  const [messages_for_playback, setMessages_for_playback] = useState("");

  const getCurrentTalkMessages = () => {
    return talkList.find((talk) => talk.id === currentTalkId).messages;
  };

  const addMessage = (data, owner, type) => {
    const id = getMessageId();
    if (type === "text") {
      const text = data;
      const message = { id: id, text: text, owner: owner, image: "" };
      setTalkList([
        ...talkList.map((talk) => {
          //토크 리스트에서 활성화된 토크를 찾아서 메세지를 추가한다
          let result =
            talk.id === currentTalkId
              ? {
                  ...talk,
                  messages: [...talk.messages, message],
                }
              : talk;
          return result;
        }),
      ]);
    } else {
      const image = data;
      const message = { id: id, text: "", owner: owner, image: image };
      setTalkList([
        ...talkList.map((talk) => {
          //토크 리스트에서 활성화된 토크를 찾아서 메세지를 추가한다
          let result =
            talk.id === currentTalkId
              ? {
                  ...talk,
                  messages: [...talk.messages, message],
                }
              : talk;
          return result;
        }),
      ]);
    }
  };

  useEffect(() => {}, [talkList]);

  const removeMessage = (id) => {
    let confirm = window.confirm("정말 삭제하시겠습니까?");
    // confirm && setMessages(messages.filter((message) => message.id !== id));
  };

  const updateMessage = (id, input) => {
    // setMessages(
    //   messages.map((message) =>
    //     message.id === id ? { ...message, text: input } : message
    //   )
    // );
  };

  const fillMessages_for_playback = (message) => {
    setMessages_for_playback((prev) => [...prev, message]);
  };

  const resetMessages_for_playback = () => {
    setMessages_for_playback("");
  };

  const createTalk = () => {
    const id = getTalkId();
    setTalkList([...talkList, { title: "New Talk", id: id, messages: [] }]);
  };

  const removeTalk = (id) => {
    setTalkList(talkList.filter((talk) => talk.id !== id));
  };

  const updateTalkTitle = (id, title) => {
    console.log(id, title);
    setTalkList(
      talkList.map((talk) => {
        // (talk.id === id ? (talk.title = title) : talk)

        if (talk.id === id) {
          talk.title = title;
        }

        return talk;
      })
    );
  };

  const activateTalk = (id) => {
    setCurrentTalkId(id);
  };

  return (
    <TalkContext.Provider
      value={{
        talkList,
        setTalkList,
        currentTalkId,
        setCurrentTalkId,
        getCurrentTalkMessages,
        createTalk,
        removeTalk,
        updateTalkTitle,
        activateTalk,
        // messages,
        // setMessages,
        messages_for_playback,
        fillMessages_for_playback,
        resetMessages_for_playback,
        addMessage,
        removeMessage,
        updateMessage,
      }}
    >
      {children}
    </TalkContext.Provider>
  );
}
