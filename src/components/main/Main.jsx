import React, { useEffect, useState } from "react";
import VoiceOption from "./VoiceOption";
import View from "./View";
import styles from "../../css/Main.module.css";
import TalkGenerator from "./TalkGenerator";
import { MessageProvider } from "../../context/MessageContext";
import Category from "./Category";
import { SSTProvider } from "../../context/SSTContext";
import Modal from "./Modal";
import { TalkPlayerProvider } from "../../context/TalkPlayerContext";
import StorageBox from "./storage/StorageBox";

export default function Main() {
  const [categoryItem, setCategoryItem] = useState("Talk");

  return (
    <main>
      <StorageBox />
      <SSTProvider>
        <MessageProvider>
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
        </MessageProvider>
      </SSTProvider>
    </main>
  );
}

/**
 * 재생
 * 톡과 보이스 필요
 */
