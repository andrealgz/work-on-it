import { useEffect, useState  } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { translation } from "../../../utils/translation";

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
    <div className="container mt-5">
      <div className="row">
        {
          services ? 
            services.length ? 
              services.map(service => (
              <div key={service.id} className="col-4">
                <Link to={`/service/${service.id}`} >
                  <div className="card">
                    <img src="https://cflvdg.avoz.es/sc/VhmlADGQ6fh-z3-ezqRYiN6anZM=/480x/2022/02/09/00121644411841910536634/Foto/L01F2017.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{service.user?.nickname}</h5>
                      <p className="card-text">{translation("experiences", service.experience)}</p>
                      <p className="card-text">{service.rating}</p>
                    </div>
                  </div>
                </Link>
              </div>
              )) :
              <div className="col-12 text-center"><p>No hay ningun servicio</p></div>
          : <p>Cargando...</p>
        }
      </div>
    </div>
  )

}

export default ListServices;