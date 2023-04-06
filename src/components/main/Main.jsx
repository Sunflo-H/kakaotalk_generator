import React, { useContext, useEffect, useState } from "react";
import VoiceOption from "./VoiceOption";
import View from "./View";
import styles from "../../css/Main.module.css";
import TalkGenerator from "./TalkGenerator";
import { TalkProvider } from "../../context/TalkContext";
import Category from "./Category";
import { TTSProvider } from "../../context/TTSContext";
import Modal from "./Modal";
import { TalkPlayerProvider } from "../../context/TalkPlayerContext";
import StorageBox from "./storage/StorageBox";

export default function Main() {
  const [categoryItem, setCategoryItem] = useState("Talk");

  return (
    <main>
      <TalkProvider>
        <StorageBox />
        <TTSProvider>
          <TalkPlayerProvider>
            <View />
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
