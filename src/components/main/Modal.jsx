import React, { useContext } from "react";
import { PlayStateContext } from "../../context/PlayStateContext";
import styles from "../../css/Modal.module.css";
import Talk from "./talk/Talk";

export default function Modal() {
  const { playState, setPlayState } = useContext(PlayStateContext);
  console.log(playState);

  const closeBtnClick = () => {
    setPlayState(false);
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
