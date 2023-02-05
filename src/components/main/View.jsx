import React, { useState } from "react";
import styles from "../../css/View.module.css";

import TalkFooter from "./talk/TalkFooter";
import TalkHeader from "./talk/TalkHeader";
import TalkMain from "./talk/TalkMain";

export default function View() {
  return (
    <div className={styles.generator}>
      <div className={styles.talk}>
        <TalkHeader />
        <TalkMain />
        <TalkFooter />
      </div>
    </div>
  );
}
