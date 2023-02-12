import React, { useContext, useEffect, useState } from "react";
import { SSTContext } from "../../context/SSTContext";
import styles from "../../css/VoiceOption.module.css";
import { AiFillPlayCircle } from "react-icons/ai";

export default function VoiceOption() {
  const { SST, setSST, speak_test, voices } = useContext(SSTContext);

  const handleTestBtnClick = (e) => {
    speak_test();
  };

  return (
    <div className={styles["voice-option-box"]}>
      <div>
        <label htmlFor="select">음성 선택</label>
        <select
          id="select"
          onChange={(e) => setSST({ ...SST, select_voice_num: e.target.value })}
          value={SST.select_voice_num}
        >
          {voices &&
            voices.map((voice, i) => (
              <option value={i} key={i}>
                {voice.name} ({voice.lang})
              </option>
            ))}
        </select>
      </div>

      <div>
        <label htmlFor="speed">음성 속도 : {SST.speak_speed}</label>
        <input
          type="range"
          min="0.5"
          max="2"
          defaultValue="1"
          step="0.1"
          id="speed"
          onChange={(e) => setSST({ ...SST, speak_speed: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="pitch">음성 톤 : {SST.speak_pitch}</label>
        <input
          type="range"
          min="0.1"
          max="2"
          defaultValue="1"
          step="0.1"
          id="pitch"
          onChange={(e) => setSST({ ...SST, speak_pitch: e.target.value })}
        />
      </div>

      <div>
        <label>음성 테스트</label>
        <div className={styles.flex}>
          <input
            type="text"
            className="txt"
            onChange={(e) => setSST({ ...SST, text: e.target.value })}
            value={SST.text}
          />

          <button onClick={handleTestBtnClick}>
            <AiFillPlayCircle />
          </button>
        </div>
      </div>
    </div>
  );
}
