import { createContext, useContext, useEffect, useRef, useState } from "react";
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

  const [messages_for_playback, setMessages_for_playback] = useState("");
  const [messagesScrollDown, setMessagesScrollDown] = useState(false); // 메세지가 추가될때마다 상태가 바뀌어 scrolldown이 발생하는 state, 값은 중요하지 않다.

  useEffect(() => {
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

  // const getCurrentTalkMessages = () => {
  //   return talkList.find((talk) => talk.id === currentTalkId).messages;
  // };

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

  return (
    <TalkContext.Provider
      value={{
        talkList,
        setTalkList,
        currentTalkId,
        setCurrentTalkId,
        createTalk,
        removeTalk,
        updateTalkTitle,
        activateTalk,
        messages_for_playback,
        fillMessages_for_playback,
        resetMessages_for_playback,
        addMessage,
        removeMessage,
        updateMessage,
        messagesScrollDown,
        updateOtherName,
      }}
    >
      {children}
    </TalkContext.Provider>
  );
}
