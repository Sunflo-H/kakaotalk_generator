import React, { useContext, useState } from "react";
import styles from "../../css/TalkGenerator.module.css";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { MdAddPhotoAlternate } from "react-icons/md";
import { MessageContext } from "../../context/MessageContext";

export default function TalkGenerator() {
  const { messages, setMessages } = useContext(MessageContext);

  const [input_mine, setInput_mine] = useState("");
  const [input_other, setInput_other] = useState("");

  const handleChange_input_mine = (e) => {
    setInput_mine(e.target.value);
  };

  const handleChange_input_other = (e) => {
    setInput_other(e.target.value);
  };

  const handleSubmit_mine = (e) => {
    e.preventDefault();
    setMessages([
      ...messages,
      { text: input_mine, owner: "my-message", image: "" },
    ]);
  };

  const handleSubmit_other = (e) => {
    e.preventDefault();
    setMessages([
      ...messages,
      { text: input_other, owner: "other-message", image: "" },
    ]);
  };

  return (
    <div className={styles["talk-generators"]}>
      <div className={styles.generator}>
        <div className={styles["header"]}>My Talk</div>

        <form className={styles.main} onSubmit={handleSubmit_mine}>
          <label htmlFor="my_message">Message </label>
          <div className={styles.flex}>
            <input
              type="text"
              id="my_message"
              placeholder="메세지 입력"
              onChange={handleChange_input_mine}
              value={input_mine}
            />
            <button className={styles.add}>
              <BiMessageRoundedAdd className={styles.icons} />
            </button>
          </div>

          <label htmlFor="my_image">Image</label>
          <div className={styles.flex}>
            <input type="file" id="my_image" />
            <button className={styles.add}>
              <MdAddPhotoAlternate className={styles.icons} />
            </button>
          </div>
        </form>
      </div>
      <div className={styles.generator}>
        <div className={styles["header"]}>Other Talk</div>
        <form className={styles.main} onSubmit={handleSubmit_other}>
          <label htmlFor="other_message">Message </label>
          <div className={styles.flex}>
            <input
              type="text"
              id="other_message"
              placeholder="메세지 입력"
              onChange={handleChange_input_other}
              value={input_other}
            />
            <button className={styles.add}>
              <BiMessageRoundedAdd className={styles.icons} />
            </button>
          </div>
          <label htmlFor="other_image">Image</label>
          <div className={styles.flex}>
            <input type="file" id="other_image" />
            <button className={styles.add}>
              <MdAddPhotoAlternate className={styles.icons} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
