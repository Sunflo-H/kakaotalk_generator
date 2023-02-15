import React, { useContext, useState } from "react";
import styles from "../../../css/storage/TalkListItem.module.css";
import { FiMinus } from "react-icons/fi";
import { TalkContext } from "../../../context/TalkContext";

export default function TalkListItem({ talk }) {
  const { title, id } = talk;
  const [input, setInput] = useState(title);
  const { removeTalk, activateTalk, updateTalkTitle, currentTalkId } =
    useContext(TalkContext);

  const handleRemoveIconClick = (e) => {
    e.stopPropagation();

    removeTalk(id);
  };

  const handleTalkItemClick = () => {
    activateTalk(id);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    updateTalkTitle(id, input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  return (
    <div
      className={`${styles["talk-list-item"]} ${
        id === currentTalkId && styles.active
      }`}
      onClick={handleTalkItemClick}
    >
      {id === currentTalkId ? (
        <input
          className={styles.input}
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
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
