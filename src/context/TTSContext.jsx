import { createContext, useCallback, useState } from "react";

export const TTSContext = createContext();

export function TTSProvider({ children }) {
  const [TTS, setTTS] = useState({
    text: "",
    select_voice_num: 0,
    speak_pitch: 1,
    speak_speed: 1,
  });

  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  const speak_test = useCallback(() => {
    synth.cancel();

    const { text, select_voice_num, speak_pitch, speak_speed } = TTS;

    const utterThis = new SpeechSynthesisUtterance(text);

    utterThis.voice = voices[select_voice_num];
    utterThis.pitch = speak_pitch;
    utterThis.rate = speak_speed;

    synth.speak(utterThis);
  });

  return (
    <TTSContext.Provider
      value={{
        TTS,
        setTTS,
        speak_test,
        voices,
      }}
    >
      {children}
    </TTSContext.Provider>
  );
}
