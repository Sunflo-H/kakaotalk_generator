import React from "react";
import TalkFooter from "./TalkFooter";
import TalkHeader from "./TalkHeader";
import TalkMain from "./TalkMain";
import styles from "../../../css/talk/Talk.module.css";

export default function Talk() {
  return (
    <div className={styles.talk}>
      <TalkHeader />
      <TalkMain />
      <TalkFooter />
    </div>
  );
}
