import { loginEndpoint } from "../../config/spotify";

const Login = () => {
  return (
    <a href={loginEndpoint}>
      <div>login with spotify</div>
    </a>
  );
};

export default Login;
