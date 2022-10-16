import * as Services from "../../services/Main";
import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import { ListOrder } from "../";
import { AccountContext } from "../../contexts/AccountContext";
import { Link } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import * as FiIcons from "react-icons/fi";

import "./Profile.css"

function Profile() {

  const [user, setUser] = useState(null);
  const { nickname } = useParams();

  const userConnected = useContext(AccountContext);

  useEffect(() => {
    Services
      .getUserProfile(nickname)
      .then(user => setUser(user[0]))
      .catch(error => console.error(error))
  }, [nickname]) 

  return (
    <div className="profile">
      {
        user ? 
          <div className="container">
            <div className="user-profile row">
              <div className="col-sm-5 offset-sm-2 col-md-6 offset-md-0">
                <div className="img-profile card d-flex">
                  <div className="align-items-center text-center">
                    <img src="https://ca.slack-edge.com/T03BGN686QJ-U03CE8042BU-871f5c5f2740-192" alt="profile-img" className="rounded-circle" width="190" />
                    <div>
                      <h4>{user.nickname}</h4>
                      <p>Bienvenido a tu perfil<p/>
                      <p/>Desde aquí podrás gestionar todos tus pedidos, tanto los que ofreces como aquellos que necesitas</p>
                          ¡Manos a la obra!
                    </div>
                  </div>
                </div>
              </div>  
              <div className="col-4">
                <div className="info-user card">
                  <Link to={"/"} className="patch-profile" style={{ color: 'inherit', textDecoration: 'inherit'}}>Editar  perfil?</Link>
                  <div className="card-body">
                      <div>
                      <div><h6>Nombre</h6></div>
                      <div>{user.name}</div>
                      </div>
                    <hr/>
                    <div>
                      <div><h6>Apellidos</h6></div>
                      <div>{user.surname}</div>
                    </div>
                    <hr/>
                    <div>
                      <div><h6>Dirección</h6></div>
                      <div>{user.address}</div>
                    </div>
                    <hr/>
                    <div>
                      <div><h6>Localidad</h6></div>
                      <div>{user.locality}</div>
                    </div>
                    <hr/>
                    <div className="row">
                      <div><h6>Provincia</h6></div>
                      <div>{user.city}</div>
                    </div>
                  </div> 
                </div>
              </div>  
            </div>  
            {
              user.id === userConnected.user.id &&
              <div className="orders-profile row">
                <div className="professional col">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex">
                        <h4>Pedidos</h4>
                        <h6>Como cliente <MdIcons.MdRoomService /></h6>
                      </div>
                      <small><ListOrder listOrders={user.orderSent} /></small>
                    </div>
                  </div>
                </div>  

                <div className="customer col">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex">
                        <h4>Pedidos</h4>
                        <h6>Como profesional <FiIcons.FiTool /></h6>
                      </div>
                      <small><ListOrder listOrders={user.orderReceived}/></small>
                    </div>
                  </div>
                </div>
              </div>                    
            }
   
          </div>: 
          <p>Loading....</p>
      }
    </div>
  )
}

export default Profile;