
import config from'../config.js'

import Carritomodel from '../model/carrito.js'


const model = Carritomodel.get(config.TIPO_DE_PERSISTENCIA_CARRITO)




const guardarCarrito= async carrito =>{

    let carritoGuardado = await model.createCarrito(carrito)


    return carritoGuardado
}



export default  {

  guardarCarrito
}


