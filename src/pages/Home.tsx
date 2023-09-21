import { Transcript, Form, Sales } from "../components";
import { useContextState } from "../context/ContextProvider";

const Home = () => {
  const { toogleAsistant } = useContextState();
  return (
    <div className="flex py-5 flex-col justify-between gap-6">
      <div className="max-h-[73vh] overflow-y-auto scrollbar scrollbar-w-[4px] scrollbar-h-[4px] scroll-thumb-violet-500 scrollbar-track-white">{toogleAsistant ? <Transcript /> : <Sales />}</div>
      <Form />
    </div>
  );
};

export default Home;
