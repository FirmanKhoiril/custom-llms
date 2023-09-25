import { useContextState } from "../context/ContextProvider";
import { useEffect, useRef } from "react";
import { FaRobot } from "react-icons/fa";
import { BsFillMicFill } from "react-icons/bs";
import { Conversation } from ".";
import { TConversation } from "../types/Types";

const Sales = () => {
  const divRef: any = useRef(null);
  const { conversation } = useContextState();

  useEffect(() => {
    divRef?.current?.scrollIntoView();
  }, [conversation]);

  const handleTextToSpeech = (content: string) => {
    let speech = new SpeechSynthesisUtterance();
    let voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0]; // male
    speech.text = content;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">Chat</h1>
      <div className="px-4 flex gap-3 flex-col rounded-lg mt-2  py-6 min-h-[80px] dark:bg-white/10 bg-black/10">
        <div className="flex gap-2 justify-between  items-center">
          <div className="flex gap-2 items-center">
            <FaRobot size={20} />
            <h1 className="text-lg font-bold">Sales Copilot:</h1>
          </div>
          <button
            name="buttonAddText"
            aria-label="buttonAddText"
            onClick={() => {
              handleTextToSpeech("Hi! I'm your personal sales assistant. if you have any questions, want advice, or anything else, just send me a message!");
            }}
            type="button"
            className="p-2 dark:hover:bg-white/30 hover:bg-black/30 rounded-lg bg-black/20 text-white dark:bg-white/20"
          >
            <BsFillMicFill size={20} />
          </button>
        </div>
        <p>Hi! I'm your personal sales assistant. if you have any questions, want advice, or anything else, just send me a message!</p>
      </div>
      {conversation.length === 0 ? (
        ""
      ) : (
        <div className="flex flex-col gap-2 relative">
          {conversation.map((item: TConversation, idx: number) => (
            <Conversation item={item} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sales;
