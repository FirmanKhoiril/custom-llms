import { useQuery } from "react-query";
import { getTranscript } from "../api/fetchResponse";
import { useNavigate } from "react-router-dom";
import { useContextState } from "../context/ContextProvider";
import toast from "react-hot-toast";
import { Loading } from ".";
import { TData } from "../types/Types";

const Conversation = () => {
  const navigate = useNavigate();
  const { selectedName, setSearchTranscript, searchTranscript, setSelectedName } = useContextState();
  const { data, isLoading, isError, isFetching, isSuccess } = useQuery(["getTranscript"], getTranscript, {
    refetchOnWindowFocus: false,
  });

  const handleLoadSelectedName = () => {
    if (searchTranscript.length !== 0) {
      navigate(`/chat/${searchTranscript}`);
      toast.success(`Make new Conversation with ${searchTranscript} `);
      setSearchTranscript("");
    } else {
      navigate(`/chat/${selectedName}`, { replace: true });
      setSelectedName("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/chat/${searchTranscript}`);
  };

  if (isLoading && isFetching) return <Loading width={60} height={60} />;

  if (isError) {
    toast.error("Error happen");
  }

  return (
    <div className=" flex pr-2 flex-col min-h-[73vh] gap-3">
      <div className="flex w-full gap-2">
        <form onSubmit={handleSubmit} className="relative">
          <input
            required
            className="bg-black/10 dark:bg-white/10 w-full outline-none border border-transparent focus:border-violet-500 placeholder:text-black/60 dark:placeholder:text-white/60  grow min-w-[300px] max-w-[340px]  py-5 px-4"
            type="text"
            placeholder="Start New Conversation"
            onChange={(e) => setSearchTranscript(e.target.value)}
          />
        </form>
        {data?.data.length === 0 ? (
          <div className="bg-black/5 outline-none w-full dark:bg-white/5  py-3 px-2 rounded-xl truncate">There's no transcript save.</div>
        ) : (
          <select className="bg-black/10 outline-none w-full dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 py-5 px-4 rounded-xl" onChange={(e) => setSelectedName(e.currentTarget.value)}>
            {isSuccess
              ? data?.data.map((transcript: TData) => (
                  <option className="px-2 dark:text-black" key={transcript._id} value={transcript._id}>
                    {transcript.title}
                  </option>
                ))
              : ""}
          </select>
        )}
      </div>
      <button
        type="button"
        name="buttonLoadSelectedName"
        aria-label="buttonLoadSelectedName"
        onClick={handleLoadSelectedName || handleSubmit}
        className="py-3.5 drop-shadow-md bg-secondary font-semibold tracking-tight rounded-xl hover:bg-hoverSecondary text-white"
      >
        Load Selected Name
      </button>
    </div>
  );
};

export default Conversation;
