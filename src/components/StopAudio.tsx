import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Timer, Waves } from ".";
import { useContextState } from "../context/ContextProvider";

const StopAudio = () => {
  const { setSeconds, setMinutes } = useContextState();
  const { transcript } = useSpeechRecognition();

  const handleStopVoiceRecognition = () => {
    SpeechRecognition.stopListening();
    console.log(transcript);
    setSeconds(0);
    setMinutes(0);
  };
  return (
    <div
      className="
    flex w-full justify-between items-center"
    >
      <Timer />
      <Waves />
      <button type="button" onClick={handleStopVoiceRecognition} className="flex justify-around text-white items-center gap-4 py-1.5 md:py-2 px-3 md:px-4 rounded-xl bg-secondary hover:bg-hoverSecondary">
        <span className=" h-[10px] sm:h-[14px] w-[10px] sm:w-[14px] rounded-sm bg-green-500"></span>
        <p className="text-sm sm:text-base tracking-tight">Stop Recording</p>
      </button>
    </div>
  );
};

export default StopAudio;
