import { MdDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import { useContextState } from "../context/ContextProvider";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { dark, setDark } = useContextState();

  return (
    <nav className="w-full p-3 flex justify-between sm:mx-0 sm:justify-around items-center">
      <Link to={"/"}>
        <h1 className="font-bold text-3xl tracking-tighter">Sales Copilot</h1>
      </Link>
      <div>
        <button
          type="button"
          name="toogleDarkMode"
          aria-label="toogleDarkMode"
          onClick={() => setDark(!dark)}
          className="border dark:hover:bg-white/10 text-sm dark:border-zinc-600 dark:hover:border-zinc-400 rounded-lg  p-2.5 border-black/40 hover:border-black/20 hover:bg-black/10"
        >
          {dark ? <BsFillSunFill size={20} /> : <MdDarkMode size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
