import { createContext, useContext, useState } from "react";
import { MessageContext } from "./MessageContext";
import { SSTContext } from "./SSTContext";

export const TalkPlayerContext = createContext();

export function TalkPlayerProvider({ children }) {
  const [isPlay, setIsPlay] = useState(false);
  const { messages, fillMessages_to_play, resetMessages_to_play } =
    useContext(MessageContext);
  const { SST } = useContext(SSTContext);

  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  const playTalk_oneMessage = (messages, count) => {
    synth.cancel();
    const { select_voice_num, speak_pitch, speak_speed } = SST;

    const utterThis = new SpeechSynthesisUtterance(messages[count].text);

    utterThis.voice = voices[select_voice_num];
    utterThis.pitch = speak_pitch;
    utterThis.rate = speak_speed;

    if (count === 0) {
      setTimeout(() => {
        fillMessages_to_play(messages[count]);
        synth.speak(utterThis);
      }, 500);
    } else {
      fillMessages_to_play(messages[count]);
      synth.speak(utterThis);
    }

    utterThis.addEventListener("end", (event) => {
      count++;
      if (messages.length !== count) playTalk_oneMessage(messages, count);
    });
  };

  const startTalkPlayer = () => {
    setIsPlay(true);

    let count = 0;
    playTalk_oneMessage(messages, count);
  };

  const stopTalkPlayer = () => {
    synth.cancel();
    setIsPlay(false);
    resetMessages_to_play();
  };

  return (
    <TalkPlayerContext.Provider
      value={{
        isPlay,
        startTalkPlayer,
        stopTalkPlayer,
      }}
    >
      {children}
    </TalkPlayerContext.Provider>
  );
}
