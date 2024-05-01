import React, { useContext, useState } from "react";
import styles from "../../../css/storage/TalkListItem.module.css";
import { FiMinus } from "react-icons/fi";
import { TalkContext } from "../../../context/TalkContext";

export default function TalkListItem({ talk }) {
  const { title, id } = talk;
  const [input, setInput] = useState(title);
  const { removeTalk, activeTalk, updateTalkTitle, currentTalkId } =
    useContext(TalkContext);

  const handleRemoveIconClick = (e) => {
    e.stopPropagation();
    console.log("삭제");
    removeTalk(id);
  };

  const handleTalkItemClick = (e) => {
    console.log("클릭");

    activeTalk(id);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    updateTalkTitle(id, e.target.value);
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
        // active가 된 Talk는 input으로 바꿔서 클릭하면 수정상태가 될 수 있습니다.
        <input
          className={styles.input}
          type="text"
          value={input}
          onChange={handleInputChange}
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

/**
 * 이벤트 전파때문에 문제가 발생하는 것 같아
 * onClick도 이벤트 전파가 된다?
 */
