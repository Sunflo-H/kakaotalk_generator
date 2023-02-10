import React, { useContext, useState } from "react";
import styles from "../../../css/talk/Message.module.css";
import { IoClose, IoCheckmarkSharp } from "react-icons/io5";
import { MessageContext } from "../../../context/MessageContext";

export default function Message({ message, index }) {
  const { text, owner, image, id } = message;

  const { onRemoveMessage, onUpdateMessage } = useContext(MessageContext);
  const [isUpdate, setIsUpdate] = useState(false);
  const [input, setInput] = useState(text);

  /**
   * 메세지를 클릭하면 수정 상태가 된다.
   * 수정상태 : 메세지가 <input>이 되며 삭제버튼이 나온다.
   *
   * 수정상태를 언제 어떻게 풀리게 해주지? : 엔터키나 다른걸 누르면
   *
   */

  const handleClick = (e) => {
    setIsUpdate(true);
    e.currentTarget.focus();
    console.log(e.currentTarget);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsUpdate(false);
      onUpdateMessage();
    }
  };

  const onUpdate = (e) => {
    onUpdateMessage(id, input);
    setIsUpdate(false);
  };
  const onRemove = (e) => {
    onRemoveMessage(id);
    setIsUpdate(false);
  };

  return (
    <div className={styles["message-box"]}>
      {isUpdate ? (
        <input
          type="text"
          value={input}
          onChange={handleChange}
          className={`${styles[owner]} ${styles.message} ${styles.input}`}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div
          className={`${styles[owner]} ${styles.message}`}
          onClick={handleClick}
        >
          {text}
        </div>
      )}

      {isUpdate && (
        <>
          <div
            className={`${styles["btn"]} ${styles["confirm"]}`}
            onClick={onUpdate}
          >
            <IoCheckmarkSharp />
          </div>
          <div
            className={`${styles["btn"]} ${styles["remove"]}`}
            onClick={onRemove}
          >
            <IoClose />
          </div>
        </>
      )}
    </div>
  );
}
