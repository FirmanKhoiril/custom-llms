import { useState, useContext, createContext, useMemo } from "react";

const StateContext = createContext({});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [toogleAsistant, setToogleAsistant] = useState(false);
  const values = useMemo(
    () => ({ dark, setDark, conversation, setConversation, userInput, setUserInput, toogleAsistant, setToogleAsistant }),
    [dark, setDark, conversation, setConversation, userInput, setUserInput, toogleAsistant, setToogleAsistant]
  );

  return <StateContext.Provider value={values}>{children}</StateContext.Provider>;
};

export const useContextState = (): any => useContext(StateContext);
