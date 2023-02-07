import React, { useContext, useState } from "react";
import { MessageContext } from "../../../context/MessageContext";
import { PlayStateContext } from "../../../context/PlayStateContext";
import styles from "../../../css/talk/TalkMain.module.css";
import Message from "./Message";

export default function TalkMain() {
  const { playState } = useContext(PlayStateContext);
  const { messages, messages_to_play } = useContext(MessageContext);

  /**
   * 메세지를 출력할거야
   * 최종적으로는 음성이 끝날때 마다 한줄씩 출력
   *
   * 1. 한줄씩 출력되는걸 먼저 해보자
   * promise를 쓴다?
   *
   * 1. 재생을 누른다
   * 2. 음성이 나온다
   * 3. 음성과 동시에 메세지가 나온다 (이거를 어떻게 하지?)
   * messages 랑 출력될 message 이렇게 두개 필요
   * messages의 내용을 앞에서부터 message에 복사하면서 그 내용을 읽어
   *
   */

  if (playState) {
    return (
      <div className={styles["viewer"]}>
        <div className={styles.messages}>
          {messages_to_play &&
            messages_to_play.map((message, index) => {
              console.log(playState);
              return <Message message={message} key={index} />;
            })}
        </div>
      </div>
    );
  }

  return (
    <div className={styles["viewer"]}>
      <div className={styles.messages}>
        {messages.map((message, index) => {
          return <Message message={message} key={index} />;
        })}
      </div>
    </div>
  );
}
