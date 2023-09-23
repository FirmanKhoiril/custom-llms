import axios from "axios";
import { TContent } from "../types/Types";

const server = "https://server-llms-app.cyclic.cloud";

// const local = "http://localhost:5000";

const api = axios.create({
  baseURL: server,
});

export const Response = async (input: string) => {
  try {
    const response: any = await api.post(`/api/question`, {
      question: input,
    });

    return response;
  } catch (error) {
    throw new Error(`${error} Error`);
  }
};

export const getTranscript = async () => {
  const response = await api.get("/api/transcript");
  return response;
};

export const getTranscriptById = async (id: string | any) => {
  const response = await api.post("/api/transcript/id", {
    id,
  });
  return response;
};

export const postTranscript = async (transcript: TContent) => {
  try {
    const response = await api.post(`/api/transcript`, {
      transcript,
    });

    return response;
  } catch (error) {
    throw new Error("Error Happen");
  }
};
