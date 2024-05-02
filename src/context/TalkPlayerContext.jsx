import { createContext, useCallback, useContext, useState } from "react";
import { TalkContext } from "./TalkContext";
import { TTSContext } from "./TTSContext";

export const TalkPlayerContext = createContext();

export function TalkPlayerProvider({ children }) {
  const [isPlay, setIsPlay] = useState(false);
  const {
    getActiveTalkMessages,
    fillMessages_for_playback,
    resetMessages_for_playback,
  } = useContext(TalkContext);
  const { TTS } = useContext(TTSContext);
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  /**
   * 한개의 메세지와 카운트를 받아 음성으로 읽는 함수
   */
  const speakMessages = useCallback((messages, count) => {
    synth.cancel();

    const { select_voice_num, speak_pitch, speak_speed } = TTS;
    const utterThis = new SpeechSynthesisUtterance(messages[count].text);

    utterThis.voice = voices[select_voice_num];
    utterThis.pitch = speak_pitch;
    utterThis.rate = speak_speed;

    fillMessages_for_playback(messages[count]);
    synth.speak(utterThis);

    // 음성이 종료(end)되면 다음 message를 가지고 이 함수를 다시 실행한다.
    // 마지막 메세지가 될 때까지!
    utterThis.addEventListener("end", () => {
      count++;
      if (messages.length !== count) speakMessages(messages, count);
    });
  });

  const startTalkPlayer = useCallback(() => {
    setIsPlay(true);

    const count = 0;
    const messages = getActiveTalkMessages();
    speakMessages(messages, count);
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
