import React, { useState } from "react";
import VoiceOption from "./VoiceOption";
import View from "./View";
import styles from "../../css/Main.module.css";
import TalkGenerator from "./TalkGenerator";
import { TalkProvider } from "../../context/TalkContext";
import Category from "./Category";
import { TTSProvider } from "../../context/TTSContext";
import Modal from "./Modal";
import { TalkPlayerProvider } from "../../context/TalkPlayerContext";
import TalkStorage from "./talkStorage/TalkStorage";

export default function Main() {
  const [categoryItem, setCategoryItem] = useState("Talk");

  return (
    <main>
      <TalkProvider>
        {/* left content - talk storage */}
        <TalkStorage />

        <TTSProvider>
          <TalkPlayerProvider>
            {/* main content - kakao talk */}
            <View />

            {/* right content - voice option */}
            <div className={styles["generator-and-voiceOption"]}>
              <Category
                categoryItem={categoryItem}
                setCategoryItem={setCategoryItem}
              />
              {categoryItem === "Talk" ? <TalkGenerator /> : <VoiceOption />}
            </div>

            <Modal />
          </TalkPlayerProvider>
        </TTSProvider>
      </TalkProvider>
    </main>
  );
}
