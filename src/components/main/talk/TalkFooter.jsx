import React from "react";
import styles from "../../../css/talk/TalkFooter.module.css";
import { HiPlus } from "react-icons/hi";
import { BsEmojiSmile, BsHash } from "react-icons/bs";
import { BiHash } from "react-icons/bi";

export default function TalkFooter() {
  return (
    <div className={styles.footer}>
      <HiPlus className={styles.icon} />

      <div className={styles.icons}>
        <BsEmojiSmile className={styles.icon} />
        <BsHash className={styles.icon} />
      </div>
    </div>
  );
}
