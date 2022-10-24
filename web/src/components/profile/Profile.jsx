import * as Services from "../../services/Main";
import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import { ListOrder } from "../";
import { AccountContext } from "../../contexts/AccountContext";
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
                    <img src={user.photo} alt={user.name} className="rounded-circle" />
                    <div>
                      <h4>{user.nickname}</h4>
                      <p>Bienvenido a tu perfil</p>
                      <p>Desde aquí podrás gestionar todos tus pedidos, tanto los que ofreces como aquellos que necesitas</p>
                      <p>¡Manos a la obra!</p>
                    </div>
                  </div>
                </div>
              </div>  
              <div className="col-4">
                <div className="info-user card">
                  <div className="card-body d-flex flex-column justify-content-evenly">
                      <div>
                        <h6>Nombre</h6>
                        <p>{user.name}</p>
                      </div>
                    <div>
                      <h6>Apellidos</h6>
                      <p>{user.surname}</p>
                    </div>
                    <div>
                      <h6>Dirección</h6>
                      <p>{user.address}</p>
                    </div>
                    <div>
                      <h6>Localidad</h6>
                      <p>{user.locality}</p>
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
                      <div className="d-flex justify-content-between">
                        <h4>Pedidos</h4>
                        <h4 className="orders-category">Como cliente <MdIcons.MdRoomService /></h4>
                      </div>
                      <small><ListOrder listOrders={user.orderSent} /></small>
                    </div>
                  </div>
                </div>  

                <div className="customer col">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h4>Pedidos</h4>
                        <h4 className="orders-category">Como profesional <FiIcons.FiTool /></h4>
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