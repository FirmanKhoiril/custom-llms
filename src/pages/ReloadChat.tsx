import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { getTranscriptById } from "../api/fetchResponse";
import { useEffect } from "react";
import { Conversation, Form, Loading, MicAudio, ToogleAssistant } from "../components";
import { TConversation } from "../types/Types";
import { MdArrowBack } from "react-icons/md";
import { useContextState } from "../context/ContextProvider";
import { Box } from "@mui/material";
import { useSpeechRecognition } from "react-speech-recognition";

const ReloadChat = () => {
  const { chatId } = useParams();
  const { transcript } = useSpeechRecognition();
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

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <ToogleAssistant />
      <div className="max-h-[73vh] overflow-y-auto scrollbar-none">
        {toogleAsistant ? (
          <div className="">
            {isSuccess && (
              <div className="flex flex-col gap-4 pb-10">
                <div className="flex justify-between items-center">
                  <div className=" flex rounded-full items-center gap-3">
                    <button type="button" className="p-2.5 hover:bg-black/10 rounded-full dark:hover:bg-white/10" name="buttonBackUrlHistory" aria-label="buttonBackUrlHistory" onClick={handleBack}>
                      <MdArrowBack size={25} />
                    </button>
                    <h1 className="text-4xl font-bold capitalize">{data?.data.data.title}</h1>
                  </div>
                </div>
                {data?.data.data.transcript?.map((item: TConversation, idx: number) => (
                  <Conversation item={item} key={idx} chatId={chatId} title={data?.data.data.title} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="">
            {conversation.length !== 0 ? (
              <div className="flex flex-col gap-2 relative">
                {conversation.map((item: TConversation, idx: number) => (
                  <Conversation item={item} key={idx} />
                ))}
                <div className="px-4 flex gap-3 flex-col rounded-lg mt-2  py-6 min-h-[80px] dark:bg-white/10 bg-black/10">
                  <div className="flex gap-2 justify-between  items-center">
                    <div className="flex gap-2 items-center">
                      <h1 className="text-lg font-bold">You:</h1>
                    </div>
                  </div>
                  <p>{transcript !== "" ? transcript : ""}</p>
                </div>
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
          <MicAudio />
        </Box>
      )}
    </div>
  );
};

export default ReloadChat;
