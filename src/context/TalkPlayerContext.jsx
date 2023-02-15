import { createContext, useContext, useState } from "react";
import { TalkContext } from "./TalkContext";
import { SSTContext } from "./SSTContext";

export const TalkPlayerContext = createContext();

export function TalkPlayerProvider({ children }) {
  const [isPlay, setIsPlay] = useState(false);
  const {
    talkList,
    getCurrentTalkMessages,
    messages,
    fillMessages_for_playback,
    resetMessages_for_playback,
  } = useContext(TalkContext);
  const { SST } = useContext(SSTContext);

  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  const playTalk_oneMessage = (messages, count) => {
    synth.cancel();
    const { select_voice_num, speak_pitch, speak_speed } = SST;
    console.log(messages);
    const utterThis = new SpeechSynthesisUtterance(messages[count].text);

    utterThis.voice = voices[select_voice_num];
    utterThis.pitch = speak_pitch;
    utterThis.rate = speak_speed;

    if (count === 0) {
      setTimeout(() => {
        fillMessages_for_playback(messages[count]);
        synth.speak(utterThis);
      }, 500);
    } else {
      fillMessages_for_playback(messages[count]);
      synth.speak(utterThis);
    }

    utterThis.addEventListener("end", (event) => {
      count++;
      if (messages.length !== count) playTalk_oneMessage(messages, count);
    });
  };

  const startTalkPlayer = () => {
    setIsPlay(true);

    const count = 0;
    const messages = getCurrentTalkMessages();

    playTalk_oneMessage(messages, count);
  };

  const stopTalkPlayer = () => {
    synth.cancel();
    setIsPlay(false);
    resetMessages_for_playback();
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
