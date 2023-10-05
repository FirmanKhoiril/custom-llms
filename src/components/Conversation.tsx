import { BsFillMicFill } from "react-icons/bs";
import { IConversation } from "../types/Types";
import { useContextState } from "../context/ContextProvider";
import moment from "moment";
import { CgArrowsExpandDownLeft, CgArrowsExpandUpRight } from "react-icons/cg";
import { Tooltip } from "@mui/material";

const Conversation = ({ item, i }: IConversation) => {
  const { conversationId, setConversationId, setToogleAsistant } = useContextState();
  let speech = new SpeechSynthesisUtterance();
  let voices = window.speechSynthesis.getVoices();

  const handleTextToSpeech = (content: string) => {
    window.speechSynthesis.resume();
    speech.voice = voices[0]; // male
    speech.text = content;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className={`${item.contentBot.role === "Leadership Copilot" ? "dark:bg-white/10 bg-black/10  " : "justify-end"}  px-4 flex gap-3 flex-col rounded-lg py-6 min-h-[80px]`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h1 className={`${item.contentBot.role === "user" ? "text-violet-500" : ""} capitalize text-sm font-bold `}>{conversationId === item._id ? `Recommendations from your call with ${item.title}` : `Recommendations ${i + 1}`}</h1>
          </div>
          <p className="text-sm text-black/70 dark:text-white/70 text-[12px]">{moment(item.createdAt).format("LLL")}</p>
        </div>
        {conversationId === item._id ? (
          <Tooltip title="listening to Leadership Coach">
            <button
              name="buttonAddText"
              onClick={() => handleTextToSpeech(item.contentBot.content)}
              aria-label="buttonAddText"
              type="button"
              className="p-2 dark:hover:bg-white/30 hover:bg-black/30 rounded-lg bg-black/20 text-white drop-shadow-md dark:bg-white/20"
            >
              <BsFillMicFill size={20} />
            </button>
          </Tooltip>
        ) : (
          <Tooltip title="Expand Recommendation">
            <button
              onClick={() => {
                setConversationId(item._id);
                setToogleAsistant(false);
              }}
              type="button"
              name="buttonExpand"
              aria-label="buttonExpand"
              className=""
            >
              <CgArrowsExpandUpRight size={25} />
            </button>
          </Tooltip>
        )}
      </div>
      {conversationId === item._id ? (
        <>
          <p className="pt-4 font-bold">Leadership Coach</p>
          <div className="flex justify-between">
            <div className="text-black/90 flex pl-4 py-3 flex-col gap-1 dark:text-white/90">
              <h1 className="font-semibold text-lg">Recommendation:</h1>
              <p className=" text-sm sm:text-base">{item.contentBot.content}</p>
            </div>
            <div>
              <Tooltip title="Close Recommendation">
                <button type="button" className="hover:opacity-80 p-2 rounded-xl" onClick={() => setConversationId("")}>
                  <CgArrowsExpandDownLeft size={25} />
                </button>
              </Tooltip>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Conversation;
