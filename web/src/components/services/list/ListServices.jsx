import { useEffect, useState  } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { translation } from "../../../utils/translation";

import "./ListServices.css";
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
    <div>
      <div className="title-services d-flex justify-content-center">Profesionales</div>
      <div className="filterbox d-flex justify-content-flex-start">
        <div>
          <h6>Especialidad <img src="https://www.tikamoon.es/build/images/search/slide-picto.01a5a605.svg" alt="services"/></h6>
        </div>
        <div>
          <h6>Precio <img src="https://www.tikamoon.es/build/images/search/slide-picto.01a5a605.svg" alt="services"/></h6>
        </div>
        <div>
          <h6>Experiencia <img src="https://www.tikamoon.es/build/images/search/slide-picto.01a5a605.svg" alt="services"/></h6>
        </div>
        <div>
          <h6>Valoración <img src="https://www.tikamoon.es/build/images/search/slide-picto.01a5a605.svg" alt="services"/></h6>
        </div>
      </div>
      <div className="services d-flex justify-content-center">
        <div className="row">
          {
            services ? 
              services.length ? 
                services.map(service => (
                  <div key={service.id} className="col-3">
                      <Link to={`/service/${service.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <div>
                          <div className="profile-card">
                            <img src="https://cflvdg.avoz.es/sc/VhmlADGQ6fh-z3-ezqRYiN6anZM=/480x/2022/02/09/00121644411841910536634/Foto/L01F2017.jpg" alt="image1" className="profile-icon" />
                            <h4 className="nickname">{service.user?.nickname}</h4>
                            <h5><div>{translation("professions", service.profession)}</div></h5>
                            <div className="details">
                              <div className="price">Precio/hora: {service.rate}€</div>
                              <div className="price">Experiencia: {translation("experiences", service.experience)}</div>
                              <div>Valoración:{service.rating}</div>
                            </div>
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
    </div>
  )

}

export default ListServices;


{/* <img src="https://cflvdg.avoz.es/sc/VhmlADGQ6fh-z3-ezqRYiN6anZM=/480x/2022/02/09/00121644411841910536634/Foto/L01F2017.jpg" classNameName="card-img-top" alt="img" />
{service.user?.nickname}
{translation("professions", service.profession)}
{translation("experiences", service.experience)}
{service.rating}
{service.rate}
{translation("timeTables", service.timeTable)} */}