import React, { useContext } from "react";
import styles from "../../../css/storage/StorageBox.module.css";
import { FiPlus, FiMinus } from "react-icons/fi";
import TalkListItem from "./TalkListItem";
import { TalkContext } from "../../../context/TalkContext";

export default function StorageBox() {
  const { talkList, createTalk } = useContext(TalkContext);

  const handleAddIconClick = () => {
    createTalk();
  };

  return (
    <div className={styles["storage-box"]}>
      <div className={styles.header}>
        <span>Talk</span>
        <div className={styles["icon-box"]} onClick={handleAddIconClick}>
          <FiPlus className={styles.icon} />
        </div>
      </div>
      <div className={styles.main}>
        {talkList &&
          talkList.map((talk) => <TalkListItem talk={talk} key={talk.id} />)}
      </div>
    </div>
  );
}
