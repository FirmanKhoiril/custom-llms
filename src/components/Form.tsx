import { HiMiniPaperAirplane } from "react-icons/hi2";
import "regenerator-runtime/runtime";
import { AiOutlineSearch } from "react-icons/ai";
import { useContextState } from "../context/ContextProvider";
import { Response } from "../api/fetchResponse";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { Loading } from ".";
import { generateRandomId } from "../hooks/generateRandomId";

const Form = () => {
  const { setUserInput, userInput, searchTranscript, setConversationRecording } = useContextState();

  const randomId = generateRandomId();

  const {
    mutate: postQuestion,
    isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (input: string) => Response(input),
    onSuccess: (data) => {
      const newItem = {
        title: searchTranscript,
        role: "You",
        content: userInput,
        audioUrl: "",
        contentBot: {
          title: searchTranscript,
          _id: randomId,
          role: "Leadership Copilot",
          content: data,
        },
      };

      setConversationRecording((conver: any) => [...conver, newItem]);

      setUserInput("");
    },
    onError: (err: any) => {
      toast.error("error", err);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.ButtonHTMLAttributes<HTMLButtonElement> | any) => {
    e.preventDefault();
    if (userInput === "") {
      toast.error("Input has to be required");
    } else {
      postQuestion(userInput);
    }
  };

  if (isError) toast.error("Error");

  const loader = isLoading ? <Loading /> : <HiMiniPaperAirplane size={25} />;

  return (
    <form onSubmit={handleSubmit} className="relative w-full group mt-4 flex">
      <button className="absolute group-focus:text-black/30 text-black group-focus:dark:text-white/30 top-[13px] left-1 p-2.5 dark:text-white rounded-xl" name="message" aria-label="message" type="submit">
        <AiOutlineSearch size={20} />
      </button>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Send a message"
        required
        className=" rounded-xl resize-none bg-black/10 dark:bg-white/10 outline-none border border-transparent placeholder:text-black/60 dark:placeholder:text-white/60 tracking-tight focus:border-violet-600 pl-10 pr-32 py-5 w-full"
      />
      <button
        onClick={handleSubmit}
        className={` ${userInput !== "" ? "bg-primary hover:bg-hoverPrimary text-white" : "text-violet-400 hover:text-violet-500"} absolute  p-2.5  rounded-xl drop-shadow-md  top-2.5 right-2`}
        name="message"
        aria-label="message"
        type="button"
      >
        {isSuccess ? <HiMiniPaperAirplane size={25} /> : loader}
      </button>
    </form>
  );
};

export default Form;
