import React, { useContext, useState } from "react";
import styles from "../../css/View.module.css";
import { BsPlayCircleFill } from "react-icons/bs";
import { MessageContext } from "../../context/MessageContext";
import { SSTContext } from "../../context/SSTContext";
import Talk from "./talk/Talk";
import { PlayStateContext } from "../../context/PlayStateContext";

export default function View() {
  const { messages } = useContext(MessageContext);
  const { speak } = useContext(SSTContext);
  const { setPlayState } = useContext(PlayStateContext);
  const handleClick = (e) => {
    messages.forEach((message) => {
      speak(message.text);
    });
    setPlayState(true);
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
