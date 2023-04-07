import { createContext, useCallback, useContext, useState } from "react";
import { TalkContext } from "./TalkContext";
import { TTSContext } from "./TTSContext";

export const TalkPlayerContext = createContext();

export function TalkPlayerProvider({ children }) {
  const [isPlay, setIsPlay] = useState(false);
  const {
    getCurrentTalkMessages,
    fillMessages_for_playback,
    resetMessages_for_playback,
  } = useContext(TalkContext);
  const { TTS } = useContext(TTSContext);

  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  const playTalk_oneMessage = useCallback((messages, count) => {
    synth.cancel();
    const { select_voice_num, speak_pitch, speak_speed } = TTS;
    const utterThis = new SpeechSynthesisUtterance(messages[count].text);

    utterThis.voice = voices[select_voice_num];
    utterThis.pitch = speak_pitch;
    utterThis.rate = speak_speed;
    console.log("전");
    // 첫 메세지면 0.5s의 텀을 준다.
    if (count === 0) {
      setTimeout(() => {
        fillMessages_for_playback(messages[count]);
        synth.speak(utterThis);
      }, 500);
    } else {
      fillMessages_for_playback(messages[count]);
      synth.speak(utterThis);
    }
    console.log("후");

    // 음성이 종료되면 다음 message를 가지고 이 함수를 다시 실행한다.
    utterThis.addEventListener("end", (event) => {
      count++;
      if (messages.length !== count) playTalk_oneMessage(messages, count);
    });
  });

  const startTalkPlayer = useCallback(() => {
    setIsPlay(true);

    const count = 0;
    const messages = getCurrentTalkMessages();
    playTalk_oneMessage(messages, count);
  });

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
