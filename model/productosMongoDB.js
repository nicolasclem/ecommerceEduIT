import mongoose from 'mongoose'
import DB_Mongo from './DB_Mongo.js'

/* schema Producto*/

const productosSchema = mongoose.Schema({
    name_products: String,
    brand_products: String,
    precio_products: Number,
    stock_products : Number,
    description_products: String,
    //cateogry: String,
    foto:String,
    envio: Boolean

})

/**modelo de documento en colletcions Productos */
const ProductoModel = mongoose.model('productos',productosSchema)


class ProductoModelMongo {





/************ABM */
/*****Crear */
async createProducto (producto) {
    if(!DB_Mongo.conexionOk) return {}
    try{
    const productoSave = new ProductoModel(producto)
    await productoSave.save()

    let productos = await ProductoModel.find().lean()

    let productoGuardado = productos[productos.length -1]

    return   DB_Mongo.genIdKey(productoGuardado)
    }
    catch(error){

        console.log(`error la Crear productos  ${error.message}`)
        return {}
    }

}
/****** leer todos */
async readProductos() {
    if(!DB_Mongo.conexionOk) return []
    try{
    let productos = await ProductoModel.find({}).lean()
    return  DB_Mongo.genIdKey(productos)
    }
    catch(error){

        console.log(`error al mostrar productos  ${error.message}`)
        return []
    }
}
/*** leer uno */


async readProducto(id){
    if(!DB_Mongo.conexionOk) return{}

    try{
        //let producto = await ProductoModel.find({_id:id})
        //return producto[0]
        let producto = await ProductoModel.findOne({_id:id}).lean()
        return DB_Mongo.genIdKey(producto)
        }
        catch(error){
    
            console.log(`error al mostrar UN productos  ${error.message}`)
            return {}
        }
   

}

/******************actualizar */


async updateProducto (id, producto) {
    if(!DB_Mongo.conexionOk) return {}
    try{
       
        await ProductoModel.updateOne({_id:id},{$set: producto})

        let productoActualizado = await ProductoModel.findOne({_id:id}).lean()
        
        return DB_Mongo.genIdKey(productoActualizado)
        }
        catch(error){
    
            console.log(`error al actualizar UN productos  ${error.message}`)
            return {}
        }

       
}


/*******Borrar */

async deleteProducto (id){
    if(!DB_Mongo.conexionOk) return {}
    try{
       
        let productoEliminado = await ProductoModel.findOne({_id:id}).lean()

        await ProductoModel.deleteOne({_id:id})

        return DB_Mongo.genIdKey(productoEliminado)
        
        }
        catch(error){
    
            console.log(`error al eliminar UN productos  ${error.message}`)
            return {}
        }
 
}

}
export default ProductoModelMongo


