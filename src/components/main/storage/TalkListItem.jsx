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
    console.log("삭제아이콘");
    // setCurrentTalkId(1);
  };

  const handleTalkItemClick = () => {
    console.log("토크 아이템");
    activateTalk(id);
  };

  /**
   * * talk가 활성화 되었을때만! 삭제버튼이 보이게 해줘
   * * talk가 활성화 되었을때만! title을 클릭시 수정할수 있게 해줘
   */

  return (
    <div
      className={`${styles["talk-list-item"]} ${
        id === currentTalkId && styles.active
      }`}
      onClick={handleTalkItemClick}
    >
      <span className={styles.title}>{title}</span>
      {/* {id === activeStorageId ? (
        <input type="text" value={input} onChange={setInput} />
      ) : (
        <input type="text" value={input} onChange={setInput} readOnly />
      )} */}

      <div className={styles["icon-box"]} onClick={handleRemoveIconClick}>
        <FiMinus className={styles.icon} />
      </div>
    </div>
  );
}
