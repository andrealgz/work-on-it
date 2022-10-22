import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { AccountContext } from "../../../contexts/AccountContext";
import * as Services from "../../../services/Main";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";

import "./Login.css";

function Login() {
  const navigation = useNavigate();
  const value = useContext(AccountContext);

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({ mode: "onTouched" });

  const handleLogin = (data) => {
    Services
      .login(data)
      .then(data => {
        value.setUser(data);
        navigation("/");
      })
      .catch(error => {
        if (error.response?.data?.errors) {
          const { errors } = error.response.data;
          Object.keys(error.response.data.errors).forEach((error) => {
            setError(error, { message: errors[error].message });
          });
        }
      });
  };

  return (
    <div className="login w-25 d-flex flex-column justify-content-center align-items-center">
      <h3 className="title mb-5">De nuevo en casa <GiIcons.GiKey /></h3>
      <form className="w-100 shadow-sm p-3 mb-5 rounded" onSubmit={handleSubmit(handleLogin)}>
        <div className="input-group mb-1 d-flex align-items-center">
          <span>
            <FaIcons.FaUser />
          </span>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Email..."
            {...register("email", {
              required: "Email es obligatorio",
            })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        <div className="input-group mb-1 d-flex align-items-center">
          <span>
            <MdIcons.MdPassword />
          </span>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password..."
            {...register("password", {
              required: "Password es obligatoria",
            })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        <div className="d-grid mt-4 justify-content-center">
          <button className="login-button" type="submit" disabled={!isValid}>
            Conectarme
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login;