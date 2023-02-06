import React from "react";
import styles from "../../../css/talk/Message.module.css";

export default function Message({ message }) {
  const { text, owner, image } = message;
  return <div className={`${styles[owner]} ${styles.message}`}>{text}</div>;
}
