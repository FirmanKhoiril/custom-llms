import { useQuery } from "react-query";
import { getTranscript } from "../api/fetchResponse";
import { useNavigate } from "react-router-dom";
import { useContextState } from "../context/ContextProvider";
import toast from "react-hot-toast";
import { Loading } from ".";
import { TData } from "../types/Types";

const Conversation = () => {
  const navigate = useNavigate();
  const { selectedName, setSelectedName } = useContextState();
  const { data, isLoading, isError, isFetching, isSuccess } = useQuery(["getTranscript"], getTranscript, {
    refetchOnWindowFocus: false,
  });

  const handleLoadSelectedName = () => {
    navigate(`/chat/${selectedName}`, { replace: true });
    setSelectedName("");
  };

  if (isLoading || isFetching) return <Loading />;

  if (isError) {
    toast.error("Error happen");
  }
  return (
    <div className=" flex pr-2 flex-col gap-3">
      {data?.data.length === 0 ? (
        <div className="flex gap-2">There's no transcript save in this section.</div>
      ) : (
        <select className="bg-black/10 dark:bg-white/10 py-5 px-4 rounded-xl" onChange={(e) => setSelectedName(e.currentTarget.value)}>
          {isSuccess
            ? data?.data.map((transcript: TData) => (
                <option className="px-2 dark:text-black" key={transcript._id} value={transcript._id}>
                  {transcript.title}
                </option>
              ))
            : ""}
        </select>
      )}
      <button
        type="button"
        name="buttonLoadSelectedName"
        aria-label="buttonLoadSelectedName"
        onClick={handleLoadSelectedName}
        className="py-3.5 drop-shadow-md bg-blue-500 font-semibold tracking-tight rounded-xl hover:bg-blue-600 text-white"
      >
        Load Selected Name
      </button>
    </div>
  );
};

export default Conversation;
