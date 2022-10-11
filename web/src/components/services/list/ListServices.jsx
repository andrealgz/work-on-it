import { useEffect, useState  } from "react"
import * as Services from "../../../services/Main";

function ListServices() {
  
  const [services, setServices] = useState(null)

  useEffect(() => {
    Services
      .getAllServices()
      .then(services => {
        console.log(services)
        setServices(services)
      })
      .catch(error => console.error(error))
  },[])

  return (
    <>
      {services ? 
        services.map(service => (
          <div key={service.id}>
            {service.user.nickname}
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