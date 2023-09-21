import { HiMiniPaperAirplane } from "react-icons/hi2";
import { AiOutlineSearch } from "react-icons/ai";
import { useContextState } from "../context/ContextProvider";
import { Response } from "../api/fetchResponse";
import { useMutation } from "react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const Form = () => {
  const { setUserInput, userInput, conversation, currentTitle, setCurrentTitle, setPrevioutChat, setConversation } = useContextState();

  const {
    mutate: postChat,
    isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (input: string) => Response(input),
    onSuccess: (data) => {
      setConversation(data?.data?.text);
    },
    onError: (err: any) => {
      toast.error("error", err);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postChat(userInput);
  };

  useEffect(() => {
    if (!currentTitle && userInput && conversation) {
      setCurrentTitle(userInput);
    }

    if (currentTitle && conversation && userInput) {
      setPrevioutChat((prevChat: any) => [
        ...prevChat,
        {
          title: currentTitle,
          role: "user",
          content: userInput,
        },
        {
          role: "Sales Copilot",
          title: currentTitle,
          content: conversation.bot,
        },
      ]);
    }
    setUserInput("");
  }, [conversation, currentTitle]);

  if (isError) {
    toast.error("Error");
  }

  const loader = isLoading ? (
    <ColorRing visible={true} height="25" width="24" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={["#ffffff", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]} />
  ) : (
    <HiMiniPaperAirplane size={25} />
  );

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <button className="absolute group-focus:text-black/30 text-black group-focus:dark:text-white/30 top-[13px] left-1 p-2.5 dark:text-white rounded-xl" name="message" aria-label="message" type="submit">
        <AiOutlineSearch size={20} />
      </button>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Send a message"
        required
        className=" rounded-xl resize-none bg-black/10 dark:bg-white/10 outline-none border border-transparent placeholder:text-black/60 dark:placeholder:text-white/60 tracking-tight focus:border-violet-600 px-10 py-5 w-full"
      />
      <button className="bg-violet-600 absolute top-2.5 right-2 p-2.5 text-white rounded-xl hover:bg-violet-700" name="message" aria-label="message" type="button">
        {isSuccess ? <HiMiniPaperAirplane size={25} /> : loader}
      </button>
    </form>
  );
};

export default Form;
