import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Services from "../../../services/Main";

function DetailOrderScreen() {
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    Services
      .getOrder(id)
      .then(order => setOrder(order[0]))
      .catch(error => console.error(error))
  }, [id])

  return (
    <>
      <p>Detail Order</p>
      {
        order ?
        (<div>{order.id}</div>) :
        (<p>Loading...</p>)
      }
    </>
  )
}

export default DetailOrderScreen;