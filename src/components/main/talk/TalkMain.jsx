import React, { useContext, useState } from "react";
import { MessageContext } from "../../../context/TalkContext";
import { TalkPlayerContext } from "../../../context/TalkPlayerContext";
import { SSTContext } from "../../../context/SSTContext";
import styles from "../../../css/talk/TalkMain.module.css";
import Message from "./Message";

export default function TalkMain() {
  const { isPlay } = useContext(TalkPlayerContext);
  const { talkList, activatedTalkId, messages, messages_to_play } =
    useContext(MessageContext);

  return (
    <div className={styles["viewer"]}>
      <div className={styles.messages}>
        {isPlay ? (
          <>
            {messages_to_play &&
              messages_to_play.map((message, index) => {
                return <Message message={message} key={index} />;
              })}
          </>
        ) : (
          <>
            {talkList
              .find((talk) => talk.id === activatedTalkId)
              .messages.map((message) => {
                return <Message message={message} key={message.id} />;
              })}
            {/* {messages &&
              messages.map((message, index) => {
                return <Message message={message} key={index} />;
              })} */}
          </>
        )}
      </div>
    </div>
  );
}
