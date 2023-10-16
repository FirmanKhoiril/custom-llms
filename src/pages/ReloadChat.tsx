import { useNavigate, useParams } from "react-router-dom";
import { CardTranscript, Conversation, Form, MicAudio, StopAudio } from "../components";
import { TContent, TConversation } from "../types/Types";
import { useContextState } from "../context/ContextProvider";
import { Box } from "@mui/material";
import { useSpeechRecognition } from "react-speech-recognition";
import { useMutation, useQueryClient } from "react-query";
import { saveConversation } from "../api/fetchResponse";
import { useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";

const ReloadChat = () => {
  const client = useQueryClient();
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { transcript, listening } = useSpeechRecognition();
  const { startRecording, stopRecording, recordingBlob, isRecording } = useAudioRecorder();
  const { toogleAsistant, conversationRecording, successRecommendation, setSuccessRecommendation, username } = useContextState();

  const { mutate: savesConversation } = useMutation({
    mutationFn: ({ transcript, chatId }: TContent) => saveConversation({ transcript, chatId }),
    onSuccess: () => {
      client.invalidateQueries("getTranscript");
      setSuccessRecommendation(false);
    },
  });

  useEffect(() => {
    if (!chatId) {
      navigate("/", {
        replace: true,
      });
    }
  }, [chatId, navigate]);

  useEffect(() => {
    savesConversation({ transcript: conversationRecording, chatId });

    return () => setSuccessRecommendation(false);
  }, [successRecommendation, conversationRecording, chatId, setSuccessRecommendation]);

  return (
    <div className="py-2">
      <div className="max-h-[85vh] w-full overflow-y-auto scrollbar-none">
        {toogleAsistant ? (
          <div className="flex flex-col gap-4 w-full justify-between  max-h-[85vh]">
            {!listening && <MicAudio startRecording={startRecording} />}
            <div className="px-4 flex w-full gap-3 items-end  rounded-lg mt-2  py-2 min-h-[85px] ">
              {transcript !== "" && (
                <div className="flex gap-2 justify-between">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-bold">{username}:</h1>
                    <p>{transcript}</p>
                  </div>
                </div>
              )}
            </div>
            {conversationRecording.length !== 0 && (
              <div className="flex flex-col gap-2 relative">
                {conversationRecording.map((item: TConversation, idx: number) => (
                  <CardTranscript item={item} key={item._id} i={idx} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="">
            {conversationRecording.length !== 0 && (
              <div className="flex flex-col gap-2 relative">
                {conversationRecording.map((item: TConversation, idx: number) => (
                  <Conversation item={item} key={item._id} i={idx} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {toogleAsistant && listening && isRecording && <StopAudio stopRecording={stopRecording} recordingBlob={recordingBlob} />}
      {!toogleAsistant && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "center" }}>
          <Form />
        </Box>
      )}
    </div>
  );
};

export default ReloadChat;
