import * as Services from "../../../services/Main";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { AccountContext } from "../../../contexts/AccountContext";
import "./DetailService.css"
import * as data from "../../../data"

function DetailService() {
  const { id } = useParams()
  const [service, setService] = useState(null)

  const { user } = useContext(AccountContext)

  useEffect(() => {
    Services
      .getService(id)
      .then(service => setService(service[0]))
      .catch(error =>  console.error(error) )
  }, [id])

  return (
    <>
      { service 
        ? 
        <div className="container">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{service.user.nickname}</h5>
            <h5 className="card-title">{data.professions.reduce((acc, cur) => {
              if (cur.value === service.profession) {
                acc = cur.label
              }
                return acc
              },"")}
            </h5>
            <p className="card-text">{service.bio}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{service.rate}€ precio/hora</li>
            <li className="list-group-item">Disponibilidad: {service.disponibility}</li>
            <li className="list-group-item">Años de  experiencia: {service.experience}</li>
          </ul>
          <div className="card-body">
          </div>
          { user.id !== service.user.id && <Link to={"/"} className="btn btn-primary">Contratar!</Link> }
        </div>
        : 
          <p>Caargando...</p>
      }
    </> 
  )
}

export default DetailService;