import { Conversation, Form, Sales } from "../components";
import { useContextState } from "../context/ContextProvider";

const Home = () => {
  const { toogleAsistant } = useContextState();
  return (
    <div className="flex py-4 flex-col justify-between gap-2 min-h-[50vh]">
      <div className="max-h-[73vh] min-h-[73vh] overflow-y-auto">{toogleAsistant ? <Conversation /> : <Sales />}</div>
      <Form />
    </div>
  );
};

export default Home;
