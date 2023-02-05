import { createContext, useState } from "react";

export const SSTContext = createContext();

export function SSTProvider({ children }) {
  const [SST, setSST] = useState({ text, voices, speak_pitch, speak_speed });
  //   const [input, setInput] = useState(""); // 읽을 텍스트
  //   const [voices, setVoices] = useState(""); //  읽을 음성
  //   const [speak_speed, setSpeak_speed] = useState(1); // 읽을 스피드
  //   const [speak_pitch, setSpeak_pitch] = useState(1); // 읽을 톤

  return (
    <SSTContext.Provider
      value={{
        SST,
        setSST,
      }}
    >
      {children}
    </SSTContext.Provider>
    // <SSTContext.Provider
    //   value={{
    //     input,
    //     setInput,
    //     voices,
    //     setVoices,
    //     speak_speed,
    //     setSpeak_speed,
    //     speak_pitch,
    //     setSpeak_pitch,
    //   }}
    // >
    //   {children}
    // </SSTContext.Provider>
  );
}
