import React from "react";
import styles from "../../css/Main.module.css";
import { BsPlusCircle } from "react-icons/bs";

export default function Storage() {
  return (
    <div className={styles.storage}>
      <span>새 톡 만들기</span>
      <BsPlusCircle />
    </div>
  );
}
