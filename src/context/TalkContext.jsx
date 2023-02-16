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

  const { getId: getTalkId } = useNextId(() => {
    const lastTalkId = talkList[talkList.length - 1]?.id;
    return lastTalkId !== undefined ? lastTalkId + 1 : 1;
  });
  const { getId: getMessageId } = useNextId(() => {
    const currentTalkMessages = talkList.find(
      (talk) => talk.id === currentTalkId
    )?.messages;
    return currentTalkMessages !== undefined
      ? currentTalkMessages[currentTalkMessages.length - 1]?.id + 1
      : 1;
  });

  const [messages_for_playback, setMessages_for_playback] = useState("");

  const getCurrentTalkMessages = () => {
    return talkList.find((talk) => talk.id === currentTalkId).messages;
  };

  const addMessage = (data, owner, type) => {
    const id = getMessageId();
    let message =
      type === "text"
        ? { id: id, text: data, owner: owner, image: "" }
        : { id: id, text: "", owner: owner, image: data };

    setTalkList(
      talkList.map((talk) =>
        talk.id === currentTalkId
          ? {
              ...talk,
              messages: [...talk.messages, message],
            }
          : talk
      )
    );
  };

  /**
   * todo Messages 에서 talkList로 바뀐거 이제 messages만 남은듯 하자!
   * todo 그리고 저장소 localStorage하면 끝?
   * @param {*} id
   */
  const removeMessage = (id_to_remove) => {
    let confirm = window.confirm("정말 삭제하시겠습니까?");
    confirm &&
      setTalkList(
        talkList.map((talk) =>
          talk.id === currentTalkId
            ? {
                ...talk,
                messages: talk.messages.filter(
                  (message) => message.id !== id_to_remove
                ),
              }
            : talk
        )
      );
  };

  window.addEventListener("click", () => {
    console.log(talkList);
  });

  const updateMessage = (id_to_update, data) => {
    setTalkList(
      talkList.map((talk) =>
        talk.id === currentTalkId
          ? {
              ...talk,
              messages: talk.messages.map((message) =>
                message.id === id_to_update
                  ? { ...message, text: data }
                  : message
              ),
            }
          : talk
      )
    );
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
      talkList.map((talk) =>
        talk.id === id ? { ...talk, title: title } : talk
      )
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
