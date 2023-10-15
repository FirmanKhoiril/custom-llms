import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Timer, Waves } from ".";
import { RecommendedResponse } from "../api/fetchResponse";
import { useContextState } from "../context/ContextProvider";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { Type } from "../types/Types";
import { Box } from "@mui/material";

const StopAudio = ({ stopRecording, recordingBlob }: any) => {
  const { setSeconds, setMinutes, setConversationRecording, setSuccessRecommendation, username } = useContextState();

  const { finalTranscript, resetTranscript } = useSpeechRecognition();

  const { mutate: getRecommended } = useMutation({
    mutationFn: ({ input, title, audioUrl }: Type) => RecommendedResponse({ input, title, audioUrl }),

    onSuccess: (data) => {
      setConversationRecording((conver: any) => [...conver, data.data.createName.content]);
      setSuccessRecommendation(true);
    },
    onError: () => {
      toast.error("Somethings went wrong");
    },
  });

  const handleStopVoiceRecognition = () => {
    SpeechRecognition.stopListening();
    setSuccessRecommendation(false);
    stopRecording();
    if (finalTranscript !== "" && recordingBlob) {
      const audioUrl = URL.createObjectURL(recordingBlob);
      getRecommended({ input: finalTranscript, title: username, audioUrl });

      resetTranscript();

      setSeconds(0);
      setMinutes(0);
    } else {
      toast.error("You must speaking to get the answer");
      setSeconds(0);
      setMinutes(0);
    }
  };

  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", py: 3 }}>
      <Timer />
      <Waves />
      <button
        type="button"
        name="buttonStopRecording"
        aria-label="buttonStopRecording"
        onClick={handleStopVoiceRecognition}
        className="flex justify-around text-white items-center gap-4 py-2 px-4 md:px-6 rounded-xl bg-secondary hover:bg-hoverSecondary"
      >
        <span className=" h-[10px] sm:h-[12px] w-[10px] sm:w-[12px] rounded-sm bg-white"></span>
        <p className="text-sm sm:text-base tracking-tight">Stop Recording</p>
      </button>
    </Box>
  );
};

export default StopAudio;
