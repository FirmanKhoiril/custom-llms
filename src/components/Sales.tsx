import { useContextState } from "../context/ContextProvider";
type TConversation = {
  content: string;
  user: string;
  role: string;
};
const Sales = () => {
  const { previoutChat } = useContextState();

  return (
    <div>
      <h1 className="text-4xl font-bold">Chat</h1>

      <div className="flex flex-col gap-2">
        {!previoutChat ? (
          <div>Chat now</div>
        ) : (
          <div className="flex flex-col gap-2">
            {previoutChat.map((prev: TConversation, i: number) => (
              <div className={`${prev.role === "Sales Copilot" ? "bg-white/10 rounded-lg" : ""}  px-4 flex gap-4 justify-between flex-wrap  py-6 items-center min-h-[80px]`} key={prev.role + i}>
                <h1 className={`${prev.role === "user" ? "text-violet-400" : ""} capitalize text-lg`}>{prev.role === "user" ? "You" : prev.role}:</h1>
                <p>{prev.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;
