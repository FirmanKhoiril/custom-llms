import { useNavigate } from "react-router-dom";
import { useContextState } from "../context/ContextProvider";
import { toast } from "sonner";
import { Loading } from ".";
import { TData } from "../types/Types";
import moment from "moment";
import { useGetAllTranscript } from "../hooks/useGetAllTranscript";

import { io } from "socket.io-client";

export const socket = io("http://localhost:5000");

const Conversation = () => {
  const navigate = useNavigate();
  const { setSearchTranscript, searchTranscript, username, setUsername, setToogleAsistant } = useContextState();

  const { data, isError, isFetching, isLoading, isSuccess } = useGetAllTranscript();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (username !== "" && searchTranscript !== "" && socket.connected) {
      socket.emit("join_room", searchTranscript);
      e.preventDefault();
      navigate(`/chat/${searchTranscript}`);
      toast.success(` ${username} Join  group   ${searchTranscript} `);
      setToogleAsistant(true);
    }
  };

  if (isLoading && isFetching) return <Loading width={60} height={60} />;

  if (isError) toast.error("Make sure Connection is connected");

  return (
    <div className=" flex pr-2 flex-col min-h-[73vh] gap-3">
      <div className="flex w-full gap-2">
        <form onSubmit={handleSubmit} className="relative w-full flex flex-col gap-3.5">
          <input
            required
            className="rounded-xl resize-none bg-black/5 dark:bg-white/10 outline-none border border-violet-600/20 placeholder:text-black/60 shadow-sm dark:placeholder:text-white/60 tracking-tight focus:border-violet-600 px-4 py-5 w-full"
            type="text"
            value={searchTranscript}
            placeholder="Make or Join group conversation"
            onChange={(e) => setSearchTranscript(e.target.value)}
          />
          <input
            required
            className="rounded-xl resize-none bg-black/5 dark:bg-white/10 outline-none border border-violet-600/20 placeholder:text-black/60 shadow-sm dark:placeholder:text-white/60 tracking-tight focus:border-violet-600 px-4 py-5 w-full"
            type="text"
            value={username}
            placeholder="Your name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" name="handleSubmit" aria-label="handleSubmit" className="py-3.5 drop-shadow-md bg-secondary font-semibold tracking-tight rounded-xl hover:bg-hoverSecondary text-white">
            Start Conversation
          </button>
        </form>
      </div>
      <div className="">
        {data?.data.length === 0 ? (
          <div className="bg-black/5 outline-none w-full dark:bg-white/5  py-4 px-2 rounded-xl truncate">There's no transcript save.</div>
        ) : (
          isSuccess && (
            <>
              <h1 className=" pb-4 pt-6 text-2xl font-bold tracking-tighter">Previous Chat</h1>
              {data?.data
                .slice()
                .reverse()
                .map((transcript: TData) => (
                  <button
                    type="button"
                    name={`buttonSelected${transcript.chatId}`}
                    aria-label={`buttonSelected${transcript.chatId}`}
                    className="px-4 py-3 w-full dark:text-white text-black/90 dark:hover:bg-white/10 hover:bg-black/10 mb-3 border border-black/20 dark:border-white/20 hover:drop-shadow-md items-start shadow-sm flex flex-col rounded-xl"
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
