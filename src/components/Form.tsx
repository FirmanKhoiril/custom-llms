import { HiMiniPaperAirplane } from "react-icons/hi2";
import { AiOutlineSearch } from "react-icons/ai";
import { useContextState } from "../context/ContextProvider";
// import { FewShotPromptTemplate, PromptTemplate, LengthBasedExampleSelector } from "langchain/prompts";
// import { LLMChain, SimpleSequentialChain } from "langchain/chains";
// import { OpenAI } from "langchain/llms/openai";
// import { StructuredOutputParser } from "langchain/output_parsers";
// import { TextLoader } from "langchain/document_loaders/fs/text";
// import { CharacterTextSplitter } from "langchain/text_splitter";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import { FaissStore } from "langchain/vectorstores/faiss";

const Form: any = () => {
  const { setUserInput, userInput } = useContextState();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //   async function chat() {
    //     const model = new OpenAI({
    //       temperature: 0,
    //       modelName: "gpt-3.5-turbo",
    //       openAIApiKey: import.meta.env.VITE_APP_OPENAI_KEY,
    //     });

    //     const parser = StructuredOutputParser.fromNamesAndDescriptions({
    //       answer: "answer to the user's question",
    //     });

    //     const formatIntruksion = parser.getFormatInstructions();
    //     const template = `Reminder: Youre SalesCopilot.
    //     Your goal is to help the user in their sales call with the customer.
    //     Using conversation transcripts, youll help create responses and guide the user labeled You.
    //     Keep your responses helpful, concise, and relevant to the conversation.
    //     The transcripts may be fragmented, incomplete, or even incorrect. Do not ask for clarification, do your best to understand what
    //     the transcripts say based on context. Be sure of everything you say.
    //     Keep responses concise and to the point. Starting now, answer the user's question based on the transcript: {question}`;

    //     const secondTemplate = `Your task is to read the transcript and discern whether the customer is raising any objections to the product or service the salesperson is selling.
    //     If the customer is simply stating their thoughts, preferences, or facts that are not specifically connected to the product or service, it is not an objection.
    //     Quote only from the transcript.
    //     Do not add, infer, or interpret anything.
    //     Example:
    //     Customer: Im not sure if I can afford this. Its a bit expensive. The sky is blue. I like the color blue.

    //     You: Im not sure if I can afford this. It's a bit expensive.
    //     If there is no objection, respond with None.
    //     Starting now, you will respond only with either the quote or None: {question} `;

    //     const threeTemplate = `You are SalesCopilot. You will be provided with a customer objection, and a selection
    //     of guidelines on how to respond to certain objections.
    //     Using the provided content, write out the objection and the actionable course of action you recommend.
    //     Objections sound like:
    //     Its too expensive.
    //     Theres no money.
    //     We dont have any budget left.
    //     I need to use this budget somewhere else.
    //     I dont want to get stuck in a contract.
    //     Were already working with another vendor.
    //     Im locked into a contract with a competitor.
    //     I can get a cheaper version somewhere else.
    //     Example of your message:
    //     It seems like the customer is {question}.
    //     I recommend you {question}.`;

    //     const fourTemplate = `You are SalesCopilot. You will be provided with a transcript of a sales call between the user and a customer.
    //     Answer any questions the user asks you. You may also assess the users performance and provide feedback. The transcripts may be fragmented, incomplete, or even incorrect. Do not ask for clarification, do your best to understand what
    //     the transcripts say based on context.
    //     The speaker labeled You in the transcripts is the user you are helping. {question}`;

    //     const prompt = new PromptTemplate({
    //       template,
    //       inputVariables: ["question"],
    //       partialVariables: {
    //         format_intructions: formatIntruksion,
    //       },
    //     });
    //     const promptTwo = new PromptTemplate({
    //       template: secondTemplate,
    //       inputVariables: ["question"],
    //       partialVariables: {
    //         format_intructions: formatIntruksion,
    //       },
    //     });
    //     const promptThree = new PromptTemplate({
    //       template: threeTemplate,
    //       inputVariables: ["question"],
    //       partialVariables: {
    //         format_intructions: formatIntruksion,
    //       },
    //     });
    //     const promptFour = new PromptTemplate({
    //       template: fourTemplate,
    //       inputVariables: ["question"],
    //       partialVariables: {
    //         format_intructions: formatIntruksion,
    //       },
    //     });
    //     const chain = new LLMChain({ llm: model, prompt: prompt });
    //     const chainTwo = new LLMChain({ llm: model, prompt: promptTwo });
    //     const chainThree = new LLMChain({ llm: model, prompt: promptThree });
    //     const chainFour = new LLMChain({ llm: model, prompt: promptFour });
    //     const overallChain = new SimpleSequentialChain({
    //       chains: [chain, chainTwo, chainThree, chainFour],
    //       verbose: true,
    //     });

    //     const result = await overallChain.run({
    //       input: userInput,
    //     });
    //     console.log(result);
    //     return result;
    //   }
    //   chat();
    //   setUserInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <button className="absolute group-focus:text-black/30 text-black group-focus:dark:text-white/30 top-[13px] left-1 p-2.5 dark:text-white rounded-xl" name="message" aria-label="message" type="submit">
        <AiOutlineSearch size={20} />
      </button>
      <input
        value={userInput}
        type="text"
        onChange={(e) => setUserInput(e.target.value)}
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
