import "./App.css";
import { Footer, Navbar } from "./components";
import { useContextState } from "./context/ContextProvider";
import Home from "./pages/Home";

function App() {
  const { dark } = useContextState();
  return (
    <div className={`${dark ? "light" : "dark"}`}>
      <main className="dark:bg-dark dark:text-white bg-light">
        <Navbar />
        <Home />
        <Footer />
      </main>
    </div>
  );
}

export default App;
