import React, { useContext, useState } from "react";
import { MessageContext } from "../../../context/MessageContext";
import styles from "../../../css/talk/TalkMain.module.css";
import Message from "./Message";

export default function TalkMain() {
  const { messages } = useContext(MessageContext);

  return (
    <div className={styles["viewer"]}>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <Message message={message} key={index} />
        ))}
      </div>
    </div>
  );
}
