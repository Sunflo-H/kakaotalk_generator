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
import useDragAndDrop from "../../../hooks/useDragAndDrop";

/**
 * Talk의 메세지들을 보여주고, 메세지의 위치를 드래그 앤 드롭으로 변경하는 컴포넌트
 */
export default function TalkMain() {
  const { isPlay } = useContext(TalkPlayerContext);
  const { talkList, currentTalkId, messages_for_playback } =
    useContext(TalkContext);

  const currentTalk =
    talkList && talkList.find((talk) => talk.id === currentTalkId);

  // element 정보를 얻기위해 useRef 사용
  const ulRef = useRef();
  const { handleDragStart, handleDragOver, handleDrop } = useDragAndDrop(
    ulRef.current
  );

  const scrollToBottom = () => {
    const scrollHeight = ulRef.current.scrollHeight;
    ulRef.current.scrollTop = scrollHeight;
  };

  useEffect(() => {
    // 메세지가 추가될때마다 <ul>의 스크롤을 맨 아래로 내린다.
    scrollToBottom();
  }, [talkList]);

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
