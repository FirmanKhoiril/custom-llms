import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ModelSaveTranscript, Navbar } from "./components";
import { useContextState } from "./context/ContextProvider";
import { Container } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { ReloadChat, Home } from "./pages";

function App() {
  const { dark, showModal } = useContextState();
  return (
    <div className={`${dark ? "light" : "dark"} `}>
      <main className="dark:bg-dark dark:text-white w-full  min-h-screen bg-light">
        {showModal ? (
          <>
            <div className="blackscreen"></div>
            <ModelSaveTranscript />
          </>
        ) : (
          ""
        )}
        <Toaster position="top-center" />
        <Container>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<ReloadChat />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;
