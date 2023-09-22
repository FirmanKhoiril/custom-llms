import { useMutation } from "react-query";
import { useContextState } from "../context/ContextProvider";
import { TContent, postTranscript } from "../api/fetchResponse";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const ModelSaveTranscript = () => {
  const { showModal, transcriptName, previoutChat, setTranscriptName, setShowModal } = useContextState();

  const {
    mutate: postTranscrip,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: async (transcript: TContent) => {
      postTranscript(transcript);
    },
    onSuccess: (data: any) => {
      console.log(data);
    },
    onError: (err: any) => {
      toast.error("error", err);
    },
  });

  const handleSaveTranscript = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postTranscrip({
      title: transcriptName,
      transcript: previoutChat,
    });
  };

  const loader = isSuccess ? "Already Save" : "Save and Exit";
  return (
    <div className="fixed z-20 inset-0 flex justify-center items-center">
      {showModal ? (
        <form onSubmit={handleSaveTranscript} className="gap-4 h-[400px] mx-4 bg-white rounded-xl  text-black w-[400px]  flex-col flex  items-center px-12 pt-6">
          <div>
            <h1 className="font-bold text-3xl text-left tracking-tighter">Sales Copilot</h1>
          </div>
          <div className="flex gap-2 flex-col pt-6 w-full">
            <label className="font-bold">*Transcript Name:</label>
            <input
              placeholder="John Wick"
              type="text"
              className="bg-black/10 outline-none placeholder:text-black/60  rounded-xl px-2 py-3 border border-transparent focus:border-violet-500 focus:drop-shadow-md"
              value={transcriptName}
              onChange={(e) => setTranscriptName(e.target.value)}
            />
          </div>
          <div className="w-full flex gap-4 justify-between">
            <button type="submit" name="buttonCloseModal" aria-label="buttonCloseModal" className="px-4 py-3 min-w-[50%] bg-violet-500 hover:bg-violet-600 hover:drop-shadow-md rounded-xl text-white">
              {isLoading ? <ColorRing visible={true} height="25" width="24" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={["#ffffff", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]} /> : loader}
            </button>
            <button
              type="button"
              name="buttonCloseModal"
              aria-label="buttonCloseModal"
              className="px-4 py-3 min-w-[50%] bg-red-500 hover:bg-red-600 hover:drop-shadow-md rounded-xl"
              onClick={() => {
                setShowModal(false);
                setTranscriptName("");
              }}
            >
              Close Modal
            </button>
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default ModelSaveTranscript;