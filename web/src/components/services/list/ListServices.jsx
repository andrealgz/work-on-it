import { useEffect, useState  } from "react"
import * as Services from "../../../services/Main";

function ListServices() {
  
  const [services, setServices] = useState(null)

  useEffect(() => {
    Services.getAllServices()
      .then(services => setServices(services))
      .catch(error => console.error(error))
  },[])

  return (
    <>
      {services ? 
        services.map(service => (
          <div key={service.id}>
            {service.bio}
            {service.profession}
            {service.experience}
            {service.rate}
            {service.rating}
            {service.disponibility}
          </div>
      ))
        : <p>Cargando...</p>
      }
    </>
  )

}

export default ListServices;