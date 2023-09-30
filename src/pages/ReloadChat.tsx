import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { getTranscriptById } from "../api/fetchResponse";
import { useEffect } from "react";
import { Conversation, Form, Loading, MicAudio, StopAudio } from "../components";
import { TConversation } from "../types/Types";
import { useContextState } from "../context/ContextProvider";
import { Box } from "@mui/material";
import { useSpeechRecognition } from "react-speech-recognition";

const ReloadChat = () => {
  const { chatId } = useParams();
  const { transcript, listening } = useSpeechRecognition();
  const navigate = useNavigate();
  const { toogleAsistant, conversation } = useContextState();
  if (!chatId) {
    navigate("/", {
      replace: true,
    });
  }

  const {
    mutate: getTranscriptId,
    data,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (id: string | any) => getTranscriptById(id),
  });

  useEffect(() => {
    getTranscriptId(chatId);
  }, [chatId]);

  if (isLoading) return <Loading width={60} height={60} />;

  return (
    <div>
      <div className="max-h-[73vh] overflow-y-auto scrollbar-none">
        {toogleAsistant ? (
          <div className="flex flex-col gap-4 justify-between  max-h-[73vh] items-center">
            <MicAudio />
            {transcript !== "" && (
              <div className="px-4 flex w-full gap-3 flex-col rounded-lg mt-2  py-6 min-h-[80px] dark:bg-white/10 bg-black/10">
                <div className="flex gap-2 justify-between  items-center">
                  <div className="flex gap-2 items-center">
                    <h1 className="text-lg font-bold">You:</h1>
                  </div>
                </div>
                <p>{transcript}</p>
              </div>
            )}
            {isSuccess && (
              <div className="flex flex-col gap-4">
                {data?.data.data.transcript?.map((item: TConversation, idx: number) => (
                  <Conversation item={item} key={idx} chatId={chatId} title={data?.data.data.title} />
                ))}
              </div>
            )}
            {listening ? <StopAudio /> : ""}
          </div>
        ) : (
          <div className="">
            {conversation.length !== 0 ? (
              <div className="flex flex-col gap-2 relative">
                {conversation.map((item: TConversation, idx: number) => (
                  <Conversation item={item} key={idx} />
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      {!toogleAsistant && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "center" }}>
          <Form chatId={chatId} />
        </Box>
      )}
    </div>
  );
};

export default ReloadChat;
