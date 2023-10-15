import moment from "moment";
import { IConversation } from "../types/Types";
import { useContextState } from "../context/ContextProvider";
import { Tooltip } from "@mui/material";
import { CgArrowsExpandUpRight } from "react-icons/cg";
import { MdOutlineSpatialAudioOff, MdSpatialAudio } from "react-icons/md";

const CardTranscript = ({ item }: IConversation) => {
  const { conversationId, setConversationId, setToogleAsistant, setVoiceId, voiceId } = useContextState();
  return (
    <div className="w-full bg-black/10 dark:bg-white/10 rounded-lg py-4 px-6">
      <div className="flex justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold">{item.title}</h1>
          {voiceId.audioId === item._id && <audio src={voiceId.audioUrl} autoPlay />}
          <p className="text-sm text-black/70 dark:text-white/70">{moment(item.createdAt).format("LLL")}</p>
        </div>
        <div className="flex gap-2">
          <Tooltip title={voiceId.audioId ? "Stop hear your voice" : "Start hear your voice"}>
            <>
              {voiceId.audioId ? (
                <button
                  onClick={() => {
                    setVoiceId({
                      audioId: "",
                      audioUrl: "",
                    });
                  }}
                  type="button"
                  name="buttonHearVoice"
                  aria-label="buttonHearVoice"
                >
                  <MdSpatialAudio size={25} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setVoiceId({
                      audioId: item._id,
                      audioUrl: item.audioUrl,
                    });
                  }}
                  type="button"
                  name="buttonHearVoice"
                  aria-label="buttonHearVoice"
                >
                  <MdOutlineSpatialAudioOff size={25} />
                </button>
              )}
            </>
          </Tooltip>
          <Tooltip title="Expand Recommendation">
            <button
              onClick={() => {
                setConversationId(item._id);
                setToogleAsistant(false);
              }}
              type="button"
              name="buttonExpand"
              aria-label="buttonExpand"
            >
              <CgArrowsExpandUpRight size={25} />
            </button>
          </Tooltip>
        </div>
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
