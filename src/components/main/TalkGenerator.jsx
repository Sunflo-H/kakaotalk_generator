import React, { useContext, useState } from "react";
import styles from "../../css/TalkGenerator.module.css";
import { BsCardImage } from "react-icons/bs";
import { MessageContext } from "../../context/MessageContext";
import { SSTContext } from "../../context/SSTContext";

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

  // 내 기능
  // 메세지 입력, 사진 추가

  // 상대방 기능
  // 상대방 추가(이름, 프로필), 메세지 입력, 사진 추가

  // 일단 메세지만 만들어보자
  return (
    <div className={styles["talk-generators"]}>
      <div className={styles.generator}>
        <div className={styles["header"]}>My Talk</div>
        <form className={styles.main} onSubmit={handleSubmit_mine}>
          <label htmlFor="my_message">Message </label>
          <input
            type="text"
            id="my_message"
            placeholder="메세지 입력"
            onChange={handleChange_input_mine}
            value={input_mine}
          />
          <button>추가</button>
          {/* 사진추가 */}
          {/* <BsCardImage className={styles.icons} /> */}
        </form>
      </div>
      <div className={styles.generator}>
        <div className={styles["header"]}>Other Talk</div>
        <form className={styles.main} onSubmit={handleSubmit_other}>
          <label htmlFor="other_message">Message </label>
          <input
            type="text"
            id="other_message"
            placeholder="메세지 입력"
            onChange={handleChange_input_other}
            value={input_other}
          />
          <button>추가</button>
          {/* 사진추가 */}
          {/* <BsCardImage className={styles.icons} /> */}
        </form>
      </div>
    </div>
  );
}
