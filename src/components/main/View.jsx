import React, { useContext, useEffect, useState } from "react";
import styles from "../../css/View.module.css";
import { BsPlayCircleFill } from "react-icons/bs";
import { MessageContext } from "../../context/MessageContext";
import { SSTContext } from "../../context/SSTContext";
import Talk from "./talk/Talk";
import { PlayStateContext } from "../../context/PlayStateContext";

export default function View() {
  const { messages, messages_to_play, fillMessages_to_play } =
    useContext(MessageContext);
  const { speak } = useContext(SSTContext);
  const { setPlayState } = useContext(PlayStateContext);

  const handleClick = (e) => {
    setPlayState(true);

    let count = 0;
    let interval = setInterval(() => {
      fillMessages_to_play(messages[count]);
      speak(messages[count].text);
      count++;

      if (count === messages.length) clearInterval(interval);
    }, 2000);
  };

  return (
    <div className={styles.view}>
      <Talk />
      <div className={styles.play} onClick={handleClick}>
        <BsPlayCircleFill className={styles.icon} />
      </div>
    </div>
  );
}
