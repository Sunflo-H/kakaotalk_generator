import React, { useContext, useId, useState } from "react";
import styles from "../../../css/storage/StorageBox.module.css";
import { FiPlus, FiMinus } from "react-icons/fi";
import TalkStorage from "./TalkStorage";
import { MessageContext } from "../../../context/TalkContext";

export default function StorageBox({}) {
  const [id, setNextId] = useId();
  const [storageList, setStorageList] = useState([
    { title: "조보아", id: 1, messages: [{}, {}] },
    { title: "백종원", id: 2 },
  ]);

  const { talkList, activatedTalkId } = useContext(MessageContext);

  const [activeStorageId, setActiveStorageId] = useState(storageList[0]?.id);

  const handleAddIconClick = () => {
    setStorageList([...storageList, { title: "New Talk", id: id }]);
    setNextId();
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
        {/* {talkList[].map((storage) => (
          <TalkStorage
            storage={storage}
            storageList={storageList}
            setStorageList={setStorageList}
            activeStorageId={activeStorageId}
            setActiveStorageId={setActiveStorageId}
            key={storage.id}
          />
        ))} */}
      </div>
    </div>
  );
}
