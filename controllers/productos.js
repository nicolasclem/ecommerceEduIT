import service from "../service/productos.js"




const obtenerProductos = async (req ,res) => {
    let id= req.params.id
    if(id){
        let producto = await service.obtenerProducto(id)
        res.json(producto)
    }
    else{
        let productos = await service.obtenerProductos()
        res.json(productos)
    }
}



const guardarProducto = async (req,res)=>{
    let producto =req.body;
    let productoGuardado = await service.guardarProducto(producto)
    
    res.json(productoGuardado)
    //res.redirect('/')
}


const actualizarProducto = async (req,res)=>{
    let producto =req.body;
    let id = req.params.id


    let productoActualizado =await  service.actualizarProducto(id , producto)
   

    res.json(productoActualizado)

}



const borrarProducto = (req,res)=>{
  
    let id =req.params.id

    let productoBorrado = service.borrarProducto(id)

    res.json(productoBorrado)
}


export default {
    obtenerProductos,
    guardarProducto,
    actualizarProducto,
    borrarProducto

}