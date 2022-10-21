import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as Services from "../../../services/Main";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
import * as HiIcons from "react-icons/hi";

function Register() {
  const navigation = useNavigate()

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({ mode: "onTouched" });

  const handleRegister = (data) => {    
    Services
      .register(data)
      .then(() => navigation("/"))
      .catch(error => {
        if (error.response?.data?.errors) {
          const { errors } = error.response.data;
          Object.keys(error.response.data.errors).forEach((error) => {
            setError(error, { message: errors[error].message });
          });
        }
      });
  }


  return (
    <div className="login w-25 d-flex flex-column justify-content-center align-items-center">
      <h3 className="mb-5">¡Registrate y empieza la aventura!</h3>
      <form className="w-100" onSubmit={handleSubmit(handleRegister)}>
        <div className="input-group mb-1">
          <span className="input-group-text">
            <FaIcons.FaUser />
          </span>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Nombre"
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text">
            <FaIcons.FaUserFriends />
          </span>
          <input
            type="text"
            className={`form-control ${errors.surname ? "is-invalid" : ""}`}
            placeholder="Apellidos"
            {...register("surname", {
              required: "Los apellidos son obligatorios",
            })}
          />
          {errors.surname && (
            <div className="invalid-feedback">{errors.surname.message}</div>
          )}
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text">
            <AiIcons.AiFillPhone />
          </span>
          <input
            type="text"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            placeholder="Teléfono"
            {...register("phone")}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone.message}</div>
          )}
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text">
            <BsIcons.BsMailbox />
          </span>
          <input type="text" className={`form-control ${errors.address ? "is-invalid" : ''}`} placeholder="Dirección" 
            {...register("address", { 
              required: "La dirección es obligatoria", 
            })} />
          {errors.address && (<div className="invalid-feedback">{errors.address.message}</div>)}
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text">
            <HiIcons.HiLocationMarker />
          </span>
          <input type="text" className={`form-control ${errors.locality ? "is-invalid" : ''}`} placeholder="Localidad" 
            {...register("locality", { 
              required: "La localidad es obligatoria", 
            })} />
          {errors.locality && (<div className="invalid-feedback">{errors.locality.message}</div>)}
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text">
            <BsIcons.BsHash />
          </span>
          <input
            type="text"
            className={`form-control ${errors.nickname ? "is-invalid" : ""}`}
            placeholder="Nickname"
            {...register("nickname", {
              required: "El nickname es obligatorio",
            })}
          />
          {errors.nickname && (
            <div className="invalid-feedback">{errors.nickname.message}</div>
          )}
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text">
            <AiIcons.AiOutlineMail />
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
        <div className="input-group mb-1">
          <span className="input-group-text">
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
        <div className="input-group mb-1">
          <span className="input-group-text">
            <GiIcons.GiPhotoCamera/>
          </span>
          <input
            type="file"
            placeholder="Sube tu foto"
            {...register("photo")}
          />
        </div>
        <div className="d-grid mt-2">
          <button className="btn btn-primary" type="submit" disabled={!isValid}>
            Registrarme
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register;