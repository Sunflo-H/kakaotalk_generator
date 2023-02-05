import React, { useContext, useState } from "react";
import styles from "../../css/Generator.module.css";
import { BsCardImage } from "react-icons/bs";
import { MessageContext } from "../../context/MessageContext";

export default function Generator() {
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
    setMessages([...messages, { text: input_mine, owner: "mine", image: "" }]);
  };

  const handleSubmit_other = (e) => {
    e.preventDefault();
    setMessages([
      ...messages,
      { text: input_other, owner: "other", image: "" },
    ]);
  };

  const handleClick = (e) => {
    console.log("재생");
  };

  return (
    <div className={styles.generator}>
      {/* 내 기능 */}
      <form onSubmit={handleSubmit_mine}>
        <label htmlFor="my_message">내 메세지 : </label>
        <div></div>
        <input
          type="text"
          id="my_message"
          placeholder="메세지 입력"
          onChange={handleChange_input_mine}
          value={input_mine}
        />
        {/* <BsCardImage className={styles.icons} /> */}
      </form>
      {/* 상대 기능 */}
      {/* <div>상대방 추가하기</div> */}
      {/* 상대방 이름 : <input type="text" /> */}
      {/* 상대방 프로필 : <span>파일 추가</span> */}
      <form onSubmit={handleSubmit_other}>
        <label htmlFor="other_message">상대방 메세지 : </label>
        <div></div>
        <input
          type="text"
          id="other_message"
          placeholder="메세지 입력"
          onChange={handleChange_input_other}
          value={input_other}
        />
        {/* <BsCardImage className={styles.icons} /> */}
      </form>

      <div onClick={handleClick}>재생</div>
    </div>
  );
}
