import { createContext, useState } from "react";

export const SSTContext = createContext();

export function SSTProvider({ children }) {
  const [SST, setSST] = useState({
    text: "",
    select_voice_num: 0,
    speak_pitch: 1,
    speak_speed: 1,
  });

  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  const speak_test = () => {
    const { text, select_voice_num, speak_pitch, speak_speed } = SST;

    speechSynthesis.cancel();

    const utterThis = new SpeechSynthesisUtterance(text);

    utterThis.voice = voices[select_voice_num];

    utterThis.pitch = speak_pitch;
    utterThis.rate = speak_speed;

    synth.speak(utterThis);
  };

  const speak = (text) => {
    const { select_voice_num, speak_pitch, speak_speed } = SST;

    const utterThis = new SpeechSynthesisUtterance(text);

    utterThis.voice = voices[select_voice_num];

    utterThis.pitch = speak_pitch;
    utterThis.rate = speak_speed;

    synth.speak(utterThis);
  };

  return (
    <SSTContext.Provider
      value={{
        SST,
        setSST,
        speak,
        speak_test,
        voices,
      }}
    >
      {children}
    </SSTContext.Provider>
  );
}
