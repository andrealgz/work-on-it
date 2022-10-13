import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { professions, timeTables, experiences } from "../../../data";
import Select from "react-select";
import { useContext } from "react";

import * as Services from "../../../services/Main";
import { AccountContext } from "../../../contexts/AccountContext";

function CreateService() {
  const navigation = useNavigate();
  const { user } = useContext(AccountContext)

  const { register, handleSubmit, setError, control, formState: { errors, isValid } } = useForm({ mode: 'onTouched' });

  const handleCreateService = (data) => {
    const service = {
      user: user.id,
      profession: data?.profession?.value,
      bio: data.bio,
      experience: data?.experience?.value,
      rate: data.rate,
      disponibility: data?.timeTables?.value,
      address: data.address,
      location: {
        type: 'Point',
        coordinates: [data.lng, data.lat]
      }
    }

    Services
      .createService(service)
      .then(service => navigation(`/services/${service.id}`))
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

  return(
    <>
      <form onSubmit={handleSubmit(handleCreateService)}>

        <div className="input-group mb-1">
          <span className="input-group-text"><i className="fa fa-tag fa-fw"></i></span>
          <input type="text" className={`form-control ${errors.bio ? "is-invalid" : ''}`} placeholder="Descríbete" 
            {...register("bio", { 
              required: "La descripción es obligatoria", 
              maxLength: { value: 300, message: "La descripción puede contener hasta 300 caracteres" }
            })} />
          {errors.bio && (<div className="invalid-feedback">{errors.bio.message}</div>)}
        </div>

        <Controller 
          name="profession" 
          control={control}
          render={({ field: { onBlur, onChange, value} }) => (
            <div className="input-group mb-1">
              <span className="input-group-text"><i className='fa fa-list fa-fw'></i></span>
              <Select className='form-control p-0'
                placeholder="Selecciona las profesión"
                value={professions.find((profession) => profession.value === value)} 
                onChange={(profession) => onChange(profession)} 
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
          name="timeTables"
          control={control}
          render={({ field: { onBlur, onChange, value} }) => (
            <div className="input-group mb-1">
              <span className="input-group-text"><i className='fa fa-list fa-fw'></i></span>
              <Select className='form-control p-0'
                placeholder="Selecciona preferencia horaria"
                value={timeTables.find((timeTable) => timeTable.value === value)} 
                onChange={(timeTable) => onChange(timeTable)} 
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
          render={({ field: { onBlur, onChange, value} }) => (
            <div className="input-group mb-1">
              <span className="input-group-text"><i className='fa fa-list fa-fw'></i></span>
              <Select className='form-control p-0'
                placeholder="Selecciona preferencia horaria"
                value={experiences.find((experience) => experience.value === value)} 
                onChange={(experience) => onChange(experience)} 
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
          <span className="input-group-text"><i className="fa fa-tag fa-fw"></i></span>
          <input type="number" className={`form-control ${errors.rate ? "is-invalid" : ''}`} placeholder="Añade el precio/hora" 
            {...register("rate", { 
              required: "El precio es obligatorio", 
            })} />
          {errors.rate && (<div className="invalid-feedback">{errors.rate.message}</div>)}
        </div>
          
        <div className="input-group mb-1">
          <span className="input-group-text"><i className="fa fa-tag fa-fw"></i></span>
          <input type="text" className={`form-control ${errors.address ? "is-invalid" : ''}`} placeholder="Añade la dirección" 
            {...register("address", { 
              required: "La dirección es obligatoria", 
            })} />
          {errors.address && (<div className="invalid-feedback">{errors.address.message}</div>)}
        </div>

        <div className="input-group mb-1">
          <span className="input-group-text"><i className="fa fa-tag fa-fw"></i></span>
          <input type="number" className={`form-control ${errors.lng ? "is-invalid" : ''}`} placeholder="Longitud"
            {...register("lng", { 
              required: "La longitud es obligatoria", 
            })}/>
        </div>

        <div className="input-group mb-1">
          <span className="input-group-text"><i className="fa fa-tag fa-fw"></i></span>
          <input type="number" className={`form-control ${errors.lat ? "is-invalid" : ''}`} placeholder="Latitud"
            {...register("lat", { 
              required: "La latitud es obligatoria", 
            })}/>
        </div>

        <div className="d-grid mt-2">
          <button className="btn btn-primary" type='submit' disabled={!isValid}>Crea tu servicio!</button>
        </div>
        
      </form>
    </>
  )
}

export default CreateService;
