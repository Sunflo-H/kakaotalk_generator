import React, { useContext } from "react";
import styles from "../../css/View.module.css";
import { BsPlayCircleFill } from "react-icons/bs";
import { TalkContext } from "../../context/TalkContext";
import Talk from "./talk/Talk";
import { TalkPlayerContext } from "../../context/TalkPlayerContext";

export default function View() {
  const { startTalkPlayer } = useContext(TalkPlayerContext);
  const { currentTalkId } = useContext(TalkContext);

  const handleStartTalkPlayer = (e) => {
    startTalkPlayer();
  };

  console.log(currentTalkId);

  return (
    <div className={styles.view}>
      {currentTalkId !== null ? (
        <>
          <Talk />
          <div className={styles.play} onClick={handleStartTalkPlayer}>
            <BsPlayCircleFill className={styles.icon} />
          </div>
        </>
      ) : null}
    </div>
  );
}
