import React, { useContext } from "react";
import { TalkPlayerContext } from "../../context/TalkPlayerContext";
import styles from "../../css/Modal.module.css";
import Talk from "./talk/Talk";

export default function TalkPlayer() {
  const { isPlay, stopTalkPlayer } = useContext(TalkPlayerContext);

  const closeBtnClick = () => {
    stopTalkPlayer();
  };

  return (
    <div className={`${styles.modal} ${isPlay ? styles.active : ""}`}>
      <Talk />
      <div className={styles.close} onClick={closeBtnClick}>
        X
      </div>
    </div>
  );
}
