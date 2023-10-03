import { authToken, createMeeting } from "../api/videosdkApi";
import { useContextState } from "../context/ContextProvider";

import { MeetingProvider } from "@videosdk.live/react-sdk";
import { JoinScreen, MeetingView } from "../utils/videosdk";
import { useLocation } from "react-router-dom";

const VideoMeeting = () => {
  const { setMeetingId, meetingId, searchTranscript } = useContextState();

  const getMeetingAndToken = async (id?: string) => {
    const meetingId = id === null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const name = pathSegments[pathSegments.length - 1];

  const onMeetingLeave = () => {
    setMeetingId(null);
  };
  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: searchTranscript !== "" ? searchTranscript : name,
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
};

export default VideoMeeting;
