import React, { useContext, useState } from "react";
import { MessageContext } from "../../../context/MessageContext";
import styles from "../../../css/talk/TalkMain.module.css";

export default function TalkMain() {
  const { messages } = useContext(MessageContext);

  return (
    <div className={styles["viewer"]}>
      <div className={styles.messages}>
        {messages.map((message, index) => {
          if (message.owner === "my-message") {
            return (
              <div
                className={`${styles["my-message"]} ${styles.message}`}
                key={index}
              >
                {message.text}
              </div>
            );
          } else {
            return (
              <div
                className={`${styles["other-message"]} ${styles.message}`}
                key={index}
              >
                {message.text}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
