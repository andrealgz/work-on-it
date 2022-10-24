import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { professions, timeTables, experiences } from "../../../data";
import Select from "react-select";

import "./CreateService.css";
import * as Services from "../../../services/Main";

function CreateService() {
  const navigation = useNavigate();

  const { register, handleSubmit, setError, control, formState: { errors, isValid } } = useForm({ mode: 'onTouched' });

  const handleCreateService = (data) => {
    Services
      .createService(data)
      .then(service => navigation(`/service/${service.id}`))
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
    <div className="create-service h-100 d-flex justify-content-end align-items-center">
        <form className="create-service-form" onSubmit={handleSubmit(handleCreateService)}>
          <div className="row">
            <div className="col-6 d-flex flex-column justify-content-between">
              <div className="w-75 input-group mb-1 d-flex align-items-center">
                <input type="number" className={`form-control ${errors.rate ? "is-invalid" : ''}`} placeholder="Añade el precio/hora" 
                  {...register("rate", { 
                    required: "El precio es obligatorio", 
                  })} />
                {errors.rate && (<div className="invalid-feedback">{errors.rate.message}</div>)}
              </div>
              <div className="input-group mb-1 d-flex align-items-center">
                <input type="text" className={`form-control ${errors.address ? "is-invalid" : ''}`} placeholder="Añade la dirección" 
                  {...register("address", { 
                    required: "La dirección es obligatoria", 
                  })} />
                {errors.address && (<div className="invalid-feedback">{errors.address.message}</div>)}
              </div>
              <Controller 
                name="profession"
                control={control}
                render={({ field: { onBlur, onChange, value} }) => (
                  <div className="input-group mb-1 d-flex align-items-center">
                    <Select className="form-control p-0"
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
                name="experience"
                control={control}
                render={({ field: { onBlur, onChange, value} }) => (
                  <div className="input-group mb-1 d-flex align-items-center">
                    <Select className='form-control p-0'
                      placeholder="Selecciona los años de experiencia"
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
              <Controller 
                name="timeTables"
                control={control}
                render={({ field: { onBlur, onChange, value} }) => (
                  <div className="input-group mb-1 d-flex align-items-center">
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
            </div>
            <div className="col-6 d-flex flex-column justify-content-between">
              <div className="input-group mb-1 d-flex align-items-center">
                <textarea type="text" rows="8" className={`form-control ${errors.bio ? "is-invalid" : ''}`} placeholder="Descríbete" 
                  {...register("bio", { 
                    required: "La descripción es obligatoria", 
                    maxLength: { value: 300, message: "La descripción puede contener hasta 300 caracteres" }
                  })} />
                {errors.bio && (<div className="invalid-feedback">{errors.bio.message}</div>)}
              </div>
              <div className="d-grid mt-2 justify-content-center">
                <button className="create-button" type='submit' disabled={!isValid}>Crea tu servicio</button>
              </div>
            </div>
          </div>
        </form>
    </div>
  )
}

export default CreateService;
