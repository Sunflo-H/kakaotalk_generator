import React, { useContext } from "react";
import styles from "../../css/View.module.css";
import { BsPlayCircleFill } from "react-icons/bs";
import { MessageContext } from "../../context/TalkContext";
import Talk from "./talk/Talk";
import { TalkPlayerContext } from "../../context/TalkPlayerContext";

export default function View() {
  const { startTalkPlayer } = useContext(TalkPlayerContext);

  const handleClick = (e) => {
    startTalkPlayer();
  };

  return (
    <div className={styles.view}>
      {/* 토크 화면 */}
      <Talk />

      {/* 재생 버튼 */}
      <div className={styles.play} onClick={handleClick}>
        <BsPlayCircleFill className={styles.icon} />
      </div>
    </div>
  );
}
