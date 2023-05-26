import { Link } from "react-router-dom";
import { FormRegister } from "../FormRegister";
import "./Register.scss";
import { image } from "../../assets";
export const Register = () => {
  return (
    <>
      <div className="container-login">
        <div className="container-login__form">
          <img src={image.logoApp} alt="logo app" />
          <div>
            <FormRegister />
          </div>

          <div className="container-login__form-redried">
            <span> ¿Tienes una cuenta? </span>
            <Link to="/">Inicia sesión</Link>
          </div>
        </div>
      </div>
    </>
  );
};
