import { MdDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import { useContextState } from "../context/ContextProvider";

const Navbar = () => {
  const { dark, setDark } = useContextState();
  return (
    <nav className="w-full p-3 flex justify-around items-center">
      <div className="">
        <h1 className="font-bold">LearnSync</h1>
      </div>
      <div className="">
        <button type="button" name="toogleDarkMode" onClick={() => setDark(!dark)} className="border flex hover:bg-white/10 sm:min-w-[80px] items-center gap-2 text-sm border-zinc-600 hover:border-zinc-400 sm:rounded-lg rounded-full p-2">
          {dark ? <BsFillSunFill size={20} /> : <MdDarkMode size={20} />}
          <p className="sm:block hidden">{dark ? "Light" : "Dark"}</p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
