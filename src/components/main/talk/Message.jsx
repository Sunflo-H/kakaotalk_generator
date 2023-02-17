import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "../../../css/talk/Message.module.css";
import { IoClose, IoCheckmarkSharp } from "react-icons/io5";
import { TalkContext } from "../../../context/TalkContext";
import useFocus from "../../../hooks/useFocus";

export default function Message({ message }) {
  const { text, owner, image, id } = message;

  const { removeMessage, updateMessage } = useContext(TalkContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [input, setInput] = useState(text);
  const { ref: focusRef, setIsFocused } = useFocus(false);

  const handleMessageClick = (e) => {
    setIsUpdating(true);
    setIsFocused(true);
  };

  const handleInputTextChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsUpdating(false);
      updateMessage(id, input);
    }
  };

  const handleUpdateClick = (e) => {
    updateMessage(id, input);
    setIsUpdating(false);
  };

  const handleRemoveClick = (e) => {
    removeMessage(id);
    setIsUpdating(false);
  };

  return (
    <li className={styles["message-box"]} draggable="true">
      {isUpdating ? (
        <>
          {image === "" ? (
            <>
              <input
                type="text"
                value={input}
                onChange={handleInputTextChange}
                className={`${styles[owner]} ${styles.message} ${styles.input}`}
                onKeyDown={handleKeyDown}
                ref={focusRef}
              />
              <div
                className={`${styles["btn"]} ${styles["confirm"]}`}
                onClick={handleUpdateClick}
              >
                <IoCheckmarkSharp />
              </div>
              <div
                className={`${styles["btn"]} ${styles["remove"]}`}
                onClick={handleRemoveClick}
              >
                <IoClose />
              </div>
            </>
          ) : (
            <>
              <img
                className={`${styles[owner]} ${styles.image}`}
                src={image}
                alt={image}
                onClick={handleMessageClick}
              />
              <div
                className={`${styles["btn"]} ${styles["confirm"]}`}
                onClick={handleUpdateClick}
              >
                <IoCheckmarkSharp />
              </div>
              <div
                className={`${styles["btn"]} ${styles["remove"]}`}
                onClick={handleRemoveClick}
              >
                <IoClose />
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {image === "" ? (
            <div
              className={`${styles[owner]} ${styles.message}`}
              onClick={handleMessageClick}
            >
              {text}
            </div>
          ) : (
            <img
              className={`${styles[owner]} ${styles.image}`}
              src={image}
              alt={image}
              onClick={handleMessageClick}
              draggable="false"
            />
          )}
        </>
      )}
    </li>
  );
}
