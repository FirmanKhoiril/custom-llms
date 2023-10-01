import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getTranscriptById } from "../api/fetchResponse";
import { useContextState } from "../context/ContextProvider";
import { TConversation } from "../types/Types";
import { CardTranscript, Conversation, Loading } from "../components";
import toast from "react-hot-toast";

const SelectedTranscript = () => {
  const { id } = useParams();
  const { toogleAsistant } = useContextState();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isError } = useQuery(["getTranscriptById", id], () => getTranscriptById(id), {
    refetchOnWindowFocus: false,
  });

  if (!id) {
    navigate("/", {
      replace: true,
    });
  }

  if (isLoading && isFetching) return <Loading />;

  if (isError) toast.error("Dont have Conversation");
  return (
    <div>
      <div className="max-h-[73vh] w-full overflow-y-auto scrollbar-none">
        {toogleAsistant ? (
          <div className="flex flex-col gap-4 w-full justify-between  max-h-[73vh]">
            <div className="flex flex-col gap-2 relative">
              {data?.data.data.transcript.map((item: TConversation, idx: number) => (
                <CardTranscript item={item} key={item._id} i={idx} />
              ))}
            </div>
          </div>
        ) : (
          <div className="">
            <div className="flex flex-col gap-2 relative">
              {data?.data.data.transcript.map((item: TConversation, idx: number) => (
                <Conversation item={item} key={item._id} chatId={item.title} i={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedTranscript;
