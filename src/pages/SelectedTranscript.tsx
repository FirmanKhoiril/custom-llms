import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getTranscriptById } from "../api/fetchResponse";
import { useContextState } from "../context/ContextProvider";
import { TConversation } from "../types/Types";
import { CardTranscript, Conversation, Loading } from "../components";
import { toast } from "sonner";
import { Box } from "@mui/material";

const SelectedTranscript = () => {
  const { id } = useParams();
  const { toogleAsistant } = useContextState();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isError, isSuccess } = useQuery(["getTranscriptById", id], () => getTranscriptById(id), {
    refetchOnWindowFocus: false,
  });

  if (!id) {
    navigate("/", {
      replace: true,
    });
  }

  if (isLoading && isFetching) return <Loading />;

  if (isError && data?.data.data.transcript.length === 0) toast.error("Dont have Conversation");

  return (
    <div className="max-h-[88vh] w-full overflow-y-auto scrollbar-none">
      {isSuccess &&
        data?.data.data.transcript.length !== 0 &&
        (toogleAsistant ? (
          <div className="flex flex-col gap-4 w-full justify-between  max-h-[73vh]">
            <div className="flex flex-col gap-2 relative">
              {data?.data.data.transcript.map((item: TConversation, idx: number) => (
                <CardTranscript item={item} key={item._id} i={idx} />
              ))}
            </div>
          </div>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, position: "relative" }}>
            {data?.data.data.transcript.map((item: TConversation, idx: number) => (
              <Conversation item={item} key={item._id} chatId={item.title} i={idx} />
            ))}
          </Box>
        ))}
    </div>
  );
};

export default SelectedTranscript;
