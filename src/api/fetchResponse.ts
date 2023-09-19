import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const Response = async (input: string) => {
  console.log(input);
  try {
    const response = await api.post(`/chat`, {
      input,
    });
    return response;
  } catch (error) {
    console.log("error", error);
  }
};
