import moment from "moment";
import { IConversation } from "../types/Types";
import { useContextState } from "../context/ContextProvider";
import expandBlack from "../images/expandBlack.svg";
import expand from "../images/expand.svg";
import { Tooltip } from "@mui/material";

const CardTranscript = ({ item, i }: IConversation) => {
  const { conversationId, setConversationId, dark, setToogleAsistant } = useContextState();

  return (
    <div className="w-full bg-black/10 dark:bg-white/10 rounded-lg py-4 px-6">
      <div className="flex justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold">Recording {i + 1}</h1>
          <p className="text-sm text-black/70 dark:text-white/70">{moment(item.createdAt).format("LLL")}</p>
        </div>
        <Tooltip title="Expand Conversation">
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
            <img src={dark ? expandBlack : expand} alt="Expand Icon" height={25} width={25} />
          </button>
        </Tooltip>
      </div>
      {conversationId === item._id && (
        <div className="flex justify-between">
          <div className="flex flex-col gap-2 p-4">
            <h1 className="text-lg font-semibold">{item?.title}:</h1>
            <p>{item.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardTranscript;
