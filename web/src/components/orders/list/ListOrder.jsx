import { Link } from "react-router-dom";
import { translation } from "../../../utils/translation";

function ListOrder({ listOrders, className }) {
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
              <td>{order.status === "finish" ? <span>Terminado</span> : <Link to={order.status === "done" ? `/orders/${order.id}/review` : `/orders/${order.id}`}>{translation("status", order.status)}</Link>}</td>
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
