import { MdDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import { useContextState } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import { ToogleAssistant } from ".";
const Navbar = () => {
  const { dark, setDark, setToogleAssistant } = useContextState();

  return (
    <nav className="w-full py-3 flex justify-between items-center">
      <Link to={"/"} onClick={() => setToogleAssistant(true)}>
        <h1 className="font-bold text-xl md:text-3xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-blue-500 to-violet-400">GrowthSpark AI</h1>
      </Link>
      <ToogleAssistant />
      <div>
        <button
          type="button"
          name="toogleDarkMode"
          aria-label="toogleDarkMode"
          onClick={() => setDark(!dark)}
          className="border dark:hover:bg-white/10 text-sm dark:border-zinc-600 dark:hover:border-zinc-400 rounded-lg text-[16px] md:text-[20px]  p-1.5 md:p-2.5 border-black/40 hover:border-black/20 hover:bg-black/10"
        >
          {dark ? <BsFillSunFill /> : <MdDarkMode />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
