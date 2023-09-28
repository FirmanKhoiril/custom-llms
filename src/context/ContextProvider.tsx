import { useState, useContext, createContext, useMemo } from "react";

const StateContext = createContext({});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [toogleAsistant, setToogleAsistant] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [transcriptName, setTranscriptName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [mic, setMic] = useState(false);
  const [micText, setMicText] = useState("");
  const [toogleFilterSearch, setToogleFilterSearch] = useState(false);
  const [searchTranscript, setSearchTranscript] = useState([]);

  const values = useMemo(
    () => ({
      dark,
      searchTranscript,
      setSearchTranscript,
      micText,
      setMicText,
      mic,
      setMic,
      setDark,
      conversation,
      setConversation,
      transcriptName,
      selectedName,
      setSelectedName,
      setTranscriptName,
      showModal,
      setShowModal,
      currentTitle,
      setCurrentTitle,
      userInput,
      setUserInput,
      toogleAsistant,
      setToogleAsistant,
      toogleFilterSearch,
      setToogleFilterSearch,
    }),
    [
      micText,
      searchTranscript,
      setSearchTranscript,
      setMicText,
      toogleFilterSearch,
      setToogleFilterSearch,
      dark,
      mic,
      setMic,
      setDark,
      conversation,
      selectedName,
      setSelectedName,
      setConversation,
      transcriptName,
      setTranscriptName,
      showModal,
      setShowModal,
      currentTitle,
      setCurrentTitle,
      userInput,
      setUserInput,
      toogleAsistant,
      setToogleAsistant,
    ]
  );

  return <StateContext.Provider value={values}>{children}</StateContext.Provider>;
};

export const useContextState = (): any => useContext(StateContext);
