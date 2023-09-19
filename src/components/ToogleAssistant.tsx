import { useContextState } from "../context/ContextProvider";

const ToogleAssistant = () => {
  const { setToogleAsistant } = useContextState();
  return (
    <div className="flex gap-2 pb-2 text-[12px] items-center">
      <button type="button" name="toogleAsistant" aria-label="toogleAsistant" onClick={() => setToogleAsistant(true)} className="py-1.5 px-3 rounded-lg text-white bg-violet-500 hover:violet-600">
        Transcript
      </button>
      <button type="button" name="toogleAsistant" aria-label="toogleAsistant" onClick={() => setToogleAsistant(false)} className="py-1.5 px-3 rounded-lg text-white bg-violet-500 hover:violet-600">
        Sales Assistant
      </button>
    </div>
  );
};

export default ToogleAssistant;
