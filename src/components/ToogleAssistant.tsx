import { useContextState } from "../context/ContextProvider";

const ToogleAssistant = () => {
  const { setToogleAsistant, toogleAsistant } = useContextState();

  return (
    <div className="flex gap-2.5 sm:gap-4 text-[12px] items-center">
      <button
        disabled={toogleAsistant}
        type="button"
        name="toogleAsistant"
        aria-label="toogleAsistant"
        onClick={() => setToogleAsistant(true)}
        className="py-1.5 md:text-base  disabled:border-violet-500 border-b-[3px] border-transparent  text-black dark:text-white  tracking-tight"
      >
        Transcript
      </button>
      <button
        type="button"
        disabled={toogleAsistant === false}
        name="toogleAsistant"
        aria-label="toogleAsistant"
        onClick={() => setToogleAsistant(false)}
        className="py-1.5 md:text-base  disabled:border-violet-500 border-b-[3px] border-transparent  text-black dark:text-white  tracking-tight"
      >
        Leadership Assistant
      </button>
    </div>
  );
};

export default ToogleAssistant;
