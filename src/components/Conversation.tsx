import { BsFillMicFill } from "react-icons/bs";
import { FaRobot } from "react-icons/fa";
import { IConversation } from "../types/Types";

const Conversation = ({ item }: IConversation) => {
  const handleTextToSpeech = (content: string) => {
    let speech = new SpeechSynthesisUtterance();
    let voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0]; // male
    speech.text = content;
    window.speechSynthesis.speak(speech);
  };
  return (
    <div className={`${item.role === "Sales Copilot" ? "dark:bg-white/10 bg-black/10  " : ""}  px-4 flex gap-3 flex-col rounded-lg  py-6 min-h-[80px]`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {item.role === "Sales Copilot" ? <FaRobot size={20} /> : ""}
          <h1 className={`${item.role === "user" ? "text-violet-400" : ""} capitalize text-lg font-bold`}>{item.role === "user" ? "You" : item.role}:</h1>
        </div>
        {item.role === "Sales Copilot" ? (
          <button name="buttonAddText" onClick={() => handleTextToSpeech(item.content)} aria-label="buttonAddText" type="button" className="p-2 dark:hover:bg-white/30 hover:bg-black/30 rounded-lg bg-black/20 text-white dark:bg-white/20">
            <BsFillMicFill size={20} />
          </button>
        ) : (
          ""
        )}
      </div>
      <p className="text-black/90 dark:text-white/90">{item.content}</p>
    </div>
  );
};

export default Conversation;
