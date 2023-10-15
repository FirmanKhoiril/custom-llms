import "regenerator-runtime/runtime";
import { BsFillMicFill } from "react-icons/bs";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { PiSpeakerSlashBold } from "react-icons/pi";

const MicAudio = ({ startRecording }: any) => {
  const { listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="flex flex-col items-center bg-black/10 rounded-xl dark:bg-white/10 py-6 px-4 gap-2">
        <PiSpeakerSlashBold size={25} />
        <span className="text-black/70 dark:text-white/70">Browser Doesn't Support Speech Recognition</span>
      </div>
    );
  }

  const handleStartVoiceRecognition = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    startRecording();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={handleStartVoiceRecognition}
        name="buttonMic"
        aria-label="buttonMicOn"
        className="p-5 mt-4 bg-gradient-to-r from-blue-600 via-blue-500/80 to-blue-500 hover:from-blue-500 hover:via-blue-400/80 hover:to-blue-400 text-white drop-shadow-lg rounded-full"
      >
        <BsFillMicFill size={25} />
      </button>
      <button
        onClick={handleStartVoiceRecognition}
        className={` ${listening ? "bg-hoverSecondary" : "bg-secondary"} py-2 rounded-lg text-white drop-shadow-md hover:bg-hoverSecondary text-sm px-4`}
        type="button"
        name="buttonMic"
        aria-label="buttonMicOn"
      >
        Start Recording
      </button>
    </div>
  );
};

export default MicAudio;
