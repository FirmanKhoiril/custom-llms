import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ModelSaveTranscript, Navbar, ToogleAssistant } from "./components";
import { useContextState } from "./context/ContextProvider";
import Home from "./pages/Home";
import { Container } from "@mui/material";
import { Toaster } from "react-hot-toast";

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
        <Container>
          <Navbar />
          <Toaster position="top-center" reverseOrder={true} />
          <ToogleAssistant />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;
