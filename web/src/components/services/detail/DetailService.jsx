import * as Services from "../../../services/Main";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { AccountContext } from "../../../contexts/AccountContext";
import { Carousel } from 'react-responsive-carousel';
import "./DetailService.css";
import { translation } from "../../../utils/translation";

function DetailService() {
  const { id } = useParams()
  const [service, setService] = useState(null)
  console.log(service)

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

          <div className="service d-flex">
            <div className="img">
              <img src="https://cflvdg.avoz.es/sc/VhmlADGQ6fh-z3-ezqRYiN6anZM=/480x/2022/02/09/00121644411841910536634/Foto/L01F2017.jpg" className="card-img-top" alt="..."/>
            </div>

            <div className="details d-flex">
              <h5 className="nickname">{service.user.nickname}</h5>
              <h5 className="profession">{translation("professions", service.profession )}</h5>
              <p className="bio">{service.bio}</p>
    
              <div className="list">
                <div className="price">{service.rate}€ precio/hora</div>
                <div className="disponibility">Disponibilidad: {translation("timeTables", service.disponibility )}</div>
                <div className="experience">Años de  experiencia: {translation("experiences", service.experience )}</div>
              </div>

              <div>
                { user.id !== service.user.id && <Link to={"/"} className="btn btn-primary">Contratar!</Link> }
              </div>
            </div>      
          </div>

          <div className="reviews d-flex">
            <Carousel 
              className="home-screen-carousel"
              autoPlay={false}
              showArrows={true}
              showIndicators={true}
              showStatus={true}
              showThumbs={false}
              infiniteLoop={true}
              stopOnHover={false}
              axis="horizontal"
            >
                <div>
                  <img src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" alt="..."/>
                  Rating!! Cuando el estado sea "done"
                </div>

                <div>
                  <img src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="img2"/>
                  Aqui hay texto
                </div>

                <div>
                  <img src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" alt="..."/>
                  Aqui hay texto
                </div>
            </Carousel>
          </div>
        </div>
        : 
          <p>Caargando...</p>
      }
    </> 
  )
}

export default DetailService;