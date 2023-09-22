import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { getTranscriptById } from "../api/fetchResponse";
import { useEffect } from "react";
import { Conversation, Loading } from "../components";
import { TConversation } from "../types/Types";

const ReloadChat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
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

  if (isLoading) return <Loading />;

  return (
    <div>
      {isSuccess ? (
        <div className="flex flex-col gap-4 pb-10">
          <h1 className="text-4xl font-bold capitalize">{data?.data.data.title}</h1>
          {data?.data.data.transcript?.map((item: TConversation, idx: number) => (
            <Conversation item={item} key={idx} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReloadChat;
