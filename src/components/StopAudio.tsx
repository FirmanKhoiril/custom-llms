import "regenerator-runtime/runtime";
// import { BsFillMicMuteFill } from "react-icons/bs";
import SpeechRecognition from "react-speech-recognition";

// { useSpeechRecognition }
const StopAudio = () => {
  // const { finalTranscript, transcript } = useSpeechRecognition();

  const handleStopVoiceRecognition = () => {
    SpeechRecognition.abortListening();
  };
  return (
    <div
      className="
    flex w-full justify-between items-center"
    >
      <div className="">Timer</div>
      <div className="">Sound Wave</div>
      <button type="button" onClick={handleStopVoiceRecognition} className="flex justify-around text-white items-center gap-4 py-2 px-4 rounded-xl bg-secondary hover:bg-hoverSecondary">
        <span className=" h-[14px] w-[14px] rounded-sm bg-green-500"></span>
        <p>Stop Recording</p>
      </button>
    </div>
  );
};

export default StopAudio;
