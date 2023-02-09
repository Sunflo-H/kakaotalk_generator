import React, { useContext, useState } from "react";
import { BsPencil, BsList } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import styles from "../../../css/talk/TalkHeader.module.css";
import { TalkPlayerContext } from "../../../context/TalkPlayerContext";

export default function TalkHeader() {
  const [title, setTitle] = useState("New Title");
  const [title_inputState, setTitle_inputState] = useState(false);
  const { playState } = useContext(TalkPlayerContext);

  if (playState) {
    return (
      <div className={styles.header}>
        <FaArrowLeft className={styles["icon"]} />
        <div className={styles["title"]}>
          <span>{title}</span>
        </div>
        <div>
          <BiSearch className={styles.icon} />
          <BsList className={styles.icon} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.header}>
      <FaArrowLeft className={styles["icon"]} />
      <div className={styles["title"]}>
        {title_inputState ? (
          <form onSubmit={() => setTitle_inputState(false)}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
        ) : (
          <>
            <span>{title}</span>
            <BsPencil onClick={(e) => setTitle_inputState(true)} />
          </>
        )}
      </div>
      <div>
        <BiSearch className={styles.icon} />
        <BsList className={styles.icon} />
      </div>
    </div>
  );
}
