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

export default function Message({ message, index }) {
  const { text, owner, image, id } = message;

  const { onRemoveMessage, onUpdateMessage } = useContext(MessageContext);
  const [isUpdate, setIsUpdate] = useState(false);
  const [input, setInput] = useState(text);

  const messageInput = useRef();

  const handleClick = (e) => {
    setIsUpdate(true);

    console.log(messageInput);
  };

  useEffect(() => {
    messageInput.current && messageInput.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsUpdate(false);
      onUpdateMessage(id, input);
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
          ref={messageInput}
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
