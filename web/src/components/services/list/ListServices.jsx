import { useEffect, useState  } from "react";
import { useParams } from "react-router";

import * as Services from "../../../services/Main";

function ListServices() {

  const [services, setServices] = useState(null);

  const { profession } = useParams();

  useEffect(() => {
    Services
      .getAllServices(profession || null)
      .then(services => setServices(services))
      .catch(error => console.error(error))
  },[profession])

  return (
    <>
      {services ? 
        services.map(service => (
          <div key={service.id}>
            {service.user?.nickname}
            {service.profession}
            {service.experience}
            {service.rating}
            {service.rate}
          </div>
      ))
        : <p>Cargando...</p>
      }
    </>
  )

}

export default ListServices;