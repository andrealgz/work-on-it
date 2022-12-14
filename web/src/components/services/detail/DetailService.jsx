import * as Services from "../../../services/Main";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AccountContext } from "../../../contexts/AccountContext";
import { Carousel } from 'react-responsive-carousel';
import "./DetailService.css";
import { translation } from "../../../utils/translation";
import { useForm, Controller } from "react-hook-form";
import { professions, timeTables, experiences } from "../../../data";
import Select from "react-select";
import { Rating, Switch } from '@mui/material';
import * as RiIcons from "react-icons/ri";

import { BarLoader } from "react-spinners";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function DetailService() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState(null);

  const { user } = useContext(AccountContext);

  const { register, handleSubmit, control, formState: { errors, isValid } } = useForm({ mode: 'onTouched' });

  useEffect(() => {
    Services
      .getService(id)
      .then(service => {
        setService(service[0])
        setReviews(service[0].orders.filter(order => order.reviews.length).map(order => order.reviews[0]))
      })
      .catch(error =>  console.error(error))
  }, [id])

  const handleUpdateService = (data) => {
    document.querySelector(".message-update-service").classList.add("active");
    Services
      .updateService(service?.id, data)
      .then(service => setService(service))
      .catch(error =>  console.error(error))
    setTimeout(() => {
      document.querySelector(".message-update-service").classList.remove("active");
    }, 2000)
  }

  const handleCreateOrder = () => {
    navigation("/orders/create", { state: { service } })
  }

  if (service) {
    if (user.id !== service.user.id) {
      return (
        <>
          <div className="service-detail h-100">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-sm-5 d-flex justify-content-center">
                  <img className="photo" src={service.user?.photo} alt="{service.user?.nickname}"/>
              </div>
              <div className="info col-sm-5 d-flex flex-column">
                <h5 className="nickname d-flex justify-content-center">{service.user.nickname}</h5>
                  <h5 className="profession d-flex justify-content-center mb-5">{translation("professions", service.profession )}</h5>
                  <div className="globo mb-3 d-flex flex-column">
                    <div className="bio d-flex">
                      <div className="d-flex justify-content-start me-2"><RiIcons.RiDoubleQuotesL size={20} fill="#0000007a"/></div>
                        {service.bio}
                      <div className="d-flex align-items-end ms-1"><RiIcons.RiDoubleQuotesR size={20} fill="#0000007a" /></div>
                    </div>
                  </div>
                  <div className="list d-flex justify-content-around">
                    <div className="price d-flex flex-column align-items-center">
                      <b>Precio/hora</b>
                      <p>{service.rate}???</p>
                    </div>
                    <div className="disponibility d-flex flex-column align-items-center">
                      <b>Disponibilidad</b>
                      <p>{translation("timeTables", service.disponibility )}</p>
                    </div>
                    <div className="experience d-flex flex-column align-items-center">
                      <b>A??os de  experiencia</b>
                      <p>{translation("experiences", service.experience )}</p>
                      </div>
                    <div className="rating d-flex flex-column align-items-center">
                      <b>Valoraci??n</b>
                      <Rating
                        name="read-only"
                        value={service.rating}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button className="btn" onClick={handleCreateOrder}>Contratar</button>
                  </div>
              </div>
            </div>

            <div className="reviews d-flex">
              {
                reviews?.length ? 
                <Carousel 
                  className="home-screen-carousel"
                  autoPlay={false}
                  showArrows={true}
                  showIndicators={true}
                  showStatus={true}
                  showThumbs={false}
                  infiniteLoop={true}
                  stopOnHover={false}
                  axis="horizontal"
                >
                  {reviews.map(review => 
                    <div key={review.id}>
                      <img className="w-75" src={review.photo} alt={review.text}/>
                      <p className="text-center">{review.text}</p>
                      <p className="d-flex justify-content-evenly">
                        <span>{review.customer.nickname}</span>
                        <span>
                          <Rating
                            name="read-only"
                            value={review.rating}
                            readOnly
                          />
                        </span>
                      </p>
                    </div>
                  )}
                </Carousel> :
                <p>Todav??a no hay rese??as</p>
              }
            </div>
          </div>
        </>
    );
    } else if (user.id === service.user.id) {
      return (
        <div className="me-service-screen h-100 w-100 d-flex flex-column align-items-center">
          <h2 className="me-service-title w-100">Mi servicio</h2>
          <form className="me-service-form d-flex flex-column justify-content-between" onSubmit={handleSubmit(handleUpdateService)}>
            <div className="d-flex mb-5 justify-content-end">
              <div>Desactivar servicio          
                  <Controller
                    control={control}
                    name="status"
                    defaultValue={service?.status}
                    render={({ field: { onChange, value} }) => (
                        <Switch
                          checked={value}
                          onChange={onChange}
                        />
                    )}  
                  />
                </div>
            </div>
            <div className="row mb-4">
              <div className="col-5 d-flex flex-column justify-content-evenly">
                <div className="me-service-rate">
                  <span className="mb-1">Precio/hora</span>
                  <input type="number" className={`form-control ${errors.rate ? "is-invalid" : ''}`} placeholder="A??ade el precio/hora" defaultValue={service.rate}
                    {...register("rate", { 
                      required: "El precio es obligatorio", 
                    })} />
                  {errors.rate && (<div className="invalid-feedback">{errors.rate.message}</div>)}
                </div>
                <Controller 
                  name="profession" 
                  control={control}
                  defaultValue={service?.profession}
                  render={({ field: { onBlur, onChange, value} }) => (
                    <div className="me-service-profession">
                      <span className="mb-1">Profesi??n</span>
                      <Select
                        placeholder="Selecciona las profesi??n"
                        value={professions.find(profession => profession.value === value)} 
                        onChange={profession => onChange(profession.value)} 
                        onBlur={onBlur}
                        options={professions}
                        styles={{
                          control: (base) => ({
                            ...base,
                            border: 0
                          })
                        }}/>
                      {errors.professions && (<div className="invalid-feedback">{errors.professions.message}</div>)}
                    </div>
                  )}
                />
                <Controller 
                  name="experience"
                  control={control}
                  defaultValue={service?.experience}
                  render={({ field: { onBlur, onChange, value} }) => (
                    <div>
                      <span className="mb-1">A??os de experiencia</span>
                      <Select
                        placeholder="Selecciona los a??os de experiencia"
                        value={experiences.find(experience => experience.value === value)} 
                        onChange={experience => onChange(experience.value)} 
                        onBlur={onBlur}
                        options={experiences}
                        styles={{
                          control: (base) => ({
                            ...base,
                            border: 0
                          })
                        }}/>
                      {errors.experiences && (<div className="invalid-feedback">{errors.experiences.message}</div>)}
                    </div>
                  )}
                />
                <Controller 
                  name="disponibility"
                  control={control}
                  defaultValue={service?.disponibility}
                  render={({ field: { onBlur, onChange, value} }) => (
                    <div>
                      <span className="mb-1">Disponibilidad horaria</span>
                      <Select
                        placeholder="Selecciona preferencia horaria"
                        value={timeTables.find(timeTable => timeTable.value === value)} 
                        onChange={timeTable => onChange(timeTable.value)} 
                        onBlur={onBlur}
                        options={timeTables}
                        styles={{
                          control: (base) => ({
                            ...base,
                            border: 0
                          })
                        }}/>
                      {errors.timeTables && (<div className="invalid-feedback">{errors.timeTables.message}</div>)}
                    </div>
                  )}
                />
              </div>
              <div className="col-7 d-flex flex-column justify-content-around">
                <div>
                  <span className="mb-1">Descripci??n</span>
                  <textarea type="text" rows="6" className={`form-control ${errors.bio ? "is-invalid" : ''}`} defaultValue={service.bio}
                    {...register("bio", { 
                      required: "La descripci??n es obligatoria", 
                      maxLength: { value: 300, message: "La descripci??n puede contener hasta 300 caracteres" }
                    })} />
                  {errors.bio && (<div className="invalid-feedback">{errors.bio.message}</div>)}
                </div>
                <div>
                  <span className="mb-1">Direcci??n</span>
                  <input type="text" className={`form-control ${errors.address ? "is-invalid" : ''}`} placeholder="A??ade la direcci??n" defaultValue={service.address}
                    {...register("address", { 
                      required: "La direcci??n es obligatoria", 
                    })} />
                  {errors.address && (<div className="invalid-feedback">{errors.address.message}</div>)}
                </div>
              </div>
            </div>
            <div className="me-service-update d-flex justify-content-center">
              <button className="btn" type='submit' disabled={!isValid}>Actualizar servicio</button>
            </div>
          </form>
          <div className="d-flex justify-content-center message-update-service">
            <Stack spacing={2}>
              <Alert severity="success">Los cambios se han guardado correctamente</Alert>
            </Stack>
          </div>
        </div>
      )
    }

  } else {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center h-100">
          <BarLoader
            color="#413221"
            height={10}
            loading
            speedMultiplier={1}
            width={300}
          /> 
        </div>
      </>
    )
  }
}

export default DetailService;