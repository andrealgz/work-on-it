import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useContext } from "react";
import { AccountContext } from "../../../contexts/AccountContext";
import * as Services from "../../../services/Main.js";
import * as IoIcons from "react-icons/io";
import * as GiIcons from "react-icons/gi";

function ReviewOrder() {
  const { id } = useParams();
  const navigation = useNavigate();
  const value = useContext(AccountContext);
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onTouched' });



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
    <div className="review-order container h-75 d-flex flex-column justify-content-center">
      <form className="form" onSubmit={handleSubmit(handleReview)}>
        <div className="input-group mb-1">
          <span className="input-group-text"><IoIcons.IoIosText /></span>
          <input type="number" className={`form-control ${errors.rating ? "is-invalid" : ''}`} placeholder="Rating del 1 al 5" 
            {...register("rating")} />
          {errors.rating && (<div className="invalid-feedback">{errors.rating.message}</div>)}
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text"><IoIcons.IoIosText /></span>
          <textarea type="text" className={`form-control ${errors.text ? "is-invalid" : ''}`} placeholder="Descripcion" 
            {...register("text")} />
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
