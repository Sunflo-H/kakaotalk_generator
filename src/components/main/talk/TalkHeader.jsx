import React, { useContext, useState } from "react";
import { BsPencil, BsList } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import styles from "../../../css/talk/TalkHeader.module.css";
import { TalkPlayerContext } from "../../../context/TalkPlayerContext";
import { TalkContext } from "../../../context/TalkContext";

export default function TalkHeader() {
  const [inputState, setInputState] = useState(false);
  const { talkList, currentTalkId, updateOtherName } = useContext(TalkContext);
  const { playState } = useContext(TalkPlayerContext);

  const otherName = talkList.find(
    (talk) => talk.id === currentTalkId
  )?.otherName;

  const handleChange = (e) => {
    updateOtherName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setInputState(false);
    }
  };

  return (
    <>
      {playState ? (
        <div className={styles.header}>
          <FaArrowLeft className={styles["icon"]} />
          <div className={styles["otherName"]}>
            <span>{otherName}</span>
          </div>
          <div>
            <BiSearch className={styles.icon} />
            <BsList className={styles.icon} />
          </div>
        </div>
      ) : (
        <div className={styles.header}>
          <FaArrowLeft className={styles["icon"]} />
          <div className={styles["otherName"]}>
            {inputState ? (
              <input
                type="text"
                value={otherName}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <>
                <span>{otherName}</span>
                <BsPencil onClick={(e) => setInputState(true)} />
              </>
            )}
          </div>
          <div>
            <BiSearch className={styles.icon} />
            <BsList className={styles.icon} />
          </div>
        </div>
      )}
    </>
  );
}
