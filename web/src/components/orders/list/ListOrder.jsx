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
            <tr key={order.id}>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{translation("professions", order.service.profession)}</td>
              <td><Link to={`/orders/${order.id}`}>{translation("status", order.status)}</Link></td>
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
