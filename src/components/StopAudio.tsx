import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Timer, Waves } from ".";
import { RecommendedResponse } from "../api/fetchResponse";
import { useContextState } from "../context/ContextProvider";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { Type } from "../types/Types";

const StopAudio = () => {
  const { setSeconds, setMinutes, setSuccessRecommendation, setConversationRecording, searchTranscript } = useContextState();
  const { finalTranscript, resetTranscript } = useSpeechRecognition();

  const { mutate: getRecommended } = useMutation({
    mutationFn: ({ input, title }: Type) => RecommendedResponse({ input, title }),
    onSuccess: (data) => {
      setConversationRecording((conver: any) => [...conver, data?.data?.createName?.content]);
      setSuccessRecommendation(true);
    },
    onError: () => {
      toast.error("Error Happens in Stop Audio");
    },
  });

  const handleStopVoiceRecognition = () => {
    SpeechRecognition.stopListening();
    if (finalTranscript === "") return toast.error("You Must Speaking to get the Answer ");
    getRecommended({ input: finalTranscript, title: searchTranscript });
    resetTranscript();
    setSuccessRecommendation(true);
    setSeconds(0);
    setMinutes(0);
  };

  return (
    <div
      className="
    flex w-full justify-between py-6 items-center"
    >
      <Timer />
      <Waves />

      <button type="button" onClick={handleStopVoiceRecognition} className="flex justify-around text-white items-center gap-4 py-2 px-4 md:px-6 rounded-xl bg-secondary hover:bg-hoverSecondary">
        <span className=" h-[10px] sm:h-[14px] w-[10px] sm:w-[14px] rounded-sm bg-white"></span>
        <p className="text-sm sm:text-base tracking-tight">Stop Recording</p>
      </button>
    </div>
  );
};

export default StopAudio;
