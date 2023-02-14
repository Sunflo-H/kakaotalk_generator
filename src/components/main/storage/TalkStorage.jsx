import React, { useContext, useState } from "react";
import styles from "../../../css/storage/Storage.module.css";
import { FiMinus } from "react-icons/fi";
import { MessageContext, TalkContext } from "../../../context/TalkContext";

export default function TalkStorage({
  storage,
  storageList,
  setStorageList,
  activeStorageId,
  setActiveStorageId,
}) {
  const { title, id } = storage;
  const [input, setInput] = useState(title);

  const { talkList, activatedTalkId } = useContext(MessageContext);

  const handleRemoveIconClick = () => {
    setStorageList(storageList.filter((storage) => storage.id !== id));
  };

  const handleStorageClick = () => {
    setActiveStorageId(id);
  };

  return (
    <div
      className={`${styles.storage} ${id === activeStorageId && styles.active}`}
      onClick={handleStorageClick}
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
