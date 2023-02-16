import { createContext, useContext, useEffect, useState } from "react";
import useNextId from "../hooks/useNextId";

export const TalkContext = createContext();

/**
 * todo
 * 1. 로컬 저장소
 * 2. 이미지의 수정, 삭제
 * 3. 메세지의 위치 변경
 * 4. 메세지의 스크롤
 * 5. 재생할때 음성은 되는데 화면이 안나옴
 */

export function TalkProvider({ children }) {
  const [currentTalkId, setCurrentTalkId] = useState(2);
  const [talkList, setTalkList] = useState(() => {
    if (localStorage.getItem("talkList")) {
      return JSON.parse(localStorage.getItem("talkList"));
    } else
      return [
        {
          title: "New Title",
          id: 1,
          messages: [],
        },
      ];
  });

  const { getId: getTalkId } = useNextId(() => {
    const lastTalkId = talkList && talkList[talkList.length - 1]?.id;
    return lastTalkId !== undefined ? lastTalkId + 1 : 1;
  });

  const {
    getId: getMessageId,
    setId: setMessageId,
    id: mID,
  } = useNextId(() => {
    const currentTalkMessages =
      talkList && talkList.find((talk) => talk.id === currentTalkId)?.messages;

    return currentTalkMessages !== undefined
      ? currentTalkMessages[currentTalkMessages.length - 1]?.id + 1
      : 1;
  });

  const [messages_for_playback, setMessages_for_playback] = useState("");

  useEffect(() => {
    //* 로컬저장소
    //* useState랑 useEffect 타이밍이 어떻게 되는거지?
    localStorage.setItem("talkList", JSON.stringify(talkList));
  }, [talkList]);

  useEffect(() => {
    setMessageId(() => {
      const currentTalkMessages =
        talkList &&
        talkList.find((talk) => talk.id === currentTalkId)?.messages;

      if (currentTalkMessages === undefined) return 1;
      else
        return currentTalkMessages.length !== 0
          ? currentTalkMessages[currentTalkMessages.length - 1]?.id + 1
          : 1;
    });
  }, [currentTalkId]);

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
