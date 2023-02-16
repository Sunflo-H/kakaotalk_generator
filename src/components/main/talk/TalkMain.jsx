import React, { useContext, useState } from "react";
import { TalkContext } from "../../../context/TalkContext";
import { TalkPlayerContext } from "../../../context/TalkPlayerContext";
import { SSTContext } from "../../../context/SSTContext";
import styles from "../../../css/talk/TalkMain.module.css";
import Message from "./Message";

export default function TalkMain() {
  const { isPlay } = useContext(TalkPlayerContext);
  const { talkList, currentTalkId, messages_for_playback } =
    useContext(TalkContext);

  const currentTalk =
    talkList && talkList.find((talk) => talk.id === currentTalkId);

  return (
    <div className={styles["viewer"]}>
      <div className={styles.messages}>
        {isPlay ? (
          <>
            {messages_for_playback?.map((message, index) => {
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
      </div>
    </div>
  );
}
