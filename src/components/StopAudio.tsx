import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Timer, Waves } from ".";
import { RecommendedResponse, server } from "../api/fetchResponse";
import { useContextState } from "../context/ContextProvider";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { Type } from "../types/Types";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(server);

const StopAudio = () => {
  const { setSeconds, setMinutes, setConversationRecording, setSuccessRecommendation, searchTranscript, username, conversationRecording } = useContextState();

  const { finalTranscript, resetTranscript } = useSpeechRecognition();

  const { mutate: getRecommended, isSuccess } = useMutation({
    mutationFn: ({ input, title }: Type) => RecommendedResponse({ input, title }),
    onSuccess: (data) => {
      if (finalTranscript !== "") {
        const newMessage = {
          room: searchTranscript,
          content: data.data.createName.content,
        };
        socket.emit("send_message", newMessage);
        setConversationRecording((conver: any) => [...conver, data.data.createName.content]);
        console.log(conversationRecording);
      }
    },
    onError: () => {
      toast.error("Error Happens in Stop Audio");
    },
  });

  useEffect(() => {
    socket.on("receive_message", (dataContent: any) => {
      setConversationRecording((conver: any) => [...conver, dataContent]);
      setSuccessRecommendation(true);
    });
    console.log(conversationRecording);
  }, [socket, conversationRecording, isSuccess, searchTranscript]);

  const handleStopVoiceRecognition = () => {
    SpeechRecognition.stopListening();
    setSuccessRecommendation(false);
    if (finalTranscript === "") {
      toast.error("You Must Speaking to get the Answer ");
      setSeconds(0);
      setMinutes(0);
    } else {
      getRecommended({ input: finalTranscript, title: username });
      resetTranscript();
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
        <span className=" h-[10px] sm:h-[14px] w-[10px] sm:w-[14px] rounded-sm bg-white"></span>
        <p className="text-sm sm:text-base tracking-tight">Stop Recording</p>
      </button>
    </Box>
  );
};

export default StopAudio;
