import React, { useContext, useState } from "react";
import styles from "../../../css/storage/TalkListItem.module.css";
import { FiMinus } from "react-icons/fi";
import { TalkContext } from "../../../context/TalkContext";

export default function TalkListItem({ talk }) {
  const { title, id } = talk;
  const [input, setInput] = useState(title);
  const { removeTalk, activateTalk, currentTalkId, setCurrentTalkId } =
    useContext(TalkContext);

  const handleRemoveIconClick = (e) => {
    e.stopPropagation();

    removeTalk(id);
  };

  const handleTalkItemClick = () => {
    activateTalk(id);
  };

  /**
   * * talk가 활성화 되었을때만! title을 클릭시 수정할수 있게 해줘
   */

  return (
    <div
      className={`${styles["talk-list-item"]} ${
        id === currentTalkId && styles.active
      }`}
      onClick={handleTalkItemClick}
    >
      {/* <span className={styles.title}>{title}</span> */}
      {id === currentTalkId ? (
        <input
          className={styles.input1}
          type="text"
          value={input}
          onChange={setInput}
        />
      ) : (
        <span className={styles.title}>{title}</span>
      )}

      <div className={styles["icon-box"]} onClick={handleRemoveIconClick}>
        <FiMinus className={styles.icon} />
      </div>
    </div>
  );
}
