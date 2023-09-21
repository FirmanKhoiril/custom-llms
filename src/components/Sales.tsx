import { useContextState } from "../context/ContextProvider";
import { useEffect, useRef } from "react";
import { FaRobot } from "react-icons/fa";
type TConversation = {
  content: string;
  user: string;
  role: string;
};
const Sales = () => {
  const divRef: any = useRef(null);
  const { previoutChat, conversation } = useContextState();

  useEffect(() => {
    divRef?.current?.scrollIntoView();
  }, [conversation]);

  return (
    <div>
      <h1 className="text-4xl font-bold">Chat</h1>

      <div className="flex flex-col gap-2">
        {!previoutChat ? (
          <div>Chat now</div>
        ) : (
          <div className="flex flex-col gap-2">
            {previoutChat.map((prev: TConversation) => (
              <div className={`${prev.role === "Sales Copilot" ? "dark:bg-white/10 bg-black/10  rounded-lg" : ""}  px-4 flex gap-3 flex-col  py-6 min-h-[80px]`} key={prev.content}>
                <div className="flex items-center gap-2">
                  {prev.role === "Sales Copilot" ? <FaRobot size={18} /> : ""}
                  <h1 className={`${prev.role === "user" ? "text-violet-400" : ""} capitalize text-lg font-bold`}>{prev.role === "user" ? "You" : prev.role}:</h1>
                </div>
                <p className="">{prev.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div ref={divRef} />
    </div>
  );
};

export default Sales;
