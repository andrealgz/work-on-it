import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useContext } from "react";
import { AccountContext } from "../../../contexts/AccountContext";
import * as Services from "../../../services/Main.js";
import * as IoIcons from "react-icons/io";
import * as GiIcons from "react-icons/gi";
import "./ReviewOrder.css";
import { Rating } from "@mui/material";

function ReviewOrder() {
  const { id } = useParams();
  const navigation = useNavigate();
  const value = useContext(AccountContext);
  
  const { register, handleSubmit, control, formState: { errors, isValid } } = useForm({ mode: 'onTouched' });

  const handleReview = (data) => {
    Services
      .createReview(id, data)
      .then(() => {
        return Services
          .getProfile()
          .then(userProfile => {
            value.setUser(userProfile)
            navigation("/users/me")
          })
      })
      .catch(error => console.error(error))
  }

  return (
    <div className="review-order h-100 d-flex flex-column align-items-center justify-content-center w-50">
      <form className="form" onSubmit={handleSubmit(handleReview)}>
        <div className="input-group mb-1">
          <span>Valoración: </span>
          <Controller
            control={control}
            name="rating"
            type="number"
            defaultValue={0}
            render={({ field: { onChange, value} }) => (
                <Rating
                  name="simple-controlled"
                  value={parseInt(value)}
                  onChange={onChange}
                />
            )}  
          />
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text"><IoIcons.IoIosText /></span>
          <textarea type="text" rows="7" className={`form-control ${errors.text ? "is-invalid" : ''}`} placeholder="Descripcion" 
            {...register("text", { 
              required: "La reseña es obligatoria", 
              maxLength: { value: 100, message: "La valoración no puede tener mas de 100 caracteres" },
              minLength: { value: 10, message: "La valoración no puede tener menos de 10 caracteres" }
            })} />
          {errors.text && (<div className="invalid-feedback">{errors.text.message}</div>)}
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
          <button className="btn" type='submit' disabled={!isValid}>Crea tu comentario</button>
        </div>
      </form>
    </div>
  )
};

export default ReviewOrder;
