import { ColorRing } from "react-loader-spinner";

const Loading = () => {
  return (
    <div>
      <ColorRing visible={true} height="25" width="24" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={["#ffffff", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]} />
    </div>
  );
};

export default Loading;
