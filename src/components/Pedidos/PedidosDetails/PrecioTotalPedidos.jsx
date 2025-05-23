import { useContext } from 'react';
import { ServicesContext } from '../../../context/ServicesContext';


export function PrecioTotalPedidos() {

    const {precio} =useContext(ServicesContext)
  return (
    <div>
          <h4 className='mt-1 d-flex justify-content-end align-content-end p-2'>Total:{precio}</h4>
    </div>
  )
}

export default PrecioTotalPedidos
