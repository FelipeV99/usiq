// import axios from "axios";

const clientID: string = process.env.REACT_APP_CLIENT_ID || "";
const redirectURI: string =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : "https://usiq.netlify.app/";
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
