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
import { Switch } from '@mui/material';

import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";

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
    Services
      .updateService(service?.id, data)
      .then(service => setService(service))
      .catch(error =>  console.error(error))
  }

  const handleCreateOrder = () => {
    navigation("/orders/create", { state: { service } })
  }

  if (service) {
    if (user.id !== service.user.id) {
      return (
        <>
          <div className="container">
            <div className="service d-flex">
              <div className="img">
                <img src="https://cflvdg.avoz.es/sc/VhmlADGQ6fh-z3-ezqRYiN6anZM=/480x/2022/02/09/00121644411841910536634/Foto/L01F2017.jpg" className="card-img-top" alt="..."/>
              </div>
              <div className="details d-flex">
                <h5 className="nickname">{service.user.nickname}</h5>
                <h5 className="profession">{translation("professions", service.profession )}</h5>
                <p className="bio">{service.bio}</p>
                <div className="list">
                  <div className="price">{service.rate}€ precio/hora</div>
                  <div className="disponibility">Disponibilidad: {translation("timeTables", service.disponibility )}</div>
                  <div className="experience">Años de  experiencia: {translation("experiences", service.experience )}</div>
                </div>
                <button className="button" onClick={handleCreateOrder}>Contratar</button>
              </div>      
            </div>
            <div className="reviews d-flex">
              {
                service?.orders.some(order => order.reviews.length) ? 
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
                      <img src={review.photo} alt={review.text}/>
                      {review.text}
                    </div>
                  )}
                </Carousel> :
                <p>No tenemos reviews</p>
              }
            </div>
          </div>
        </>
    );
    } else if (user.id === service.user.id) {
      return (
        <div className="container">
          <form className="form" onSubmit={handleSubmit(handleUpdateService)}>
            <h2 className="title">Subir servicio</h2>
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
            <div className="input-group mb-1">
              <span className="input-group-text"><IoIcons.IoIosText /></span>
              <textarea type="text" className={`form-control ${errors.bio ? "is-invalid" : ''}`} placeholder="Descríbete" 
                defaultValue={service.bio}
                {...register("bio", { 
                  required: "La descripción es obligatoria", 
                  maxLength: { value: 300, message: "La descripción puede contener hasta 300 caracteres" }
                })} />
              {errors.bio && (<div className="invalid-feedback">{errors.bio.message}</div>)}
            </div>
            <Controller 
              name="profession" 
              control={control}
              defaultValue={service?.profession}
              render={({ field: { onBlur, onChange, value} }) => (
                <div className="input-group mb-1">
                  <span className="input-group-text"><BsIcons.BsTools /></span>
                  <Select className='form-control p-0'
                    placeholder="Selecciona las profesión"
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
              name="disponibility"
              control={control}
              defaultValue={service?.disponibility}
              render={({ field: { onBlur, onChange, value} }) => (
                <div className="input-group mb-1">
                  <span className="input-group-text"><IoIcons.IoMdTime /></span>
                  <Select className='form-control p-0'
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
            <Controller 
              name="experience"
              control={control}
              defaultValue={service?.experience}
              render={({ field: { onBlur, onChange, value} }) => (
                <div className="input-group mb-1">
                  <span className="input-group-text"><GiIcons.GiPlayerTime /></span>
                  <Select className='form-control p-0'
                    placeholder="Selecciona los años de experiencia"
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
            <div className="input-group mb-1">
              <span className="input-group-text"><BiIcons.BiEuro /></span>
              <input type="number" className={`form-control ${errors.rate ? "is-invalid" : ''}`} placeholder="Añade el precio/hora" defaultValue={service.rate}
                {...register("rate", { 
                  required: "El precio es obligatorio", 
                })} />
              {errors.rate && (<div className="invalid-feedback">{errors.rate.message}</div>)}
            </div>
            <div className="input-group mb-1">
              <span className="input-group-text"><FaIcons.FaMapSigns /></span>
              <input type="text" className={`form-control ${errors.address ? "is-invalid" : ''}`} placeholder="Añade la dirección" defaultValue={service.address}
                {...register("address", { 
                  required: "La dirección es obligatoria", 
                })} />
              {errors.address && (<div className="invalid-feedback">{errors.address.message}</div>)}
            </div>
            <div className="input-group mb-1">
              <span className="input-group-text"><FaIcons.FaMapSigns /></span>
              <input type="number" className={`form-control ${errors.lng ? "is-invalid" : ''}`} placeholder="Longitud" defaultValue={service.location.coordinates[0]}
                {...register("longitude", { 
                  required: "La longitud es obligatoria", 
                })}/>
            </div>
            <div className="input-group mb-1">
              <span className="input-group-text"><FaIcons.FaMapSigns /></span>
              <input type="number" className={`form-control ${errors.lat ? "is-invalid" : ''}`} placeholder="Latitud" defaultValue={service.location.coordinates[1]}
                {...register("latitude", { 
                  required: "La latitud es obligatoria", 
                })}/>
            </div>
            <div className="d-grid mt-2">
              <button className="btn" type='submit' disabled={!isValid}>Crea tu servicio</button>
            </div>
          </form>
        </div>
      )
    }

  } else {
    return <p>Cargando...</p>
  }
}

export default DetailService;