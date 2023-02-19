import { createContext, useContext, useEffect, useRef, useState } from "react";
import useNextId from "../hooks/useNextId";

export const TalkContext = createContext();

export function TalkProvider({ children }) {
  const [currentTalkId, setCurrentTalkId] = useState(1);
  const [talkList, setTalkList] = useState(
    localStorage.getItem("talkList")
      ? JSON.parse(localStorage.getItem("talkList"))
      : [
          {
            id: 1,
            title: "New Title",
            otherName: "상대방",
            messages: [],
          },
        ]
  );

  const { getId: getTalkId } = useNextId(() => {
    const lastTalkId = talkList && talkList[talkList.length - 1]?.id;
    return lastTalkId !== undefined ? lastTalkId + 1 : 1;
  });

  const { getId: getMessageId, setId: setMessageId } = useNextId(() => {
    const currentTalkMessages =
      talkList && talkList.find((talk) => talk.id === currentTalkId)?.messages;

    return currentTalkMessages !== undefined
      ? currentTalkMessages[currentTalkMessages.length - 1]?.id + 1
      : 1;
  });

  // 재생용 메세지 배열
  const [messages_for_playback, setMessages_for_playback] = useState("");

  // 메세지가 추가될때마다 상태가 바뀌어 scrolldown이 발생하는 state, 값이 바뀌는 것 자체가 역할을한다.
  const [messagesScrollDown, setMessagesScrollDown] = useState(false);

  // * Talk 관련 코드들
  // talkList의 값이 변경될때마다 localStorage에 저장한다.
  useEffect(() => {
    localStorage.setItem("talkList", JSON.stringify(talkList));
  }, [talkList]);

  // 활성화중인 Talk가 변경되었을때 Talk의 '마지막 메세지.id + 1' 을 다음 id로 사용
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

  const createTalk = () => {
    const id = getTalkId();
    setTalkList([
      ...talkList,
      { id: id, title: "New Talk", otherName: "상대방", messages: [] },
    ]);
  };

  const removeTalk = (id) => {
    setTalkList(talkList.filter((talk) => talk.id !== id));
  };

  const updateTalkTitle = (id, title) => {
    setTalkList(
      talkList.map((talk) =>
        talk.id === id ? { ...talk, title: title } : talk
      )
    );
  };

  const activateTalk = (id) => {
    setCurrentTalkId(id);
  };

  // * Message 관련 코드들
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
    setMessagesScrollDown((prev) => !prev);
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

  const updateOtherName = (name) => {
    setTalkList(
      talkList.map((talk) => {
        if (talk.id === currentTalkId) {
          return { ...talk, otherName: name };
        }
        return talk;
      })
    );
  };

  // * 재생할 Message 관련 코드들
  const fillMessages_for_playback = (message) => {
    setMessages_for_playback((prev) => [...prev, message]);
  };

  const resetMessages_for_playback = () => {
    setMessages_for_playback("");
  };

  const getCurrentTalkMessages = () => {
    return talkList.find((talk) => talk.id === currentTalkId).messages;
  };

  return (
    <TalkContext.Provider
      value={{
        // talk
        talkList,
        setTalkList,
        currentTalkId,
        setCurrentTalkId,
        createTalk,
        removeTalk,
        updateTalkTitle,
        activateTalk,

        // message
        addMessage,
        removeMessage,
        updateMessage,
        messagesScrollDown,
        updateOtherName,

        // 재생용 message
        messages_for_playback,
        fillMessages_for_playback,
        resetMessages_for_playback,
        getCurrentTalkMessages,
      }}
    >
      {children}
    </TalkContext.Provider>
  );
}
