import { HiMiniPaperAirplane } from "react-icons/hi2";
import { AiOutlineSearch } from "react-icons/ai";

const Form = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <button className="absolute group-focus:text-black/30 text-black group-focus:dark:text-white/30 top-[13px] left-1 p-2.5 dark:text-white rounded-xl" name="message" aria-label="message" type="submit">
        <AiOutlineSearch size={20} />
      </button>
      <input
        type="text"
        placeholder="Send a message"
        required
        className=" rounded-xl bg-black/10 dark:bg-white/10 outline-none border border-transparent placeholder:text-black/60 dark:placeholder:text-white/60 tracking-tight focus:border-violet-600 px-10 py-5 w-full"
      />
      <button className="bg-violet-600 absolute top-2.5 right-2 p-2.5 text-white rounded-xl hover:bg-violet-700" name="message" aria-label="message" type="button">
        <HiMiniPaperAirplane size={25} />
      </button>
    </form>
  );
};

export default Form;
