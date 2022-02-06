import mongoose from 'mongoose'
import DB_Mongo from './DB_Mongo.js'


/* schema Producto*/

const carritoSchema = mongoose.Schema({
   carrito: Array
   

})

/**modelo de documento en colletcions Productos */
const CarritoModel = mongoose.model('carritos',carritoSchema)


class CarritoModelMongo {

/*****Crear */
async createCarrito (carrito) {
    if(!DB_Mongo.conexionOk) return {}
    try{
    const carritoSave = new CarritoModel({carrito:carrito})
    await carritoSave.save()

    

    return carrito
    }
    catch(error){

        console.log(`error la Crear carrito ${error.message}`)
        return {}
    }

}


}
export default CarritoModelMongo


