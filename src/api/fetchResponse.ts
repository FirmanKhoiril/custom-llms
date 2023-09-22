import axios from "axios";

const server = "https://agile-cardigan-slug.cyclic.cloud/";
// const local = "http://localhost:5000";

export type TContent = {
  title: string;
  transcript: [
    {
      role: string;
      content: string;
      title: string;
    }
  ];
};
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
    console.log("error", error);
  }
};

export const postTranscript = async (transcript: TContent) => {
  try {
    const response = await api.post(`/api/transcript`, {
      transcript,
    });

    return response;
  } catch (error) {
    console.log(`${error}error`);
  }
};
