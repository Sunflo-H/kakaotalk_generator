import React from "react";
import VoiceOption from "./VoiceOption";
import Storage from "./Storage";
import View from "./View";
import styles from "../../css/Main.module.css";
import Generator from "./Generator";
import { MessageProvider } from "../../context/MessageContext";

export default function Main() {
  return (
    <main>
      <Storage />
      <MessageProvider>
        <View />
        <div className={styles["generator-and-voiceOption"]}>
          <Generator />
          <VoiceOption />
        </div>
      </MessageProvider>
    </main>
  );
}
