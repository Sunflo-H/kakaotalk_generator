import React, { useEffect, useState } from "react";
import styles from "../../css/VoiceOption.module.css";

export default function VoiceOption() {
  const synth = window.speechSynthesis;
  const [input, setInput] = useState("");
  const [select, setSelect] = useState(0);
  const [voices, setVoices] = useState("");
  const [speak_speed, setSpeak_speed] = useState(1);
  const [speak_pitch, setSpeak_pitch] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setVoices(synth.getVoices());
    }, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    speechSynthesis.cancel();

    const utterThis = new SpeechSynthesisUtterance(input);

    utterThis.voice = voices[select];

    utterThis.pitch = speak_pitch;
    utterThis.rate = speak_speed;

    synth.speak(utterThis);
  };

  return (
    <div className={styles.setting}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="txt"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <div>
          <label htmlFor="speed">음성 속도</label>
          <input
            type="range"
            min="0.5"
            max="2"
            defaultValue="1"
            step="0.1"
            id="speed"
            onChange={(e) => setSpeak_speed(e.target.value)}
          />
          <div className="rate-value">{speak_speed}</div>
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
            onChange={(e) => setSpeak_pitch(e.target.value)}
          />
          <div className="pitch-value">{speak_pitch}</div>
          <div className="clearfix"></div>
        </div>
        <select onChange={(e) => setSelect(e.target.value)} value={select}>
          {voices &&
            voices.map((voice, i) => (
              <option value={i} key={i}>
                {voice.name} ({voice.lang})
              </option>
            ))}
        </select>
        <div></div>
        <button>음성 변환하기</button>
      </form>
      나중에는 상대음성과 내 음성 두개로 해보자
    </div>
  );
}
