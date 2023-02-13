import React, { useState } from "react";
import styles from "../../../css/StorageBox.module.css";
import { FiMinus } from "react-icons/fi";

export default function Storage({
  storage,
  storageList,
  setStorageList,
  activeStorageId,
  setActiveStorageId,
}) {
  const { title, id } = storage;
  const [input, setInput] = useState(title);

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
