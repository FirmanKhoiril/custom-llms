import { useNavigate } from "react-router-dom";
import { useContextState } from "../context/ContextProvider";
import { TData } from "../types/Types";

const FilterSearch = () => {
  const navigate = useNavigate();
  const { setSelectedName, selectedName, setToogleFilterSearch, setSearchTranscript, searchTranscript } = useContextState();

  return (
    <div className="py-6 px-2  absolute z-10 bg-[#3b3d40] grow min-w-[320px] max-w-[340px]">
      {searchTranscript.length !== 0 ? (
        <div className="flex flex-col gap-2">
          {searchTranscript.map((item: TData) => (
            <button
              key={item._id}
              type="button"
              onClick={() => {
                setSelectedName(item._id);
                if (selectedName.length === 0) return;
                navigate(`/chat/${selectedName}`, { replace: true });
                setSelectedName("");
                setSearchTranscript([]);
                setToogleFilterSearch(false);
              }}
            >
              {item.title}
            </button>
          ))}
        </div>
      ) : (
        <div className="">Start Writing...</div>
      )}
    </div>
  );
};

export default FilterSearch;
