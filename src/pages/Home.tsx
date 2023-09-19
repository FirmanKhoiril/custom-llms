import { Transcript, Form, Sales } from "../components";
import { useContextState } from "../context/ContextProvider";

const Home = () => {
  const { toogleAsistant } = useContextState();
  return (
    <div className="flex py-2 flex-col justify-between gap-2 min-h-[73vh]">
      <div className="max-h-[73vh] overflow-y-auto">{toogleAsistant ? <Sales /> : <Transcript />}</div>
      <Form />
    </div>
  );
};

export default Home;
