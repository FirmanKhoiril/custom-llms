import { useState, useContext, createContext, useMemo } from "react";

const StateContext = createContext({});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [conversationRecording, setConversationRecording] = useState([]);
  const [toogleAsistant, setToogleAsistant] = useState(false);
  const [transcriptName, setTranscriptName] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [searchTranscript, setSearchTranscript] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [conversationId, setConversationId] = useState("");
  const [successRecommendation, setSuccessRecommendation] = useState(false);

  const values = useMemo(
    () => ({
      dark,
      minutes,
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
      selectedName,
      setSelectedName,
      setTranscriptName,
      userInput,
      setUserInput,
      toogleAsistant,
      setToogleAsistant,
      conversationId,
      setConversationId,
    }),
    [
      searchTranscript,
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
      selectedName,
      setSelectedName,
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
