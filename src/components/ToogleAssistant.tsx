import { useContextState } from "../context/ContextProvider";

const ToogleAssistant = () => {
  const { setToogleAsistant, toogleAsistant } = useContextState();

  return (
    <div className="flex gap-2 pb-2 text-[12px] items-center">
      <button
        disabled={toogleAsistant}
        type="button"
        name="toogleAsistant"
        aria-label="toogleAsistant"
        onClick={() => setToogleAsistant(true)}
        className="py-1.5 disabled:bg-primary px-3 rounded-lg text-white bg-violet-500 hover:violet-600"
      >
        Transcript
      </button>
      <button
        type="button"
        disabled={toogleAsistant === false}
        name="toogleAsistant"
        aria-label="toogleAsistant"
        onClick={() => setToogleAsistant(false)}
        className="disabled:bg-primary py-1.5 px-3 rounded-lg text-white bg-violet-500 hover:violet-600"
      >
        Sales Assistant
      </button>
    </div>
  );
};

export default ToogleAssistant;
