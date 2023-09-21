import { Transcript, Form, Sales } from "../components";
import { useContextState } from "../context/ContextProvider";

const Home = () => {
  const { toogleAsistant } = useContextState();
  return (
    <div className="flex py-5 flex-col justify-between gap-6">
      <div className="max-h-[73vh] overflow-y-auto">{toogleAsistant ? <Transcript /> : <Sales />}</div>
      <Form />
    </div>
  );
};

export default Home;
