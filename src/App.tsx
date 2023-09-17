import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components";
import { useContextState } from "./context/ContextProvider";
import Home from "./pages/Home";

function App() {
  const { dark } = useContextState();
  return (
    <div className={`${dark ? "light" : "dark"}`}>
      <main className="dark:bg-dark dark:text-white min-h-screen bg-light">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
