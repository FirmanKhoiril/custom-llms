import { useContextState } from "../context/ContextProvider";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import { useEffect, useMemo, useRef } from "react";
import { FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";
import { Loading } from "../components";
import { useNavigate } from "react-router-dom";

export function JoinScreen({ getMeetingAndToken }: { getMeetingAndToken: (meeting?: string) => void }) {
  const { meetingId, setMeetingId } = useContextState();
  const onClick = async () => {
    getMeetingAndToken(meetingId);
  };
  return (
    <div className="flex flex-col my-4 gap-2">
      <input
        type="text"
        className="px-6 py-8 outline-none placeholder:text-black/60 dark:placeholder:text-white/50 border border-black/10 focus:border-violet-500 bg-white/5 rounded-md dark:bg-whitey5"
        placeholder="Copy Meeting Id"
        required
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <div className="text-white flex gap-2 mt-4 items-center">
        <button type="button" name="joinMeeting" aria-label="joinMeeting" className="px-4 py-3 bg-secondary hover:bg-hoverSecondary min-w-[150px] rounded-lg drop-shadow-md font-semibold" onClick={onClick}>
          Join
        </button>
        <p className="text-slate-600 dark:text-slate-400">or</p>
        <button type="button" name="createMeetingId" aria-label="createMeetingId" className="px-4 py-3 bg-primary hover:bg-hoverPrimary min-w-[150px] rounded-lg drop-shadow-md font-semibold" onClick={onClick}>
          Create Meeting
        </button>
      </div>
    </div>
  );
}

function ParticipantView({ participantId }: { participantId: string }) {
  const micRef = useRef<HTMLAudioElement>(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current.play().catch((error) => console.error("videoElem.current.play() failed", error));
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div key={participantId} className="flex flex-col gap-2 ">
      <p className="sm:text-base text-sm">
        Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic: {micOn ? "ON" : "OFF"}
      </p>
      <audio ref={micRef} autoPlay muted={isLocal} />
      {webcamOn && (
        <ReactPlayer
          playsinline
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          //
          url={videoStream}
          //
          height={"200px"}
          width={"300px"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
}

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  const navigate = useNavigate();
  return (
    <div className="flex gap-4 py-4 items-center flex-wrap">
      <button
        type="button"
        className="py-2 text-white hover:bg-red-600 rounded-lg drop-shadow-md px-4 bg-red-500"
        name="buttonMeetingLeave"
        aria-label="buttonMeetingLeave"
        onClick={() => {
          leave();
          navigate("/", { replace: true });
        }}
      >
        Leave Meeting
      </button>
      <button
        type="button"
        className="py-2 hover:text-white rounded-lg drop-shadow-md px-4 border hover:bg-primary border-violet-500 hover:border-transparent"
        name="buttonMeetingMic"
        aria-label="buttonMeetingMic"
        onClick={() => toggleMic()}
      >
        toggleMic
      </button>
      <button
        type="button"
        className="py-2 rounded-lg text-white hover:text-black drop-shadow-md px-4 border border-transparent hover:border-violet-500 bg-primary hover:bg-transparent"
        name="buttonMeetingWebcam"
        aria-label="buttonMeetingWebcam"
        onClick={() => toggleWebcam()}
      >
        toggleWebcam
      </button>
    </div>
  );
}

export function MeetingView({ onMeetingLeave, meetingId }: { onMeetingLeave: () => void; meetingId: string }) {
  const { joined, setJoined } = useContextState();
  const { join, participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      onMeetingLeave();
    },
  });
  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="container">
      <div className="flex py-4 rounded-lg px-4 bg-black/10 dark:bg-white/5 max-w-[320px] my-2 items-center gap-2">
        <h3>Meeting Id: {meetingId} </h3>
        <button
          type="button"
          name="buttonCopyToClipboard"
          className="hover:text-green-500"
          aria-label="buttonCopyToClipboard"
          onClick={() => {
            navigator.clipboard.writeText(meetingId);
            toast.success("Success copy Meeting Id ");
          }}
        >
          <FiCopy size={25} />
        </button>
      </div>

      {joined && joined == "JOINED" ? (
        <>
          <div className="flex flex-wrap sm:justify-start justify-center items-center gap-2">
            {[...participants.keys()].map((participantId) => (
              <ParticipantView participantId={participantId} key={participantId} />
            ))}
          </div>
          <Controls />
        </>
      ) : joined && joined == "JOINING" ? (
        <div className="flex items-center gap-2 flex-col w-full">
          <Loading />
          <p>Joining the meeting...</p>
        </div>
      ) : (
        <button type="button" className="bg-primary hover:bg-hoverPrimary py-2 px-4 rounded-xl mt-2 drop-shadow-md" name="buttonJoinMeeting" aria-label="buttonJoinMeeting" onClick={joinMeeting}>
          Join
        </button>
      )}
    </div>
  );
}
