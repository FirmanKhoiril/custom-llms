import { useState, useContext, createContext, useMemo } from "react";

const StateContext = createContext({});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [conversationRecording, setConversationRecording] = useState([]);
  const [toogleAsistant, setToogleAsistant] = useState(false);
  const [transcriptName, setTranscriptName] = useState("");
  const [searchTranscript, setSearchTranscript] = useState<string>("");
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [conversationId, setConversationId] = useState<string>();
  const [successRecommendation, setSuccessRecommendation] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState("");
  const [voiceId, setVoiceId] = useState({
    audioId: "",
    audioUrl: "",
  });

  const values = useMemo(
    () => ({
      dark,
      minutes,
      audioUrl,
      voiceId,
      setVoiceId,
      setAudioUrl,
      conversationRecording,

      setConversationRecording,
      setMinutes,
      seconds,
      setSeconds,
      searchTranscript,
      setSearchTranscript,
      setDark,
      successRecommendation,
      setSuccessRecommendation,
      transcriptName,
      setTranscriptName,
      userInput,
      setUserInput,
      toogleAsistant,
      setToogleAsistant,
      conversationId,
      setConversationId,
      username,
      setUsername,
    }),
    [
      searchTranscript,
      voiceId,
      setVoiceId,
      username,
      audioUrl,
      setAudioUrl,
      setUsername,
      conversationId,
      successRecommendation,
      setSuccessRecommendation,
      setConversationId,
      minutes,
      conversationRecording,
      setConversationRecording,
      setMinutes,
      seconds,
      setSeconds,
      setSearchTranscript,
      dark,
      setDark,
      transcriptName,
      setTranscriptName,
      userInput,
      setUserInput,
      toogleAsistant,
      setToogleAsistant,
    ]
  );

  return <StateContext.Provider value={values}>{children}</StateContext.Provider>;
};

export const useContextState = (): any => useContext(StateContext);
