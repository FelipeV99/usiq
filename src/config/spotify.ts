const clientID: string = "e5d6242f9f1a462caf4c3352c1761bf5";
const redirectURI: string = "http://localhost:3000/";
const authEndpoint: string = "https://accounts.spotify.com/authorize?";
const scope = ["user-library-read"];

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope.join(
  "%20"
)}&response_type=token&show_dialog=true`;
