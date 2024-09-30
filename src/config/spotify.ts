// import axios from "axios";

const clientID: string = "e5d6242f9f1a462caf4c3352c1761bf5";
const redirectURI: string = "http://localhost:3000/";
const authEndpoint: string = "https://accounts.spotify.com/authorize?";
const scope = [
  "user-library-read",
  "playlist-read-private",
  "user-modify-playback-state",
  "user-read-playback-state",
  "user-top-read",
  "user-follow-read",
  "user-read-recently-played",
  "user-follow-modify",
];

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export async function fetchWebApi(
  endpoint: string,
  method: string,
  token: string,
  body?: {}
) {
  // console.log("body", body);
  // console.log("bbody stringified", JSON.stringify(body));
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  // console.log("response to request", method, endpoint, res);
  // console.log("type of response", typeof res);
  // console.log(res.status);
  if (res.status === 204) {
    return;
  }
  return await res.json();
}
