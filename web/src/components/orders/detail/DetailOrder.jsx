import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import * as Services from "../../../services/Main";
import { translation } from "../../../utils/translation";
import { AccountContext } from "../../../contexts/AccountContext";
import { useForm, Controller } from "react-hook-form";
import { status } from "../../../data";
import Select from "react-select";
import * as IconsTi from "react-icons/ti";
import * as IconsFi from "react-icons/fi";
import * as IconsBi from "react-icons/bi";


import "./DetailOrder.css";
import { BarLoader } from "react-spinners";
import { Alert, Rating, Stack } from '@mui/material';

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
    document.querySelector(".message-update-order").classList.add("active");
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
    setTimeout(() => {
      document.querySelector(".message-update-order").classList.remove("active");
    }, 2000)
  }

  const handleMessage = (data) => {
    const message = {
      order: order,
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
    
    document.querySelector('[name="message"]').value = "";
  }

  return (
    <div className="detail-order h-100">
      {
        order ?
        (
          <div className="d-flex flex-column align-items-center">
            <div className="detail-order-box-order d-flex justify-content-end w-100">
              <img className="rounded-circle" width="150" src="https://res.cloudinary.com/dc7llr1ic/image/upload/v1666425746/work-on-it/Logo_completo_ijgotg.png" alt="Logo Work On It" />
              <div className="d-flex flex-column align-items-center">
                <h3>Factura del encargo</h3>
                <span>Precio: {order.detailJob.rate}€</span>
                <span>Horas contratadas: {order.detailJob.hours}</span>
                <h3>Total: {order.detailJob.rate * order.detailJob.hours}€</h3>
              </div>
            </div>
            <div className="d-flex h-100 justify-content-center align-content-center">
              <div className="row">
                <div className="col-3 d-flex flex-column justify-content-center align-content-center">
                  <div className="detail-order-box row border border-2 rounded p-4">
                    <h3 className="mb-2 d-flex justify-content-center">Solicitante</h3>
                    <div className="col-6 d-flex flex-column">
                      <img className="rounded-circle m-3" src={order.customer.photo} alt={order.customer.nickname} />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center">
                      <span className="fw-bold fs-4">@{order.customer.id === user.id ? <Link to={"/users/me"}>{order.customer.nickname}</Link> : order.customer.nickname}</span>
                      <span className="fw-bold fs-4"><IconsBi.BiBeenHere />{order.customer.locality}</span>
                    </div>
                    <div className="col-6 d-flex flex-column">
                      <span className="fw-bold fs-4 text-center">{order.customer.name}</span>
                      <span className="fw-bold fs-4 text-center">{order.customer.surname}</span>
                    </div>
                  </div>
                  <div className="detail-order-box row border border-2 rounded p-4 mt-2">
                    <h3 className="mb-2 d-flex justify-content-center">Profesional</h3>
                    <div className="col-6 d-flex flex-column">
                      <img className="rounded-circle m-3" src={order.ownerService.photo} alt={order.ownerService.nickname} />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center">
                      <span className="fw-bold fs-4">@{order.ownerService.id === user.id ? <Link to={"/users/me"}>{order.ownerService.nickname}</Link> : order.ownerService.nickname}</span>
                      <span className="fw-bold fs-4"><IconsBi.BiBeenHere />{order.ownerService.locality}</span>
                    </div>
                    <div className="col-6 d-flex flex-column">
                      <span className="fw-bold fs-4 text-center">{order.ownerService.name}</span>
                      <span className="fw-bold fs-4 text-center">{order.ownerService.surname}</span>
                    </div>
                  </div>
                </div>
                <div className="col-9">
                  <div className="row">
                    <div className="col-6 d-flex align-items-center justify-content-start">
                      {
                        order.status !== "finish" ?
                          order.ownerService.id === user.id ? 
                          <form onSubmit={handleSubmit(handleUpdateOrder)}>
                            <Controller 
                              name="status" 
                              control={control}
                              defaultValue={order?.status}
                              render={({ field: { onBlur, onChange, value } }) => (
                                <div className="d-flex">
                                  <label className="d-flex align-items-center me-3 justify-content-end">Estado: </label>
                                  <Select className="form-control p-0 select-status-order"
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
                            <span className="fw-bold fs-4">{translation("status", order.status ).toUpperCase()}</span>
                          </div>
                          :
                          <div className="d-flex">
                            <label className="d-flex align-items-center me-3">Estado: </label>
                            <span className="fw-bold fs-4">TERMINADO</span>
                          </div>
                        }
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className={`detail-order-message-panel w-75 border border-2 rounded d-flex flex-column ${!order.messages.length ? "justify-content-center align-items-center" : ""}`}>
                        {
                          order.messages.length ? 
                          order.messages.map((message, index) => 
                            (
                              <div key={message.id} className={`d-flex flex-column align-items-${message.sender.nickname !== user.nickname ? "start" : "end"}`}>
                                <div className={`d-flex ${message.sender.nickname !== user.nickname ? "flex-row-reverse" : ""}`}>
                                  <img className="rounded-circle mt-2" width="35" src={message.sender.photo} alt={message.sender.nickname} />
                                  <span className={`rounded-pill d-flex align-items-center ${message.sender.nickname !== user.nickname ? "bg-primary" : "bg-success"}  px-3 mx-2 mt-2`} key={`message-${index}`}>
                                    {message.message}
                                  </span>
                                </div>
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
                            disabled={order.status === "finish"}
                            {...register("message")}
                          />
                          <button className="button-send" disabled={order.status === "finish"} type="submit"><IconsFi.FiSend/></button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {
              order.status === "finish" &&
              <div className="row justify-content-center">
                <div className="col-6 d-flex flex-column align-items-center review-order-section mt-3">
                  <h3>Reseña</h3>
                  <img className="w-75" src={order.reviews[0]?.photo} alt={order.reviews[0]?.text}/>
                  <p className="text-center">{order.reviews[0]?.text}</p>
                  <p className="d-flex justify-content-evenly">
                    <span>{order.reviews[0]?.customer.nickname}</span>
                    <span>
                      <Rating
                        name="read-only"
                        value={order.reviews[0]?.rating}
                        readOnly
                      />
                    </span>
                  </p>
                </div>
              </div>
            }
            <div className="d-flex justify-content-center message-update-order">
              <Stack spacing={2}>
                <Alert severity="success">Los cambios se han guardado correctamente</Alert>
              </Stack>
            </div>
          </div>
        ) : 
        <div className="h-100 d-flex justify-content-center align-items-center">
          <BarLoader
            color="#413221"
            height={10}
            loading
            speedMultiplier={1}
            width={300}
          />
        </div>
      }
    </div>
  )
}

export default DetailOrderScreen;