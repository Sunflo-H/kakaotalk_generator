import React, { useContext, useEffect, useState } from "react";
import { SSTContext } from "../../context/SSTContext";
import styles from "../../css/VoiceOption.module.css";

export default function VoiceOption() {
  const { SST, setSST, speak_test, voices } = useContext(SSTContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    speak_test();
  };

  return (
    <div className={styles.setting}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="speed">음성 속도</label>
          <input
            type="range"
            min="0.5"
            max="2"
            defaultValue="1"
            step="0.1"
            id="speed"
            onChange={(e) => setSST({ ...SST, speak_speed: e.target.value })}
          />
          <div className="rate-value">{SST.speak_speed}</div>
          <div className="clearfix"></div>
        </div>
        <div>
          <label htmlFor="pitch">음성 톤</label>
          <input
            type="range"
            min="0.1"
            max="2"
            defaultValue="1"
            step="0.1"
            id="pitch"
            onChange={(e) => setSST({ ...SST, speak_pitch: e.target.value })}
          />
          <div className="pitch-value">{SST.speak_pitch}</div>
          <div className="clearfix"></div>
        </div>
        <div>음성 선택</div>
        <select
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
        <input
          type="text"
          className="txt"
          onChange={(e) => setSST({ ...SST, text: e.target.value })}
          value={SST.text}
        />
        <button>음성 테스트</button>
      </form>
      나중에는 상대음성과 내 음성 두개로 해보자
    </div>
  );
}
