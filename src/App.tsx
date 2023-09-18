import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar, ToogleAssistant } from "./components";
import { useContextState } from "./context/ContextProvider";
import Home from "./pages/Home";
import { Container } from "@mui/material";

function App() {
  const { dark } = useContextState();
  return (
    <div className={`${dark ? "light" : "dark"}`}>
      <main className="dark:bg-dark dark:text-white min-h-screen bg-light">
        <Container>
          <Navbar />
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
