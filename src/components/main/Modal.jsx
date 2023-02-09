import React, { useContext } from "react";
import { MessageContext } from "../../context/MessageContext";
import { TalkPlayerContext } from "../../context/TalkPlayerContext";
import styles from "../../css/Modal.module.css";
import Talk from "./talk/Talk";

export default function Modal() {
  const { playState, stopTalkPlayer } = useContext(TalkPlayerContext);

  const closeBtnClick = () => {
    stopTalkPlayer();
  };
  return (
    <div className={`${styles.modal} ${playState ? styles.active : ""}`}>
      <Talk />
      <div className={styles.close} onClick={closeBtnClick}>
        X
      </div>
    </div>
  );
}
