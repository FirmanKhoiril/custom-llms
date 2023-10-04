import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components";
import { useContextState } from "./context/ContextProvider";
import { Container } from "@mui/material";
import { Toaster } from "sonner";
import { ReloadChat, Home, SelectedTranscript } from "./pages";

function App() {
  const { dark } = useContextState();
  return (
    <div className={`${dark ? "light" : "dark"} `}>
      <main className="dark:bg-dark dark:text-white w-full  min-h-screen bg-light">
        <Toaster position="top-center" richColors theme={dark ? "light" : "dark"} />
        <Container>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<ReloadChat />} />
            <Route path="/transcript/:id" element={<SelectedTranscript />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;
