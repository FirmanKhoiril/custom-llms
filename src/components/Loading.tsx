import { ColorRing } from "react-loader-spinner";
import { ILoading } from "../types/Types";

const Loading = ({ width, height }: ILoading) => {
  return (
    <div>
      <ColorRing visible={true} height={height ? height : "25"} width={width ? width : "24"} ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={["#ffffff", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]} />
    </div>
  );
};

export default Loading;
