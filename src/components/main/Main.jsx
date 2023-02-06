import React, { useEffect, useState } from "react";
import VoiceOption from "./VoiceOption";
import Storage from "./Storage";
import View from "./View";
import styles from "../../css/Main.module.css";
import TalkGenerator from "./TalkGenerator";
import { MessageProvider } from "../../context/MessageContext";
import Category from "./Category";
import { SSTProvider } from "../../context/SSTContext";

export default function Main() {
  const [categoryItem, setCategoryItem] = useState("Talk");
  useEffect(() => {
    console.log(categoryItem);
  }, [categoryItem]);
  return (
    <main>
      <Storage />
      <MessageProvider>
        <SSTProvider>
          <View />
          <div className={styles["generator-and-voiceOption"]}>
            <Category
              categoryItem={categoryItem}
              setCategoryItem={setCategoryItem}
            />
            {categoryItem === "Talk" ? <TalkGenerator /> : <VoiceOption />}
          </div>
        </SSTProvider>
      </MessageProvider>
    </main>
  );
}
