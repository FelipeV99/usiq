// import Player from "../../components/player/Player";
import { loginEndpoint } from "../../config/spotify";

const Login = () => {
  return (
    <a href={loginEndpoint}>
      <div>login with spotify</div>
      {/* <Player /> */}
    </a>
  );
};

export default Login;
