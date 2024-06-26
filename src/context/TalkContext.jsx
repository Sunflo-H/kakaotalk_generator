import { createContext, useCallback, useEffect, useState } from "react";
import useNextId from "../hooks/useNextId";

export const TalkContext = createContext();

/**
 *
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

  /**
   * 마지막 talkId를 찾아 다음에 올 talkId를 구한다.
   */
  const { id: talkId, setId: setTalkId } = useNextId(getNextTalkId());

  function getNextTalkId() {
    const lastTalkId = talkList && talkList[talkList.length - 1]?.id;
    return lastTalkId !== undefined ? lastTalkId + 1 : 1;
  }

  // * Talk 관련 코드들
  // talkList의 값이 변경될때마다 localStorage에 저장한다.
  useEffect(() => {
    localStorage.setItem("talkList", JSON.stringify(talkList));
  }, [talkList]);

  // 다른 Talk로 변경되었을때 Talk의 '마지막 메세지.id + 1' 을 다음 메세지 id로 사용
  useEffect(() => {
    setMessageId(() => {
      const currentTalkMessages =
        talkList &&
        talkList.find((talk) => talk.id === currentTalkId)?.messages;

      return currentTalkMessages && currentTalkMessages.length !== 0
        ? currentTalkMessages[currentTalkMessages.length - 1]?.id + 1
        : 1;
    });
  }, [currentTalkId]);

  const createTalk = () => {
    const newTalk = {
      id: talkId,
      title: "New Talk",
      otherName: "상대방",
      messages: [],
    };
    setTalkId(talkId + 1);
    setTalkList([...talkList, newTalk]);
  };

  const removeTalk = (id) => {
    setTalkList(talkList.filter((talk) => talk.id !== id));
    setCurrentTalkId(null);
  };

  const updateTalkTitle = (id, title) => {
    setTalkList(
      talkList.map((talk) =>
        talk.id === id ? { ...talk, title: title } : talk
      )
    );
  };

  const activeTalk = (id) => {
    setCurrentTalkId(id);
  };

  // * Message 관련 코드들
  /**
   * 현재 talk의 마지막 message Id를 찾아 다음에 올 message Id를 구한다.
   */
  const { id: messageId, setId: setMessageId } = useNextId(getNextMessageId());

  function getNextMessageId() {
    const currentTalkMessages =
      talkList && talkList.find((talk) => talk.id === currentTalkId)?.messages;
    return currentTalkMessages && currentTalkMessages.length !== 0
      ? currentTalkMessages[currentTalkMessages.length - 1]?.id + 1
      : 1;
  }

  const addMessage = (data, owner, type) => {
    setMessageId(messageId + 1);
    let newMessage =
      type === "text"
        ? { id: messageId, text: data, owner: owner, image: "" }
        : { id: messageId, text: "", owner: owner, image: data };

    setTalkList(
      talkList.map((talk) =>
        talk.id === currentTalkId
          ? {
              ...talk,
              messages: [...talk.messages, newMessage],
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
  // 재생용 메세지 배열
  const [messages_for_playback, setMessages_for_playback] = useState("");

  const fillMessages_for_playback = (message) => {
    setMessages_for_playback((prev) => [...prev, message]);
  };

  const resetMessages_for_playback = () => {
    setMessages_for_playback("");
  };

  const getActiveTalkMessages = () => {
    return talkList.find((talk) => talk.id === currentTalkId).messages;
  };

  // * drag and drop 관련 코드
  /**
   * drag and drop으로 바뀐 위치정보를 talkList에 저장한다.
   */
  const setMessagesPositionToTalkList = useCallback((dropableSpace) => {
    const nodeListToArr = [...dropableSpace.children];
    const idArr = nodeListToArr.map(
      (item) => item.firstChild.dataset.messageid
    );

    // 바뀐 메세지순서를 실제 데이터에도 적용
    setTalkList(
      talkList.map((talk) => {
        if (talk.id === currentTalkId) {
          const resultMessages = [];
          idArr.forEach((id) => {
            const findMessage = talk.messages.find(
              (message) => message.id === Number(id)
            );
            resultMessages.push(findMessage);
          });
          return { ...talk, messages: resultMessages };
        }
        return talk;
      })
    );
  });

  return (
    <TalkContext.Provider
      value={{
        //* talk
        talkList,
        currentTalkId,
        createTalk,
        removeTalk,
        updateTalkTitle,
        activeTalk,

        //* message
        addMessage,
        removeMessage,
        updateMessage,
        updateOtherName,

        //* 재생용 message
        messages_for_playback,
        fillMessages_for_playback,
        resetMessages_for_playback,
        getActiveTalkMessages,

        //* drag and drop
        setMessagesPositionToTalkList,
      }}
    >
      {children}
    </TalkContext.Provider>
  );
}
