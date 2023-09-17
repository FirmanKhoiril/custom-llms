import { HiMiniPaperAirplane } from "react-icons/hi2";
import { AiOutlineSearch } from "react-icons/ai";
const Form = () => {
  return (
    <form className="relative group">
      <button className="absolute group-focus:text-white/60 top-[13px] left-1 p-2.5 text-white rounded-xl" name="message" aria-label="message" type="submit">
        <AiOutlineSearch size={20} />
      </button>
      <input type="text" placeholder="Send a message" className=" rounded-xl bg-white/10 outline-none border border-transparent tracking-tight focus:border-violet-600 px-10 py-5 w-full" />
      <button className="bg-violet-600 absolute top-2.5 right-2 p-2.5 text-white rounded-xl hover:bg-violet-700" name="message" aria-label="message" type="submit">
        <HiMiniPaperAirplane size={25} />
      </button>
    </form>
  );
};

export default Form;
