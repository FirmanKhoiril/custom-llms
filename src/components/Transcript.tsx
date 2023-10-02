import { useQuery } from "react-query";
import { getTranscript } from "../api/fetchResponse";
import { useNavigate } from "react-router-dom";
import { useContextState } from "../context/ContextProvider";
import toast from "react-hot-toast";
import { Loading } from ".";
import { TData } from "../types/Types";
import moment from "moment";

const Conversation = () => {
  const navigate = useNavigate();
  const { setSearchTranscript, searchTranscript, setToogleAsistant } = useContextState();
  const { data, isLoading, isError, isFetching, isSuccess } = useQuery(["getTranscript"], getTranscript, {
    refetchOnWindowFocus: false,
  });

  const handleLoadSelectedName = () => {
    if (searchTranscript.length !== 0) {
      navigate(`/chat/${searchTranscript}`);
      toast.success(`Make new Conversation with ${searchTranscript} `);
      setToogleAsistant(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/chat/${searchTranscript}`);
    toast.success(`Make new Conversation with ${searchTranscript} `);
    setToogleAsistant(true);
  };

  if (isLoading && isFetching) return <Loading width={60} height={60} />;

  if (isError) {
    toast.error("Error happen");
  }

  return (
    <div className=" flex pr-2 flex-col min-h-[73vh] gap-3">
      <div className="flex w-full gap-2">
        <form onSubmit={handleSubmit} className="relative w-full">
          <input
            required
            className="rounded-xl resize-none bg-black/10 dark:bg-white/10 outline-none border border-transparent placeholder:text-black/60 dark:placeholder:text-white/60 tracking-tight focus:border-violet-600 px-4 py-5 w-full"
            type="text"
            value={searchTranscript}
            placeholder="Make new conversation"
            onChange={(e) => setSearchTranscript(e.target.value)}
          />
        </form>
      </div>
      <button
        type="button"
        name="buttonLoadSelectedName"
        aria-label="buttonLoadSelectedName"
        onClick={handleLoadSelectedName || handleSubmit}
        className="py-3.5 drop-shadow-md bg-secondary font-semibold tracking-tight rounded-xl hover:bg-hoverSecondary text-white"
      >
        Start Conversation
      </button>
      <div className="">
        {data?.data.length === 0 ? (
          <div className="bg-black/5 outline-none w-full dark:bg-white/5  py-4 px-2 rounded-xl truncate">There's no transcript save.</div>
        ) : (
          isSuccess && (
            <>
              <h1 className=" pb-4 pt-6 text-xl font-bold tracking-tighter">Previous Chat</h1>
              {data?.data
                .slice()
                .reverse()
                .map((transcript: TData) => (
                  <button
                    type="button"
                    name={`buttonSelected${transcript.chatId}`}
                    aria-label={`buttonSelected${transcript.chatId}`}
                    className="px-4 py-3   w-full dark:text-white text-black dark:hover:bg-white/30 hover:bg-black/30 mb-3 hover:drop-shadow-md flex flex-col rounded-xl bg-black/20 dark:bg-white/20 "
                    onClick={() => {
                      navigate(`/transcript/${transcript._id}`);
                    }}
                    key={transcript._id}
                  >
                    <p className="text-lg font-bold"> {transcript.chatId}</p>
                    <span className="text-sm text-black/70 dark:text-white/60 tracking-tight">{moment(transcript?.transcript[0]?.createdAt).fromNow()}</span>
                  </button>
                ))}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Conversation;
