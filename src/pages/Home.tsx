import { Transcript, Form, Sales, ToogleAssistant } from "../components";
import { useContextState } from "../context/ContextProvider";

const Home = () => {
  const { toogleAsistant } = useContextState();
  return (
    <div className="flex py-5 flex-col justify-between gap-2">
      <ToogleAssistant />
      <div className="max-h-[73vh] overflow-y-auto scrollbar-none">{toogleAsistant ? <Transcript /> : <Sales />}</div>
      {!toogleAsistant && <Form />}
    </div>
  );
};

export default Home;
