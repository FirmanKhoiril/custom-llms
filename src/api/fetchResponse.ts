import axios from "axios";

const server = "https://agile-cardigan-slug.cyclic.cloud/";

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
