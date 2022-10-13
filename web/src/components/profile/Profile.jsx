import * as Services from "../../services/Main";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { ListOrder } from "../"

import "./Profile.css"

function Profile() {

  const [user, setUser] = useState(null);
  const { nickname } = useParams();

  useEffect(() => {
    Services
      .getUserProfile(nickname)
      .then(user => {
        console.log(user)
        setUser(user)
      })
      .catch(error => console.error(error))
  }, [nickname]) 

  return (
    <div className="profile">
      {
        user ? 
        user.map(user => (
          <div key={user.id} className="container">
            <h2 className="fw-bold">{user.nickname}</h2>
            <div className="row">
              <div className="col-3">
                <div className="row">
                  <div className="col-6 d-flex flex-column">
                    <label className="text-black-50">Nombre</label>
                    <span className="fw-bold fs-4">{user.name}</span>
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <label className="text-black-50">Apellidos</label>
                    <span className="fw-bold fs-4">{user.surname}</span>
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <label className="text-black-50">Ciudad</label>
                    <span className="fw-bold fs-4">{user.address}</span>
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <label className="text-black-50">Localidad</label>
                    <span className="fw-bold fs-4">{user.locality}</span>
                  </div>
                </div>
              </div>
              <div className="col-9 d-flex">
                <ListOrder listOrders={user.orderSent} className="mx-3"/>
                <ListOrder listOrders={user.orderReceived} className="mx-3"/>
              </div>
            </div>
          </div>
        )) : 
        <p>Loading....</p>
      }
    </div>
  )
}

export default Profile