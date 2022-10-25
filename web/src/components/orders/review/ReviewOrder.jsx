import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useContext } from "react";
import { AccountContext } from "../../../contexts/AccountContext";
import * as Services from "../../../services/Main.js";
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
        <span className="review-order-title d-flex justify-content-center mb-4">Ayuda a otras personas contando tu experiencia </span>
        <div className="input-group d-flex justify-content-center mb-1">
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
        <div className="mb-1 mt-4">
          <textarea type="text" rows="7" className={`form-control ${errors.text ? "is-invalid" : ''}`} placeholder="1. Escribe tu reseña"
            {...register("text", { 
              required: "La reseña es obligatoria", 
              maxLength: { value: 100, message: "La valoración no puede tener mas de 100 caracteres" },
              minLength: { value: 10, message: "La valoración no puede tener menos de 10 caracteres" }
            })} />
          {errors.text && (<div className="invalid-feedback">{errors.text.message}</div>)}
        </div>
        <div className="mb-1">
          <label class="custom-file-upload">
            <input
              class="custom-file-upload"
              type="file"
              {...register("photo")}
            />
              2. Sube una imagen
          </label>
        </div>
        <div className="d-grid mt-2 justify-content-center">
          <button className="btn" type='submit' disabled={!isValid}>3. Sube tu reseña</button>
        </div>
      </form>
    </div>
  )
};

export default ReviewOrder;
