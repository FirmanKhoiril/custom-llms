import { useEffect } from "react";
import "regenerator-runtime/runtime";

import { useContextState } from "../context/ContextProvider";
import { useSpeechRecognition } from "react-speech-recognition";

const Timer = () => {
  const { listening, finalTranscript } = useSpeechRecognition();
  const { seconds, setSeconds, minutes, setMinutes } = useContextState();

  useEffect(() => {
    let timeInterval: any;

    const updateTimer = () => {
      setSeconds((prevSeconds: number) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes: number) => prevMinutes + 1);
          return 0;
        }
        return prevSeconds + 1;
      });
    };

    if (listening) {
      timeInterval = setInterval(updateTimer, 1000);
    }

    return () => {
      clearInterval(timeInterval);
    };
  }, [listening, finalTranscript]);

  return (
    <div className="flex gap-2 items-center">
      <h1>{`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</h1>
    </div>
  );
};

export default Timer;
