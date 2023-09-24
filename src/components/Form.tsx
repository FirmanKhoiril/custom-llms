import { HiMiniPaperAirplane } from "react-icons/hi2";
import { AiOutlineSearch } from "react-icons/ai";
import { useContextState } from "../context/ContextProvider";
import { Response } from "../api/fetchResponse";
import { useMutation } from "react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { HiOutlineSaveAs } from "react-icons/hi";
import { Loading } from ".";

const Form = () => {
  const { setUserInput, userInput, conversation, currentTitle, setCurrentTitle, previoutChat, setPrevioutChat, setConversation, setShowModal } = useContextState();

  const {
    mutate: postChat,
    isLoading,
    isError,
    isSuccess,
    data,
  } = useMutation({
    mutationFn: (input: string) => Response(input),
    onSuccess: (data) => {
      setConversation(data.data.text);
    },
    onError: (err: any) => {
      toast.error("error", err);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.ButtonHTMLAttributes<HTMLButtonElement> | any) => {
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
          title: currentTitle,
          role: "Sales Copilot",
          content: conversation?.bot,
        },
      ]);
    }
    setUserInput("");
  }, [isSuccess, conversation, data, currentTitle]);

  if (isError) {
    toast.error("Error");
  }

  const loader = isLoading ? <Loading /> : <HiMiniPaperAirplane size={25} />;

  return (
    <form onSubmit={handleSubmit} className="relative group mt-4 flex">
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
        className={` bg-primary absolute  p-2.5 text-white rounded-xl drop-shadow-md hover:bg-hoverPrimary top-2.5 ${previoutChat.length === 0 ? "right-2" : " right-[64px]"}`}
        name="message"
        aria-label="message"
        type="button"
      >
        {isSuccess ? <HiMiniPaperAirplane size={25} /> : loader}
      </button>
      {previoutChat.length === 0 ? (
        ""
      ) : (
        <button
          type="button"
          name="showModalSaveTranscript"
          aria-label="showModalSaveTranscript"
          onClick={() => setShowModal(true)}
          className=" absolute text-sm rounded-xl top-2.5 right-2 drop-shadow-md bg-secondary text-white hover:bg-hoverSecondary  p-2.5"
        >
          <HiOutlineSaveAs size={25} />
        </button>
      )}
    </form>
  );
};

export default Form;
