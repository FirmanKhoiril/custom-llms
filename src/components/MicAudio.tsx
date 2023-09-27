import "regenerator-runtime/runtime";
import { BsFillMicMuteFill, BsFillMicFill } from "react-icons/bs";
import { useContextState } from "../context/ContextProvider";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { PiSpeakerSlashBold } from "react-icons/pi";

const MicAudio = () => {
  const { mic, setMic, setMicText } = useContextState();
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="flex flex-col items-center gap-2">
        <PiSpeakerSlashBold size={25} />
        <span className="text-black/70 dark:text-white/70">Browser Doesn't Support Speech Recognition</span>
      </div>
    );
  }

  return (
    <>
      {mic ? (
        <button
          type="button"
          onClick={() => {
            setMic(false);
            setMicText(transcript);
            SpeechRecognition.stopListening();
            resetTranscript();
          }}
          name="buttonMic"
          aria-label="buttonMicOffOn"
          className=" py-5 px-4 sm:px-5 mt-4 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 hover:from-blue-500 hover:via-blue-300 hover:to-blue-400 text-white drop-shadow-lg rounded-xl"
        >
          <BsFillMicFill size={25} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            SpeechRecognition.startListening();
            setMic(true);
          }}
          name="buttonMic"
          aria-label="buttonMicOffOn"
          className=" py-5 px-4 sm:px-5 mt-4 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 hover:from-blue-500 hover:via-blue-300 hover:to-blue-400 text-white drop-shadow-lg rounded-xl"
        >
          <BsFillMicMuteFill size={25} />
        </button>
      )}
    </>
  );
};

export default MicAudio;
