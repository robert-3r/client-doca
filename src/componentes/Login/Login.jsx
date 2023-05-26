import { Link } from "react-router-dom";
import "./Login.scss";
import { image } from "../../assets";

import { FormLogin } from "../FormLogin";
export const Login = () => {
  return (
    <>
      <div className="container-login">
        <div className="container-login__form">
          <img src={image.logoApp} alt="logo app" />

          <div>
            <FormLogin />
          </div>

          <div className="container-login__form-redried">
            <span> ¿No tienes una cuenta?</span>
            <Link to="/register"> Regístrate</Link>
          </div>
        </div>
      </div>

      <div className="developer-info">
        <p>FULLSTACK DEVELOPER</p>
        <a href="https://github.com/robert-3r" target="_blank" rel="noreferrer">
          Robinson Rodriguez
        </a>
      </div>
    </>
  );
};
