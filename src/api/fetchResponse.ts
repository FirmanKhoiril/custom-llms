import axios from "axios";
import { TContent, Type } from "../types/Types";

export const server = "https://server-llms-app.cyclic.cloud";

export const local = "http://localhost:5000";
const api = axios.create({
  baseURL: server,
});

export const getTranscript = async () => {
  const response = await api.get("/api/transcript");
  return response;
};

export const Response = async (input: string) => {
  try {
    const response: any = await api.post(`/api/question`, {
      question: input,
    });
    return response?.data?.text?.bot;
  } catch (error) {
    throw new Error(`${error} Error`);
  }
};
export const RecommendedResponse = async ({ input, title, audioUrl }: Type) => {
  try {
    const response: any = await api.post(`/api/question/recomended`, {
      question: input,
      title,
      audioUrl,
    });
    return response;
  } catch (error) {
    throw new Error(`${error} Error`);
  }
};

export const getTranscriptById = async (id: any) => {
  try {
    const response = await api.post("/api/transcript/id", {
      id,
    });
    return response;
  } catch (error) {
    throw new Error(`${error} Error`);
  }
};

export const saveConversation = async ({ chatId, transcript }: TContent) => {
  try {
    const response = await api.post(`/api/save/transcript`, {
      data: transcript,
      chatId,
    });

    return response;
  } catch (error) {
    throw new Error("Error Happen");
  }
};
