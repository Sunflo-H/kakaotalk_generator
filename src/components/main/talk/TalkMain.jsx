import React, { useContext, useState } from "react";
import { MessageContext } from "../../../context/MessageContext";
import { TalkPlayerContext } from "../../../context/TalkPlayerContext";
import { SSTContext } from "../../../context/SSTContext";
import styles from "../../../css/talk/TalkMain.module.css";
import Message from "./Message";

export default function TalkMain() {
  const { playState } = useContext(TalkPlayerContext);
  const { messages, messages_to_play } = useContext(MessageContext);

  if (playState) {
    return (
      <div className={styles["viewer"]}>
        <div className={styles.messages}>
          {messages_to_play &&
            messages_to_play.map((message, index) => {
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
