export const authToken: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI3YzlhMWUxMy00MDUzLTQyMTYtYjUyYi1lZjllOTUwZGEwMGUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5NjMyMzEwMSwiZXhwIjoxNjk4OTE1MTAxfQ.RwY7pIx7cZiON5bIkt_wiZT0jSZMWRB9FxyD0O255WM";

export const createMeeting = async ({ token }: { token: string | any }) => {
  console.log(token);
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId }: { roomId: string } = await res.json();
  return roomId;
};
