import { useQuery } from "react-query";
import { getTranscript } from "../api/fetchResponse";
import { useNavigate } from "react-router-dom";
import { useContextState } from "../context/ContextProvider";
import toast from "react-hot-toast";
import { FilterSearch, Loading } from ".";
import { TData } from "../types/Types";

const Conversation = () => {
  const navigate = useNavigate();
  const { selectedName, setSearchTranscript, searchTranscript, setSelectedName, setToogleFilterSearch, toogleFilterSearch } = useContextState();
  const { data, isLoading, isError, isFetching, isSuccess } = useQuery(["getTranscript"], getTranscript, {
    refetchOnWindowFocus: false,
  });

  const handleLoadSelectedName = () => {
    if (selectedName.length === 0) return;
    navigate(`/chat/${selectedName}`, { replace: true });
    setSelectedName("");
  };

  const handleEnterName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const id = searchTranscript[0]?._id;
      if (searchTranscript.length === 0) return;
      navigate(`/chat/${id}`, { replace: true });
    }
  };

  if (isLoading && isFetching) return <Loading width={60} height={60} />;

  if (isError) {
    toast.error("Error happen");
  }
  return (
    <div className=" flex pr-2 flex-col min-h-[73vh] gap-3">
      <div className="flex w-full gap-2">
        <div onKeyDown={handleEnterName} className="relative">
          <input
            required
            onKeyDown={handleEnterName}
            className="bg-black/10 dark:bg-white/10 w-full outline-none border border-transparent focus:border-violet-500 placeholder:text-black/60 dark:placeholder:text-white/60  grow min-w-[320px] max-w-[340px]  py-5 px-4"
            type="text"
            onFocus={() => setToogleFilterSearch(true)}
            placeholder="Start a Load"
            onBlur={() => setToogleFilterSearch(false)}
            onChange={(e) => {
              const value = e.target.value;
              const newFilter = data?.data.filter((search: TData) => {
                return search.title.toLowerCase().includes(value.toLowerCase());
              });
              if (value === "") {
                setSearchTranscript([]);
              } else {
                setSearchTranscript(newFilter);
              }
            }}
          />
          {toogleFilterSearch ? <FilterSearch /> : ""}
        </div>
        {data?.data.length === 0 ? (
          <div className="flex gap-2">There's no transcript save in this section.</div>
        ) : (
          <select className="bg-black/10 w-full dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 py-5 px-4 rounded-xl" onChange={(e) => setSelectedName(e.currentTarget.value)}>
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
        onClick={handleLoadSelectedName}
        className="py-3.5 drop-shadow-md bg-secondary font-semibold tracking-tight rounded-xl hover:bg-hoverSecondary text-white"
      >
        Load Selected Name
      </button>
    </div>
  );
};

export default Conversation;
