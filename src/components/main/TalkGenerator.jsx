import React, { useContext, useState } from "react";
import styles from "../../css/TalkGenerator.module.css";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { MdAddPhotoAlternate } from "react-icons/md";
import { MessageContext } from "../../context/MessageContext";
import { BsCheckLg } from "react-icons/bs";

export default function TalkGenerator() {
  const { addMessage } = useContext(MessageContext);

  const [inputs, setInputs] = useState({ mine: "", other: "" });

  const handleChange = (e) => {
    const owner = e.target.dataset.owner;
    setInputs({ ...inputs, [owner]: e.target.value });
  };

  const handleClick = (e) => {
    const owner = e.currentTarget.dataset.owner;
    const text = inputs[owner];
    addMessage(text, owner);
    setInputs({ ...inputs, [owner]: "" });
  };

  const handleKeyDown = (e) => {
    const owner = e.currentTarget.dataset.owner;
    const text = inputs[owner];
    if (e.key === "Enter") {
      addMessage(text, owner);
      setInputs({ ...inputs, [owner]: "" });
    }
  };

  return (
    <div className={styles["talk-generators"]}>
      <div className={styles.generator}>
        <div className={styles["header"]}>My Talk</div>
        <div className={styles.main}>
          <label htmlFor="my_message">Message </label>
          <div className={styles.flex}>
            <input
              type="text"
              id="my_message"
              placeholder="메세지 입력"
              value={inputs.mine}
              data-owner="mine"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <button
              className={styles.add}
              data-owner="mine"
              onClick={handleClick}
            >
              <BiMessageRoundedAdd className={styles.icons} />
            </button>
          </div>
          <label htmlFor="my_image">Image</label>
          <div className={styles.flex}>
            <input type="file" id="my_image" data-owner="mine" />
            <button
              className={styles.add}
              data-owner="mine"
              onClick={handleClick}
            >
              <MdAddPhotoAlternate className={styles.icons} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.generator}>
        <div className={styles["header"]}>Other Talk</div>
        <div className={styles.main}>
          <label htmlFor="other_message">Message </label>
          <div className={styles.flex}>
            <input
              type="text"
              id="other_message"
              placeholder="메세지 입력"
              value={inputs.other}
              data-owner="other"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <button
              className={styles.add}
              data-owner="other"
              onClick={handleClick}
            >
              <BiMessageRoundedAdd className={styles.icons} />
            </button>
          </div>
          <label htmlFor="other_image">Image</label>
          <div className={styles.flex}>
            <input type="file" id="other_image" data-owner="other" />
            <button className={styles.add} data-owner="other">
              <MdAddPhotoAlternate className={styles.icons} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
