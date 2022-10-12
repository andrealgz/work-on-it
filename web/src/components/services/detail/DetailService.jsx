import * as Services from "../../../services/Main";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

function DetailService() {
  const { id } = useParams()
  const [service, setService] = useState(null)

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
          <ul>
            <li>{service.user.nickname}</li>
            <li>{service.profession}</li>
            <li>{service.bio}</li>
            <li>{service.rate}</li>
            <li>{service.rating}</li>
            <li>{service.disponibility}</li>
            <li>{service.experience}</li>
            <li>{service.orders.map( order => 
              (<p>{order.review.description}Reviews</p> )
            )}</li>
          </ul>
        : 
          <p>Caargando...</p>
      }
    </> 
  )
}

export default DetailService;