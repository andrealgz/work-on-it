import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import * as Services from "../../../services/Main";
import { AccountContext } from "../../../contexts/AccountContext";
import { useForm, Controller } from "react-hook-form";
import { status } from "../../../data";
import Select from "react-select";
import * as IconsTi from "react-icons/ti";
import * as IconsGi from "react-icons/gi";

import "./DetailOrder.css";

function DetailOrderScreen() {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AccountContext);

  const { register, handleSubmit, setError, control, formState: { errors } } = useForm({ mode: 'onTouched' });

  useEffect(() => {
    Services
      .getOrder(id)
      .then(order => setOrder(order[0]))
      .catch(error => console.error(error))
  }, [id]);

  const handleUpdateOrder = (data) => {
    const order = {
      status: data.status.value
    }

    Services
      .updateOrder(id, order)
      .then(order => setOrder(order))
      .catch(error => {
        if (error.response?.data?.errors) {
          const { errors } = error.response.data;
          console.log(errors);
          Object.keys(error.response.data.errors)
            .forEach((error) => {
              setError(error, {  message: errors[error].message })
            })
        }
      })
  }

  const handleMessage = (data) => {
    const message = {
      sender: user.id,
      receiver: user.id === order.customer.id ? order.ownerService.id : order.customer.id,
      service: order.service.id,
      message: data.message
    }

    Services
      .sendMessage(message, order.id)
      .then(() => {
        return Services
          .getOrder(id)
          .then(order => setOrder(order[0]))
      })
      .catch(error => console.error(error))
  }

  return (
    <div className="container detail-order">
      {
        order ?
        (
          <div className="row">
            <div className="col-3 d-flex flex-column">
              <h3>Solicitante</h3>
              <div className="row">
                <div className="col-6 d-flex flex-column">
                  <label className="text-black-50">Nickname</label>
                  <span className="fw-bold fs-4">{order.customer.id === user.id ? <Link to={"/users/me"}>{order.customer.nickname}</Link> : order.customer.nickname}</span>
                </div>
                <div className="col-6 d-flex flex-column">
                  <label className="text-black-50">Localidad</label>
                  <span className="fw-bold fs-4">{order.customer.locality}</span>
                </div>
                <div className="col-6 d-flex flex-column">
                  <label className="text-black-50">Nombre</label>
                  <span className="fw-bold fs-4">{order.customer.name}</span>
                </div>
                <div className="col-6 d-flex flex-column">
                  <label className="text-black-50">Apellido</label>
                  <span className="fw-bold fs-4">{order.customer.surname}</span>
                </div>
              </div>
              <h3 className="mt-3">Propietario del servicio</h3>
              <div className="row">
                <div className="col-6 d-flex flex-column">
                  <label className="text-black-50">Nickname</label>
                  <span className="fw-bold fs-4">{order.ownerService.id === user.id ? <Link to={"/users/me"}>{order.ownerService.nickname}</Link> : order.ownerService.nickname}</span>
                </div>
                <div className="col-6 d-flex flex-column">
                  <label className="text-black-50">Localidad</label>
                  <span className="fw-bold fs-4">{order.ownerService.locality}</span>
                </div>
                <div className="col-6 d-flex flex-column">
                  <label className="text-black-50">Nombre</label>
                  <span className="fw-bold fs-4">{order.ownerService.name}</span>
                </div>
                <div className="col-6 d-flex flex-column">
                  <label className="text-black-50">Apellido</label>
                  <span className="fw-bold fs-4">{order.ownerService.surname}</span>
                </div>
              </div>
            </div>
            <div className="col-9">
              {
                order.ownerService.id === user.id ? 
                <form onSubmit={handleSubmit(handleUpdateOrder)}>
                  <Controller 
                    name="status" 
                    control={control}
                    defaultValue={order?.status}
                    render={({ field: { onBlur, onChange, value } }) => (
                      <div className="d-flex">
                        <label className="d-flex align-items-center me-3">Estado: </label>
                        <Select className="form-control p-0 w-25"
                          value={status.find(status => status.value === value)} 
                          onChange={status => onChange(status)} 
                          onBlur={onBlur}
                          options={status}
                          styles={{
                            control: (base) => ({
                              ...base,
                              border: 0
                            })
                          }}/>
                        {errors.status && (<div className="invalid-feedback">{errors.status.message}</div>)}
                        <button className="ms-1 btn btn-primary" type="submit"><IconsTi.TiTick /></button>
                      </div>
                    )}
                  />
                </form> :
                <div className="d-flex">
                  <label className="d-flex align-items-center me-3">Estado: </label>
                  <span className="fw-bold fs-4">{order.status.toUpperCase()}</span>
                </div>
              }
              <div className={`detail-order-message-panel border border-2 rounded mb-1 d-flex flex-column ${!order.messages.length && "justify-content-center align-items-center"}`}>
                {
                  order.messages.length ? 
                  order.messages.map((message, index) => 
                    (
                      <div key={message.id} className={`d-flex flex-column align-items-${message.sender !== user.id ? "start" : "end"}`}>
                        <span className="rounded-pill bg-success bg-opacity-25 px-3 mx-2 mt-1" key={`message-${index}`}>{message.message}</span>
                        <span className="detail-order-message-date px-3 mx-2" key={`date-${index}`}>{new Date(message.createdAt).toLocaleString()}</span>
                      </div>
                    )
                  ) : 
                  <span>No tienes ningun mensaje</span>
                }
              </div>
              <form onSubmit={handleSubmit(handleMessage)}>
                <div className="input-group mb-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mensaje"
                    {...register("message")}
                  />
                  <button className="ms-1 btn btn-primary" type="submit"><IconsGi.GiEnvelope /></button>
                </div>
              </form>
            </div>
          </div>
        ) :
        (<p>Loading...</p>)
      }
    </div>
  )
}

export default DetailOrderScreen;