import { Link } from "react-router-dom";
import { translation } from "../../../utils/translation";
import { AccountContext } from "../../../contexts/AccountContext";
import { useContext } from "react";


function ListOrder({ listOrders, className }) {
   
  const { user } = useContext(AccountContext);

  return (
    <div className={`list-orders ${className}`}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Fecha de creación</th>
            <th scope="col">Servicio</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
        {
          listOrders.length ? 
          listOrders.map(order => (
            <tr key={order.id} className={order.status === "done" ? "bg-danger bg-opacity-25" : (order.status === "finish" ? "bg-success bg-opacity-25" : "")}>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{translation("professions", order.service.profession)}</td>
              <td><Link to={order.status === "done" && user.id === order.customer ? `/orders/${order.id}/review` : `/orders/${order.id}`}>{order.status === "finish" ? "Terminado" : translation("status", order.status)}</Link></td>
            </tr>
          )) : 
          <tr>
            <td className="text-center" colSpan="3">No tenemos ordenes</td>
          </tr>
        }  
        </tbody>
      </table>    
    </div>
  )
}

ListOrder.defaultProps = {
  className: "",
};

export default ListOrder;
