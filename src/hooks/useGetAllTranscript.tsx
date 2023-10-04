import { useQuery } from "react-query";
import { getTranscript } from "../api/fetchResponse";

export const useGetAllTranscript = () => {
  const { data, isLoading, isError, isFetching, isSuccess } = useQuery(["getTranscript"], getTranscript, {
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  };
};
