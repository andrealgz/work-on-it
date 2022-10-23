import { useLocation, useNavigate } from "react-router";
import { useContext } from "react"
import { translation } from "../../../utils/translation";
import { AccountContext } from "../../../contexts/AccountContext";
import { useForm } from "react-hook-form";
import * as Services from "../../../services/Main";
import "./CreateOrder.css"

function CreateOrder() {
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
    <div className="create-order d-flex flex-column h-100 justify-content-center align-items-center">
      <h2 className="create-order-title mb-5">Confirmación de pedido</h2>
      <div className="d-flex w-50 mb-4 justify-content-between">
        <div className="create-order-box border shadow rounded p-3 w-75 me-4">
          <div className="d-flex justify-content-between">
            <div>
              <h4>Datos del profesional</h4>
              <span className="fst-italic">Nombre <p>{state.service.user.name}</p></span>
              <span className="fst-italic">Apellidos <p>{state.service.user.surname}</p></span>
              <span className="fst-italic">Dirección <p>{state.service.user.address}</p></span>
              <span className="fst-italic">Dirección <p>{state.service.user.locality}</p></span>
            </div>
            <div>
              <img className="photo" src={state.service.user.photo} alt={state.service.user.nickname} />
            </div>
          </div>
        </div>
        <div className="create-order-box border shadow rounded p-3 w-25">
          <h4>Datos del servicio</h4>
          <span className="fst-italic">Profesión <p>{translation("professions", state.service.profession )}</p></span>
          <span className="fst-italic">Precio/hora <p>{state.service.rate}€</p></span>
        </div>
      </div>
      <div className="d-flex w-50 justify-content-between">
        <div className="create-order-box border rounded shadow p-3 pe-5 w-25 me-4">
          <h4>Datos del solicitante</h4>
          <span className="fst-italic">Nombre <p>{user.name}</p></span>
          <span className="fst-italic">Apellidos <p>{user.surname}</p></span>
          <span className="fst-italic">Dirección <p>{user.address}</p></span>
        </div>
        <div className="create-order-box d-flex flex-column justify-content-evenly border rounded shadow p-3 w-75">
          <h4>Datos del pedido</h4>
          <span className="fst-italic">Dirección donde realizarlo <p>{user.address}</p></span>
          <form className="form" onSubmit={handleSubmit(handleCreateOrder)}>
            <p className="fst-italic text-start">Seleccione las horas que necesitas</p>
            <div className="houres mb-1 w-25">
              <input type="number" className={`form-control ${errors.hours ? "is-invalid" : ''}`}
                placeholder="Nº horas"
                {...register("hours", { 
                  required: "Las horas son obligatorias", 
                })}/>
            </div>
            <div className="d-grid mt-5 justify-content-end">
              <button className={`btn ${isValid}`} type='submit' disabled={!isValid}>Aceptar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateOrder;
