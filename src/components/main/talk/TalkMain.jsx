import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { TalkContext } from "../../../context/TalkContext";
import { TalkPlayerContext } from "../../../context/TalkPlayerContext";
import styles from "../../../css/talk/TalkMain.module.css";
import Message from "./Message";

export default function TalkMain() {
  const { isPlay } = useContext(TalkPlayerContext);
  const {
    setTalkList,
    talkList,
    currentTalkId,
    messages_for_playback,
    messagesScrollDown,
  } = useContext(TalkContext);
  const ulRef = useRef();

  const currentTalk =
    talkList && talkList.find((talk) => talk.id === currentTalkId);

  const list = ulRef;

  let currentItemIndex = null;
  let currentItem = null;

  const handleDragStart = (e) => {
    currentItem = e.target;

    const listArr = [...currentItem.parentElement.children];
    currentItemIndex = listArr.indexOf(currentItem);
  };

  const handleDragOver = (e) => {
    const currentOverItem = e.target;
    if (
      currentOverItem.parentElement === list.current ||
      currentOverItem.parentElement.parentElement === list.current ||
      currentOverItem.parentElement.parentElement.parentElement === list.current
    )
      e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    changeMessagesPosition(e);
    changedMessagesPositionSetTalkList();
  };

  const changeMessagesPosition = (e) => {
    let currentDropItem = e.target;
    const listArr = [...currentItem.parentElement.children];
    let dropItemIndex = listArr.indexOf(currentDropItem); // 이게 -1이 아니면 그대로, -1이면 바꿔야해

    // <li></li> 안의 요소들이 드롭하는 곳일때 부모(원래 드롭할장소인 li)로 바꿔준다.
    if (dropItemIndex === -1) {
      currentDropItem = e.target.parentElement;
      dropItemIndex = listArr.indexOf(currentDropItem);
    }

    if (currentItemIndex < dropItemIndex) {
      currentDropItem.after(currentItem);
    } else {
      currentDropItem.before(currentItem);
    }
  };

  const changedMessagesPositionSetTalkList = () => {
    // 노드리스트에는 map이 안되기때문에 복사한 배열
    const listArr_afterChange = [...list.current.children];
    const idArr = listArr_afterChange.map(
      (item) => item.firstChild.dataset.messageid
    );

    // 바뀐 메세지순서대로 실제 데이터에도 적용
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
  };

  const scrollToBottom = () => {
    const scrollHeight = ulRef.current.scrollHeight; // 최대 높이
    ulRef.current.scrollTop = scrollHeight; // 스크롤바의 위치를 최대 높이로 변경
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesScrollDown]);

  useEffect(() => {
    console.log(messages_for_playback);
  }, [messages_for_playback]);

  return (
    <div className={styles["viewer"]}>
      <ul
        className={styles.messages}
        ref={ulRef}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {isPlay ? (
          <>
            {messages_for_playback &&
              messages_for_playback?.map((message, index) => {
                return <Message message={message} key={index} />;
              })}
          </>
        ) : (
          <>
            {currentTalk?.messages.map((message) => {
              return <Message message={message} key={message.id} />;
            })}
          </>
        )}
      </ul>
    </div>
  );
}
