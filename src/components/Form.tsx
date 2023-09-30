import { HiMiniPaperAirplane } from "react-icons/hi2";
import "regenerator-runtime/runtime";
import { AiOutlineSearch } from "react-icons/ai";
import { useContextState } from "../context/ContextProvider";
import { RecommendedResponse } from "../api/fetchResponse";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { HiOutlineSaveAs } from "react-icons/hi";
import { Loading } from ".";
import { IForm } from "../types/Types";
import { useEffect } from "react";
import { useSpeechRecognition } from "react-speech-recognition";

const Form = ({ chatId }: IForm) => {
  const { setUserInput, userInput, currentTitle, setCurrentTitle, conversation, setConversation, setShowModal } = useContextState();
  const { transcript, finalTranscript } = useSpeechRecognition();

  const {
    mutate: postQuestion,
    isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (input: string) => RecommendedResponse(input),
    onSuccess: (data) => {
      if (!currentTitle) {
        setCurrentTitle(!finalTranscript && transcript === "" ? userInput : transcript);
      }
      setConversation((conver: any) => [
        ...conver,
        {
          title: currentTitle,
          role: "user",
          content: finalTranscript && transcript !== "" ? transcript : userInput,
        },
        {
          title: currentTitle,
          role: "Sales Copilot",
          content: data,
        },
      ]);

      setUserInput("");
    },
    onError: (err: any) => {
      toast.error("error", err);
    },
  });

  useEffect(() => {
    if (finalTranscript) {
      postQuestion(transcript);
    }
  }, [finalTranscript]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.ButtonHTMLAttributes<HTMLButtonElement> | any) => {
    e.preventDefault();

    postQuestion(userInput);
  };

  if (isError) {
    toast.error("Error");
  }

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
        className={` bg-primary absolute  p-2.5 text-white rounded-xl drop-shadow-md hover:bg-hoverPrimary top-2.5 ${!chatId && conversation.length !== 0 ? "right-[64px]" : "right-2"}`}
        name="message"
        aria-label="message"
        type="button"
      >
        {isSuccess ? <HiMiniPaperAirplane size={25} /> : loader}
      </button>
      {!chatId && conversation.length !== 0 ? (
        <button
          type="button"
          name="showModalSaveTranscript"
          aria-label="showModalSaveTranscript"
          onClick={() => setShowModal(true)}
          className=" absolute text-sm rounded-xl top-2.5 right-2 drop-shadow-md bg-secondary text-white hover:bg-hoverSecondary  p-2.5"
        >
          <HiOutlineSaveAs size={25} />
        </button>
      ) : (
        ""
      )}
    </form>
  );
};

export default Form;
