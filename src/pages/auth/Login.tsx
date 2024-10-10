import "./login.css";
import { loginEndpoint } from "../../config/spotify";
// import { useCurrentPageContext } from "../../App";

const Login = () => {
  // const { setCurrentPage } = useCurrentPageContext();
  return (
    <div className="login-container">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fusiq%20vertical.svg?alt=media&token=26c11282-2329-49b0-b480-b0e586a5adf2"
        alt=""
        className="logo-vertical"
      />
      <p className="login-text">
        Please use these credentials to login to an authorized spotify account.
      </p>
      <div className="credentials-container">
        <p className="body-3">mail</p>
        <p className="body-1">mail4spotapi@gmail.com</p>
        <p className="body-3">password</p>
        <p className="body-1">easyp4sssword</p>
      </div>

      <a href={loginEndpoint}>
        <button
          className="btn-primary"
          // onClick={() => {
          //   setCurrentPage("Home");
          // }}
        >
          Login with Spotify{" "}
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/music%2FIcons%2Fspotify.svg?alt=media&token=2206a7ae-1921-429f-abcd-7a74e00dcde8"
            }
            alt=""
          />
        </button>
      </a>
    </div>
  );
};

export default Login;
