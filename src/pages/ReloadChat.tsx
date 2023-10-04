import { useNavigate, useParams } from "react-router-dom";
import { CardTranscript, Conversation, Form, MicAudio, StopAudio } from "../components";
import { TContent, TConversation } from "../types/Types";
import { useContextState } from "../context/ContextProvider";
import { Box } from "@mui/material";
import { useSpeechRecognition } from "react-speech-recognition";
import { useMutation, useQueryClient } from "react-query";
import { saveConversation } from "../api/fetchResponse";
import { useEffect } from "react";

const ReloadChat = () => {
  const client = useQueryClient();
  const { chatId } = useParams();
  const { transcript, listening } = useSpeechRecognition();
  const navigate = useNavigate();
  const { toogleAsistant, conversationRecording, successRecommendation, setSuccessRecommendation } = useContextState();

  const { mutate: postConversation } = useMutation({
    mutationFn: ({ transcript, chatId }: TContent) => saveConversation({ transcript, chatId }),
    onSuccess: () => {
      client.invalidateQueries("getTranscript");
      setSuccessRecommendation(false);
    },
  });

  if (!chatId) {
    navigate("/", {
      replace: true,
    });
  }

  useEffect(() => {
    if (successRecommendation) {
      postConversation({ transcript: conversationRecording, chatId });
      setSuccessRecommendation(false);
    }
  }, [successRecommendation, conversationRecording, chatId, setSuccessRecommendation]);

  return (
    <div>
      <div className="max-h-[90vh] w-full overflow-y-auto scrollbar-none">
        {toogleAsistant ? (
          <div className="flex flex-col gap-4 w-full justify-between  max-h-[90vh]">
            {!listening && <MicAudio />}

            <div className="px-4 flex w-full gap-3 items-end  rounded-lg mt-2  py-2 min-h-[90px] ">
              {transcript !== "" && (
                <div className="flex gap-2 justify-between  i tems-center">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-bold">You:</h1>
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
            {conversationRecording.length !== 0 ? (
              <div className="flex flex-col gap-2 relative">
                {conversationRecording.map((item: TConversation, idx: number) => (
                  <Conversation item={item} key={item._id} chatId={chatId} i={idx} />
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      {toogleAsistant && listening && <StopAudio />}
      {!toogleAsistant && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "center" }}>
          <Form />
        </Box>
      )}
    </div>
  );
};

export default ReloadChat;
