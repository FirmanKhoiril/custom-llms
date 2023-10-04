import { useQuery } from "react-query";
import { getTranscriptById } from "../api/fetchResponse";

export const useGetTranscriptById = (id: string | any) => {
  const { data, isLoading, isFetching, isError, isSuccess } = useQuery(["getTranscriptById", id], () => getTranscriptById(id), {
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  };
};
