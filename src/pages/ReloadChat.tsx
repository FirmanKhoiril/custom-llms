import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { getTranscriptById } from "../api/fetchResponse";
import { useEffect } from "react";
import { Conversation, Loading } from "../components";
import { TConversation } from "../types/Types";
import { MdArrowBack } from "react-icons/md";

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

  if (isLoading) return <Loading width={60} height={60} />;

  const handleBack = () => {
    navigate("/");
  };
  return (
    <div>
      {isSuccess ? (
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
      ) : (
        ""
      )}
    </div>
  );
};

export default ReloadChat;
