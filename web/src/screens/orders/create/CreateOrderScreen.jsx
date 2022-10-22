import { useLocation, useNavigate } from "react-router";
import { useContext } from "react"
import { translation } from "../../../utils/translation";
import { AccountContext } from "../../../contexts/AccountContext";
import { useForm } from "react-hook-form";
import * as BiIcons from "react-icons/bi";
import * as Services from "../../../services/Main";

function CreateOrderScreen() {
  const { state } = useLocation();
  const { user } = useContext(AccountContext);
  const navigation = useNavigate();
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onTouched" });

  const handleCreateOrder = (data) => {
    const { hours } = data;
    const order = {
      service: state.service,
      hours
    }

    Services
      .createOrder(order)
      .then(() => navigation("/users/me"))
      .catch(error => console.error(error))
  }

  return (
    <div className="d-flex flex-column h-100 justify-content-center align-items-center">
      <h2 className="mb-4">Crear Encargo</h2>
      <div className="d-flex w-50 mb-4 justify-content-between">
        <div className="border shadow rounded p-3 w-75 me-4">
          <div className="d-flex justify-content-between">
            <div>
              <h4>Datos del Propietario del servicio</h4>
              <span className="fst-italic">Nombre</span><p>{state.service.user.name}</p>
              <span className="fst-italic">Apellidos</span><p>{state.service.user.surname}</p>
              <span className="fst-italic">Dirección</span><p>{state.service.user.address}</p>
            </div>
            <div>
              <img className="rounded-circle" width="250" src={state.service.user.photo} alt={state.service.user.nickname} />
            </div>
          </div>
        </div>
        <div className="border shadow rounded p-3 w-25">
          <h4>Datos del servicio</h4>
          <span className="fst-italic">Profesión</span><p>{translation("professions", state.service.profession )}</p>
          <span className="fst-italic">Precio/hora</span><p>{state.service.rate}€</p>
        </div>
      </div>
      <div className="d-flex w-50 justify-content-between">
        <div className="border rounded shadow p-3 pe-5 w-25 me-4">
          <h4>Datos del solicitante</h4>
          <span className="fst-italic">Nombre</span><p>{user.name}</p>
          <span className="fst-italic">Apellidos</span><p>{user.surname}</p>
          <span className="fst-italic">Dirección</span><p>{user.address}</p>
        </div>
        <div className="d-flex flex-column justify-content-evenly border rounded shadow p-3 w-75">
          <h4>Datos del pedido</h4>
          <span className="fst-italic">Dirección donde realizarlo</span><p>{user.address}</p>
          <form className="form" onSubmit={handleSubmit(handleCreateOrder)}>
            <p className="text-start fst-italic">Inserte las horas que requiere para este encargo</p>
            <div className="input-group mb-1">
              <span className="input-group-text"><BiIcons.BiTime /></span>
              <input type="number" className={`form-control ${errors.hours ? "is-invalid" : ''}`}
                {...register("hours", { 
                  required: "Las horas son obligatorias", 
                })}/>
            </div>
            <div className="d-grid mt-2">
              <button className={`btn ${isValid && "btn-success"}`} type='submit' disabled={!isValid}>Crea tu encargo</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateOrderScreen;
