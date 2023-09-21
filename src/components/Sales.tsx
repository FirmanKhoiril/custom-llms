import { useContextState } from "../context/ContextProvider";
import { useEffect, useRef } from "react";
import { FaRobot } from "react-icons/fa";
import { BsFillMicFill } from "react-icons/bs";
type TConversation = {
  content: string;
  user: string;
  role: string;
};
const Sales = () => {
  const divRef: any = useRef(null);
  const { previoutChat, conversation, setTextToSpeech } = useContextState();

  useEffect(() => {
    divRef?.current?.scrollIntoView();
  }, [conversation]);

  return (
    <div>
      <h1 className="text-4xl font-bold">Chat</h1>
      <div className="px-4 flex gap-3 flex-col rounded-lg mt-2  py-6 min-h-[80px] dark:bg-white/10 bg-black/10">
        <div className="flex gap-2  items-center">
          <FaRobot size={20} />
          <h1 className="text-lg font-bold">Sales Copilot:</h1>
        </div>
        <p ref={divRef}>Hi! I'm your personal sales assistant. if you have any questions, want advice, or anything else, just send me a message!</p>
      </div>
      {previoutChat.length === 0 ? (
        ""
      ) : (
        <div className="flex flex-col gap-2 relative">
          {previoutChat.map((prev: TConversation) => (
            <div className={`${prev.role === "Sales Copilot" ? "dark:bg-white/10 bg-black/10  " : ""}  px-4 flex gap-3 flex-col rounded-lg  py-6 min-h-[80px]`} key={prev.content}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {prev.role === "Sales Copilot" ? <FaRobot size={20} /> : ""}
                  <h1 className={`${prev.role === "user" ? "text-violet-400" : ""} capitalize text-lg font-bold`}>{prev.role === "user" ? "You" : prev.role}:</h1>
                </div>
                {prev.role === "Sales Copilot" ? (
                  <button
                    name="buttonAddText"
                    aria-label="buttonAddText"
                    onClick={() => {
                      setTextToSpeech(prev.content);
                    }}
                    type="button"
                    className="p-2 dark:hover:bg-white/30 hover:bg-black/30 rounded-lg bg-black/20 text-white dark:bg-white/20"
                  >
                    <BsFillMicFill size={20} />
                  </button>
                ) : (
                  ""
                )}
              </div>
              <p className="text-black/90 dark:text-white/90">{prev.content}</p>
            </div>
          ))}
        </div>
      )}

      <div ref={divRef} />
    </div>
  );
};

export default Sales;
