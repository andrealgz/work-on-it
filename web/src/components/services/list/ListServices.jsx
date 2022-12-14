import { useEffect, useState  } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { translation } from "../../../utils/translation";
import * as MdIcons from "react-icons/md";
import { BarLoader } from "react-spinners"

import "./ListServices.css";
import * as Services from "../../../services/Main";
import { Rating } from "@mui/material";

const initialSort = {
  profession: true,
  experience: false,
  rate: false,
  rating: false
}

function ListServices() {

  const [services, setServices] = useState(null);
  const [sortServices, setSortServices] = useState(initialSort);

  const { profession } = useParams();

  useEffect(() => {
    Services
      .getAllServices(profession || null)
      .then(services => setServices(services))
      .catch(error => console.error(error))
  },[profession])

  const handleSort = (type) => {
    const sortState = {
      profession: false,
      experience: false,
      rate: false,
      rating: false
    }

    sortState[type] = !sortServices[type];
    setSortServices(sortState);
    
    Object.keys(initialSort).forEach(key => {
      if (key === type) {
        setServices([...services].sort((a, b) => {
          if (sortServices[type]) {
            if (a[type] > b[type]) {
              return -1;
            } else if (b[type] < a[type]) {
              return 1;
            } else {
              return 0;
            }
          } else {
            if (a[type] < b[type]) {
              return -1;
            } else if (b[type] > a[type]) {
              return 1;
            } else {
              return 0;
            }
          }
        }));
      }
    })
  }

  return (
    <div className="list-service h-100">
      <div className="title-services d-flex justify-content-center">Profesionales</div>
      <div className="filter-box d-flex justify-content-start my-4">
        <div className="filter-box-cursor" onClick={() => handleSort("profession")}>
          <h6>Especialidad {sortServices.profession ? <MdIcons.MdKeyboardArrowUp /> : <MdIcons.MdKeyboardArrowDown />}</h6>
        </div>
        <div className="filter-box-cursor" onClick={() => handleSort("rate")}>
          <h6>Precio {sortServices.rate ? <MdIcons.MdKeyboardArrowUp /> : <MdIcons.MdKeyboardArrowDown />}</h6>
        </div>
        <div className="filter-box-cursor" onClick={() => handleSort("experience")}>
          <h6>Experiencia {sortServices.experience ? <MdIcons.MdKeyboardArrowUp /> : <MdIcons.MdKeyboardArrowDown />}</h6>
        </div>
        <div className="filter-box-cursor" onClick={() => handleSort("rating")}>
          <h6>Valoraci??n {sortServices.rating ? <MdIcons.MdKeyboardArrowUp /> : <MdIcons.MdKeyboardArrowDown />}</h6>
        </div>
      </div>
      <div className="services container">
        <div className={`row ${!services ? "justify-content-center align-items-center" : ""}`}>
          {
            services ? 
              services.length ? 
                services.map(service => (
                  <div key={service.id} className="col-3 px-0">
                      <Link to={`/service/${service.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}} className="list-card d-flex flex-column justify-content-around align-items-center px-2">
                          <img src={service.user?.photo} alt={service.user?.nickname} className="list-img" />
                          <div className="text-center">
                            <h4 className="list-nickname m-0">{service.user?.nickname}</h4>
                            <h5><div className="list-profession">{translation("professions", service.profession)}</div></h5>
                          </div>
                          <div className="list-details d-flex justify-content-around">
                            <div className="text-center">
                              <p>Precio/hora</p>
                              <p>{service.rate}???</p>
                            </div>
                            <div className="text-center">
                              <p>Experiencia</p>
                              <p>{translation("experiences", service.experience)}</p>
                            </div>
                            <div className="text-center">
                              <p>Valoraci??n</p>
                              <Rating 
                                name="read-only"
                                value={service.rating}
                                size="small"
                                readOnly
                              />
                            </div>
                          </div>
                      </Link>
                  </div>
                )) :
              <div className="col-12 text-center"><p>No hay ningun servicio</p></div>
            : <BarLoader
                color="#413221"
                height={10}
                loading
                speedMultiplier={1}
                width={300}
              />
          } 
        </div>
      </div>
    </div>
  )

}

export default ListServices;