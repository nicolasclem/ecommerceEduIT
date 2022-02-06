//import model from '../model/productosFILE.js'
//import model from "../model/productosMEM.js"
//import model from '../model/productosMongoDB.js'
import config from'../config.js'

import Productomodel from '../model/productos.js'


const model = Productomodel.get(config.TIPO_DE_PERSISTENCIA_PRODUCTOS)


const obtenerProducto = async id =>{
    let producto = await  model.readProducto(id)
    return producto
}


const obtenerProductos =async ()=>{
    let productos = await model.readProductos()
    return productos
}


const guardarProducto = async producto =>{

    let productoGuardado = await model.createProducto(producto)


    return productoGuardado
}

const actualizarProducto =async (id, producto) =>{


    let productoActualizado = await model.updateProducto(id,producto)


    return productoActualizado
}

const borrarProducto =async (id)=>{
    
    let productoBorrado = await model.deleteProducto(id)


    return productoBorrado
}

export default {
    obtenerProducto,
    obtenerProductos,
    guardarProducto,
    actualizarProducto,
    borrarProducto


}