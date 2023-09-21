import { HiMiniPaperAirplane } from "react-icons/hi2";
import { AiOutlineSearch } from "react-icons/ai";
import { useContextState } from "../context/ContextProvider";
import { Response } from "../api/fetchResponse";
import { useMutation } from "react-query";
import { useEffect } from "react";
import toast from "react-hot-toast/headless";

const Form = () => {
  const { setUserInput, userInput, conversation, currentTitle, setCurrentTitle, setPrevioutChat, setConversation } = useContextState();

  const { mutate: postChat } = useMutation({
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

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <button className="absolute group-focus:text-black/30 text-black group-focus:dark:text-white/30 top-[13px] left-1 p-2.5 dark:text-white rounded-xl" name="message" aria-label="message" type="submit">
        <AiOutlineSearch size={20} />
      </button>
      <input
        value={userInput}
        type="text"
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Send a message"
        required
        className=" rounded-xl bg-black/10 dark:bg-white/10 outline-none border border-transparent placeholder:text-black/60 dark:placeholder:text-white/60 tracking-tight focus:border-violet-600 px-10 py-5 w-full"
      />
      <button className="bg-violet-600 absolute top-2.5 right-2 p-2.5 text-white rounded-xl hover:bg-violet-700" name="message" aria-label="message" type="button">
        <HiMiniPaperAirplane size={25} />
      </button>
    </form>
  );
};

export default Form;
