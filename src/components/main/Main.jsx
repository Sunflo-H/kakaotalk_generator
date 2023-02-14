import React, { useContext, useEffect, useState } from "react";
import VoiceOption from "./VoiceOption";
import View from "./View";
import styles from "../../css/Main.module.css";
import TalkGenerator from "./TalkGenerator";
import { TalkProvider } from "../../context/TalkContext";
import Category from "./Category";
import { SSTProvider } from "../../context/SSTContext";
import Modal from "./Modal";
import { TalkPlayerProvider } from "../../context/TalkPlayerContext";
import StorageBox from "./storage/StorageBox";

export default function Main() {
  const [categoryItem, setCategoryItem] = useState("Talk");

  return (
    <main>
      <TalkProvider>
        <StorageBox />
        <SSTProvider>
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
        </SSTProvider>
      </TalkProvider>
    </main>
  );
}

/**
 * 저장소 (타이틀, id, message들)
 * 메세지는 메세지 컨텍스트
 * 메세지들을 저장소에 종속시킨다.
 *
 *
 * MessageContext 메세지들이 있어 , 하나의 Talk에 대한 메세지들
 * 저장소에는 Talk이 있어야되지? 메세지들이 Talk야 따라서 Messages만 있어도 돼
 */
