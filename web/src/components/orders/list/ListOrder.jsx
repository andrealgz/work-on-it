function ListOrder({ listOrders, className }) {
  return (
    <div className={`list-orders ${className}`}>
      <table class="table">
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
            <tr>
              <td>{order.createdAt}</td>
              <td>{order.service.profession}</td>
              <td>{order.status}</td>
            </tr>
          )) : 
          <tr>
            <td className="text-center" colspan="3">No tenemos ordenes</td>
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
