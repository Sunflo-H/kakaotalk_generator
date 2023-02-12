import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "../../../css/talk/Message.module.css";
import { IoClose, IoCheckmarkSharp } from "react-icons/io5";
import { MessageContext } from "../../../context/MessageContext";
import useFocus from "../../../hooks/useFocus";

export default function Message({ message, index }) {
  const { text, owner, image, id } = message;

  const { removeMessage, updateMessage } = useContext(MessageContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [input, setInput] = useState(text);
  const { ref: focus_ref, setIsFocused } = useFocus(false);

  const handleMessageClick = (e) => {
    setIsUpdating(true);
    setIsFocused(true);
  };

  const handleChange = (e) => {
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
    <div className={styles["message-box"]}>
      {isUpdating ? (
        <>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className={`${styles[owner]} ${styles.message} ${styles.input}`}
            onKeyDown={handleKeyDown}
            ref={focus_ref}
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
        <div
          className={`${styles[owner]} ${styles.message}`}
          onClick={handleMessageClick}
        >
          {text}
        </div>
      )}
    </div>
  );
}
